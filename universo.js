/* ===== NUESTRO UNIVERSO · Three.js =====
   Cada foto se convierte en un planeta que orbita un sol.
   Las fotos se guardan en este dispositivo (localStorage). */
(function(){
'use strict';
var stage=document.getElementById('uni-stage');
if(!stage||!window.IntersectionObserver) return;

var $=function(id){return document.getElementById(id)};
var canvas=$('uni-canvas'), card=$('uni-card'), noteEl=$('uni-note');
var KEY='universo_planetas', SEEDED='universo_sembrado';
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

var renderer,scene,camera,sky,belt,sunMesh,sunP;
var planets=[], store=[], selected=null;
var tried=false, inited=false, running=false, last=0, tScale=1, noteTimer=0;
var cam={yaw:.7,pitch:.42,dist:105,tDist:105,target:null};
var pointers={}, moved=false, downAt={x:0,y:0}, pinch=0, idle=0;

/* ---------- utilidades ---------- */
function rnd(a,b){return a+Math.random()*(b-a)}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function lerp(a,b,t){return a+(b-a)*t}
function mix(a,b,t){return [lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)]}
function note(t){
  noteEl.textContent=t; clearTimeout(noteTimer);
  noteTimer=setTimeout(function(){noteEl.textContent=''},4500);
}

/* ---------- ruido 3D (texturas procedurales sin costuras) ---------- */
function hash(x,y,z){var h=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return h-Math.floor(h)}
function noise(x,y,z){
  var xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=x-xi,yf=y-yi,zf=z-zi;
  var u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),w=zf*zf*(3-2*zf);
  function h(a,b,c){return hash(xi+a,yi+b,zi+c)}
  return lerp(
    lerp(lerp(h(0,0,0),h(1,0,0),u),lerp(h(0,1,0),h(1,1,0),u),v),
    lerp(lerp(h(0,0,1),h(1,0,1),u),lerp(h(0,1,1),h(1,1,1),u),v),w);
}
function fbm(x,y,z,o){
  var s=0,a=.5,f=1,n=0;
  for(var i=0;i<o;i++){s+=a*noise(x*f,y*f,z*f);n+=a;a*=.5;f*=2.03}
  return s/n;
}

function shade(kind,x,y,z,s){
  var h,c;
  if(kind==='earth'){
    h=fbm(x*2+s,y*2+s,z*2,5);
    if(h<.5) c=mix([8,34,92],[34,108,160],clamp((h-.3)/.2,0,1));
    else if(h<.56) c=[205,190,140];
    else c=mix([46,104,52],[128,108,78],clamp((h-.56)/.25,0,1));
    if(h>.74) c=mix(c,[240,244,248],clamp((h-.74)*8,0,1));
    if(Math.abs(y)>.86+h*.08) c=[238,244,250];
    var cl=fbm(x*3+s+9,y*3.6,z*3+s,5);
    if(cl>.56) c=mix(c,[255,255,255],clamp((cl-.56)*3.2,0,.92));
    return c;
  }
  if(kind==='gas'){
    var b=y*6.5+(fbm(x*1.6+s,y*4,z*1.6+s,4)-.5)*2.2;
    h=(Math.sin(b*3.3)+1)/2;
    return mix(mix([196,150,100],[232,206,160],h),[140,92,62],clamp(fbm(x*3+s,y*9,z*3,3)*1.3-.4,0,.8));
  }
  if(kind==='mars'){
    h=fbm(x*3+s,y*3+s,z*3,5);
    c=mix([92,42,28],[214,134,84],clamp(h*1.4-.1,0,1));
    if(Math.abs(y)>.92) c=mix(c,[245,240,235],.8);
    return c;
  }
  if(kind==='ice'){
    h=fbm(x*3+s,y*3.5,z*3+s,5);
    return mix([150,196,228],[244,250,255],h);
  }
  h=fbm(x*3.2+s,y*3.2,z*3.2,5); /* sol */
  return mix([255,110,20],[255,236,150],clamp(h*1.5-.2,0,1));
}

function surface(kind,seed){
  var W=512,H=256,c=document.createElement('canvas');
  c.width=W;c.height=H;
  var g=c.getContext('2d'),im=g.createImageData(W,H),d=im.data;
  for(var y=0;y<H;y++){
    var lat=Math.PI*(y/(H-1)-.5),py=Math.sin(lat),r=Math.cos(lat);
    for(var x=0;x<W;x++){
      var lon=2*Math.PI*x/W,col=shade(kind,Math.cos(lon)*r,py,Math.sin(lon)*r,seed),i=(y*W+x)*4;
      d[i]=col[0];d[i+1]=col[1];d[i+2]=col[2];d[i+3]=255;
    }
  }
  g.putImageData(im,0,0);
  return c;
}

/* ---------- texturas auxiliares ---------- */
function tex(c){
  var t=new THREE.CanvasTexture(c);
  t.encoding=THREE.sRGBEncoding;
  t.anisotropy=renderer.capabilities.getMaxAnisotropy();
  return t;
}
function glow(stops){
  var c=document.createElement('canvas');c.width=c.height=256;
  var g=c.getContext('2d'),r=g.createRadialGradient(128,128,0,128,128,128);
  stops.forEach(function(s){r.addColorStop(s[0],s[1])});
  g.fillStyle=r;g.fillRect(0,0,256,256);
  return new THREE.CanvasTexture(c);
}
function ringTex(){
  var c=document.createElement('canvas');c.width=512;c.height=8;
  var g=c.getContext('2d');
  for(var x=0;x<512;x++){
    var n=noise(x*.07,3,1),n2=noise(x*.4,7,2),a=clamp(.15+n*.75+(n2-.5)*.3,0,.95);
    if(x>200&&x<228) a*=.1;
    g.fillStyle='rgba('+((205+n*30)|0)+','+((184+n*30)|0)+','+((150+n*20)|0)+','+a+')';
    g.fillRect(x,0,1,8);
  }
  return tex(c);
}

/* ---------- cielo: estrellas, vía láctea y nebulosas ---------- */
function starLayer(n,size,band,dot){
  var pos=new Float32Array(n*3),col=new Float32Array(n*3),c=new THREE.Color();
  for(var i=0;i<n;i++){
    var R=rnd(900,1000),x,y,z;
    if(band){
      var a=rnd(0,6.2832);
      x=Math.cos(a)*R;z=Math.sin(a)*R;
      y=(Math.random()+Math.random()+Math.random()-1.5)*R*.09;
    }else{
      var th=Math.acos(rnd(-1,1)),ph=rnd(0,6.2832);
      x=R*Math.sin(th)*Math.cos(ph);y=R*Math.cos(th);z=R*Math.sin(th)*Math.sin(ph);
    }
    pos[i*3]=x;pos[i*3+1]=y;pos[i*3+2]=z;
    c.setHSL(Math.random()<.55?.6:.08,rnd(.15,.7),rnd(.7,.95));
    col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b;
  }
  var geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));
  return new THREE.Points(geo,new THREE.PointsMaterial({
    size:size,map:dot,vertexColors:true,transparent:true,depthWrite:false,
    sizeAttenuation:false,blending:THREE.AdditiveBlending,opacity:band?.8:1
  }));
}
function buildSky(){
  sky=new THREE.Group();
  var dot=glow([[0,'rgba(255,255,255,1)'],[.3,'rgba(255,255,255,.75)'],[1,'rgba(255,255,255,0)']]);
  sky.add(starLayer(3500,1.7,false,dot));
  sky.add(starLayer(450,3.4,false,dot));
  var mw=starLayer(7000,1.4,true,dot);
  mw.rotation.set(.4,0,.9);
  sky.add(mw);
  var tints=['rgba(110,70,190,','rgba(40,110,200,','rgba(200,60,120,','rgba(40,160,160,'];
  for(var i=0;i<7;i++){
    var t=tints[i%tints.length];
    var s=new THREE.Sprite(new THREE.SpriteMaterial({
      map:glow([[0,t+'.5)'],[.4,t+'.18)'],[1,t+'0)']]),
      transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.55,rotation:rnd(0,6)
    }));
    var d=new THREE.Vector3(rnd(-1,1),rnd(-.6,.6),rnd(-1,1)).normalize().multiplyScalar(rnd(700,860));
    s.position.copy(d);s.scale.set(rnd(500,900),rnd(400,700),1);
    sky.add(s);
  }
  scene.add(sky);
}

/* ---------- sol, cinturón y atmósferas ---------- */
function buildSun(){
  sunMesh=new THREE.Mesh(new THREE.SphereGeometry(6,64,48),new THREE.MeshBasicMaterial({map:tex(surface('sun',3))}));
  var warm=glow([[0,'rgba(255,230,170,1)'],[.18,'rgba(255,170,70,.55)'],[.5,'rgba(255,110,30,.12)'],[1,'rgba(255,90,20,0)']]);
  [[48,1],[130,.35]].forEach(function(v){
    var s=new THREE.Sprite(new THREE.SpriteMaterial({map:warm,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:v[1]}));
    s.scale.set(v[0],v[0],1);sunMesh.add(s);
  });
  scene.add(sunMesh);
  scene.add(new THREE.PointLight(0xfff0dc,1.7,0,2));
  scene.add(new THREE.AmbientLight(0x4a5880,.45));
  sunP={o:{name:'Nuestro sol',size:6},mesh:sunMesh,hit:sunMesh,holder:sunMesh};
}
function buildBelt(){
  var n=3000,pos=new Float32Array(n*3);
  for(var i=0;i<n;i++){
    var a=rnd(0,6.2832),r=rnd(80,92);
    pos[i*3]=Math.cos(a)*r;pos[i*3+1]=(Math.random()+Math.random()-1)*2.2;pos[i*3+2]=Math.sin(a)*r;
  }
  var geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  belt=new THREE.Points(geo,new THREE.PointsMaterial({
    size:1.3,color:0xb7a58f,map:glow([[0,'rgba(255,255,255,1)'],[1,'rgba(255,255,255,0)']]),
    sizeAttenuation:false,transparent:true,opacity:.7,depthWrite:false
  }));
  scene.add(belt);
}
function atmos(color,size){
  var m=new THREE.ShaderMaterial({
    uniforms:{c:{value:new THREE.Color(color)}},
    vertexShader:'varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:'uniform vec3 c;varying vec3 n;void main(){float i=pow(max(0.62-dot(n,vec3(0.0,0.0,1.0)),0.0),3.0);gl_FragColor=vec4(c,1.0)*i*1.6;}',
    side:THREE.BackSide,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false
  });
  return new THREE.Mesh(new THREE.SphereGeometry(size*1.16,48,32),m);
}
function label(text,size){
  var c=document.createElement('canvas');c.width=512;c.height=96;
  var g=c.getContext('2d');
  g.font='italic 600 40px "Playfair Display",Georgia,serif';
  g.textAlign='center';g.textBaseline='middle';
  g.shadowColor='rgba(0,0,0,.9)';g.shadowBlur=10;g.fillStyle='#fbe9de';
  g.fillText(text,256,48);
  var s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false}));
  s.scale.set(11,11*96/512,1);
  s.position.y=size*1.45+1.4;
  return s;
}

/* ---------- planetas ---------- */
function build(o){
  var pivot=new THREE.Group(),i;
  pivot.rotation.set(o.tiltX,0,o.tiltZ);
  var pts=[];
  for(i=0;i<=160;i++){var a=i/160*Math.PI*2;pts.push(new THREE.Vector3(Math.cos(a)*o.orbit,0,Math.sin(a)*o.orbit))}
  pivot.add(new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({color:0x7f98cc,transparent:true,opacity:o.photo?.22:.12})
  ));
  var holder=new THREE.Group();pivot.add(holder);
  var tilt=new THREE.Group();tilt.rotation.z=o.axial;holder.add(tilt);

  var mat=new THREE.MeshStandardMaterial({map:o.map,roughness:.92,metalness:0});
  if(o.photo){mat.emissive=new THREE.Color(0xffffff);mat.emissiveMap=o.map;mat.emissiveIntensity=.5}
  var mesh=new THREE.Mesh(new THREE.SphereGeometry(o.size,64,48),mat);
  tilt.add(mesh);
  holder.add(atmos(o.atm,o.size));

  /* esfera invisible, más grande, para tocar con el dedo */
  var hit=new THREE.Mesh(new THREE.SphereGeometry(Math.max(o.size*1.7,3.4),12,8),new THREE.MeshBasicMaterial({visible:false}));
  holder.add(hit);

  if(o.ring){
    var inner=o.size*1.45,rg=new THREE.RingGeometry(inner,o.size*2.5,128,1),
        ps=rg.attributes.position,uv=rg.attributes.uv,v=new THREE.Vector3();
    for(i=0;i<ps.count;i++){v.fromBufferAttribute(ps,i);uv.setXY(i,(v.length()-inner)/(o.size*1.05),.5)}
    var ring=new THREE.Mesh(rg,new THREE.MeshBasicMaterial({map:ringTex(),side:THREE.DoubleSide,transparent:true,depthWrite:false}));
    ring.rotation.set(Math.PI/2+.38,0,.2);
    holder.add(ring);
  }
  if(o.photo&&o.name) holder.add(label(o.name,o.size));

  scene.add(pivot);
  var p={o:o,pivot:pivot,holder:holder,mesh:mesh,hit:hit,ang:o.phase,
         w:5.6/Math.pow(o.orbit,1.5)*(reduce?.25:1),spin:o.photo?.12:rnd(.15,.5)};
  planets.push(p);
  return p;
}

/* ---------- fotos ---------- */
function squareData(url,cb){
  var im=new Image();im.crossOrigin='anonymous';
  im.onload=function(){
    try{
      var c=document.createElement('canvas');c.width=c.height=512;
      var s=Math.min(im.width,im.height);
      c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,512,512);
      cb(c.toDataURL('image/jpeg',.82));
    }catch(e){cb(null)}
  };
  im.onerror=function(){cb(null)};
  im.src=url;
}
/* la foto se repite 2 veces (la 2ª en espejo) para que cubra la esfera sin costuras */
function photoTexture(url,cb){
  var im=new Image();
  im.onload=function(){
    var c=document.createElement('canvas');c.width=1024;c.height=512;
    var g=c.getContext('2d');
    g.drawImage(im,0,0,512,512);
    g.save();g.translate(1024,0);g.scale(-1,1);g.drawImage(im,0,0,512,512);g.restore();
    cb(tex(c));
  };
  im.onerror=function(){cb(null)};
  im.src=url;
}
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(store))}
  catch(e){note('No hay espacio para guardar más fotos en este dispositivo.')}
}
function newEntry(name,img,src){
  var e={id:Date.now()+'-'+Math.floor(Math.random()*1e4),name:name,img:img,src:src||'',
         orbit:22+(store.length%9)*5+rnd(0,2),size:rnd(3.2,4.2),phase:rnd(0,6.28)};
  store.push(e);save();
  return e;
}
function addPhoto(e,focus){
  photoTexture(e.img,function(t){
    if(!t){note('No se pudo cargar una de las fotos.');return}
    var p=build({id:e.id,name:e.name,img:e.img,orbit:e.orbit,size:e.size,phase:e.phase,map:t,photo:true,
                 atm:0xffb3c6,tiltX:rnd(-.1,.1),tiltZ:rnd(-.08,.08),axial:rnd(-.3,.3)});
    if(focus) select(p);
  });
}
function addMemories(silent){
  var list=[{name:'Nosotras',url:'imagenes/1.png'}];
  (window.mediaItems||[]).forEach(function(m,i){
    if(m.type==='image') list.push({name:'Recuerdo '+(i+1),url:m.url});
  });
  list=list.filter(function(m){return !store.some(function(s){return s.src===m.url})});
  if(!list.length){if(!silent)note('Todos tus recuerdos ya son planetas.');return}
  (function next(i){
    if(i>=list.length){if(!silent)note('Listo: tus recuerdos ya orbitan.');return}
    squareData(list[i].url,function(d){
      if(d) addPhoto(newEntry(list[i].name,d,list[i].url),false);
      next(i+1);
    });
  })(0);
}

/* ---------- selección ---------- */
function homeDist(){
  var a=canvas.clientWidth/Math.max(canvas.clientHeight,1);
  return a<1?Math.min(105/Math.max(a,.5)*.85,200):105;
}
function select(p){
  selected=p;card.hidden=false;
  $('uni-name').textContent=p.o.name||'Un planeta más';
  $('uni-view').hidden=!p.o.photo;
  $('uni-del').hidden=!p.o.photo;
  cam.tDist=p.o.size*5.5+5;
}
function deselect(){selected=null;card.hidden=true;cam.tDist=homeDist()}
function pick(e){
  var r=canvas.getBoundingClientRect(),
      m=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),
      rc=new THREE.Raycaster();
  rc.setFromCamera(m,camera);
  var list=planets.concat([sunP]),
      hit=rc.intersectObjects(list.map(function(p){return p.hit}),false)[0];
  if(!hit) return deselect();
  select(list.filter(function(p){return p.hit===hit.object})[0]);
}

/* ---------- bucle ---------- */
var tmp=null;
function frame(now){
  if(!running) return;
  requestAnimationFrame(frame);
  var dt=Math.min((now-last)/1000,.05);last=now;
  planets.forEach(function(p){
    p.ang+=p.w*dt*tScale;
    p.holder.position.set(Math.cos(p.ang)*p.o.orbit,0,Math.sin(p.ang)*p.o.orbit);
    p.mesh.rotation.y+=p.spin*dt*tScale;
  });
  sunMesh.rotation.y+=.02*dt*tScale;
  belt.rotation.y+=.004*dt*tScale;

  idle+=dt;
  if(!selected&&!reduce&&idle>2.5&&!Object.keys(pointers).length) cam.yaw+=dt*.035;
  if(selected){selected.holder.getWorldPosition(tmp);cam.target.lerp(tmp,.07)}
  else cam.target.lerp(tmp.set(0,0,0),.05);
  cam.dist+=(cam.tDist-cam.dist)*.08;
  var cp=Math.cos(cam.pitch);
  camera.position.set(
    cam.target.x+cam.dist*cp*Math.sin(cam.yaw),
    cam.target.y+cam.dist*Math.sin(cam.pitch),
    cam.target.z+cam.dist*cp*Math.cos(cam.yaw));
  camera.lookAt(cam.target);
  sky.position.copy(camera.position);
  renderer.render(scene,camera);
}

function resize(){
  var w=stage.clientWidth,h=stage.clientHeight;
  if(!renderer||!w||!h) return;
  renderer.setSize(w,h,false);
  camera.aspect=w/h;camera.updateProjectionMatrix();
}

/* ---------- arranque ---------- */
function init(){
  if(!window.THREE){note('No se pudo cargar el motor 3D. Revisa tu conexión a internet.');return false}
  try{renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true})}
  catch(e){note('Tu navegador no permite gráficos 3D.');return false}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setClearColor(0x01020a);
  renderer.outputEncoding=THREE.sRGBEncoding;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.05;
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(52,1,.5,4000);
  cam.target=new THREE.Vector3();tmp=new THREE.Vector3();

  buildSky();buildSun();buildBelt();

  [{n:'Marte',k:'mars',orbit:10,size:1.3,atm:0xff9a6a,seed:2},
   {n:'La Tierra',k:'earth',orbit:15.5,size:1.9,atm:0x5aa0ff,seed:5},
   {n:'Gigante gaseoso',k:'gas',orbit:68,size:5.2,atm:0xffd9a0,seed:7,ring:true},
   {n:'Mundo helado',k:'ice',orbit:74,size:2.2,atm:0xbfe6ff,seed:11}
  ].forEach(function(d){
    build({name:d.n,orbit:d.orbit,size:d.size,map:tex(surface(d.k,d.seed)),atm:d.atm,ring:d.ring,
           phase:rnd(0,6.28),tiltX:rnd(-.05,.05),tiltZ:rnd(-.05,.05),axial:rnd(-.4,.4),photo:false});
  });

  try{store=JSON.parse(localStorage.getItem(KEY)||'[]').filter(function(e){return e&&e.img})}
  catch(e){store=[]}
  store.forEach(function(e){addPhoto(e,false)});
  var seeded=false;
  try{seeded=!!localStorage.getItem(SEEDED)}catch(e){}
  if(!seeded&&!store.length){
    addMemories(true);
    try{localStorage.setItem(SEEDED,'1')}catch(e){}
  }

  bind();
  if(window.ResizeObserver) new ResizeObserver(resize).observe(stage);
  window.addEventListener('resize',resize);
  resize();
  cam.dist=cam.tDist=homeDist();
  return true;
}

/* ---------- controles ---------- */
function bind(){
  canvas.addEventListener('pointerdown',function(e){
    canvas.setPointerCapture(e.pointerId);
    pointers[e.pointerId]={x:e.clientX,y:e.clientY};
    downAt={x:e.clientX,y:e.clientY};moved=false;idle=0;pinch=0;
  });
  canvas.addEventListener('pointermove',function(e){
    var p=pointers[e.pointerId];if(!p) return;
    var ids=Object.keys(pointers);
    if(ids.length===1){
      cam.yaw-=(e.clientX-p.x)*.006;
      cam.pitch=clamp(cam.pitch+(e.clientY-p.y)*.006,-1.4,1.4);
      if(Math.hypot(e.clientX-downAt.x,e.clientY-downAt.y)>6) moved=true;
    }else if(ids.length===2){
      p.x=e.clientX;p.y=e.clientY;
      var a=pointers[ids[0]],b=pointers[ids[1]],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(pinch&&d) cam.tDist=clamp(cam.tDist*pinch/d,10,240);
      pinch=d;moved=true;
    }
    p.x=e.clientX;p.y=e.clientY;idle=0;
  });
  function up(e){
    var n=Object.keys(pointers).length;
    delete pointers[e.pointerId];pinch=0;
    if(n===1&&!moved&&e.type==='pointerup') pick(e);
  }
  canvas.addEventListener('pointerup',up);
  canvas.addEventListener('pointercancel',up);
  canvas.addEventListener('wheel',function(e){
    e.preventDefault();
    cam.tDist=clamp(cam.tDist*Math.exp(e.deltaY*.001),10,240);idle=0;
  },{passive:false});

  $('uni-add').onclick=function(){$('uni-file').click()};
  $('uni-mem').onclick=function(){addMemories(false)};
  $('uni-pause').onclick=function(){
    tScale=tScale?0:1;this.textContent=tScale?'Pausar':'Reanudar';
  };
  $('uni-back').onclick=deselect;
  $('uni-view').onclick=function(){
    if(!selected||!selected.o.photo) return;
    $('uni-photo').firstElementChild.src=selected.o.img;
    $('uni-photo').hidden=false;
  };
  $('uni-photo').onclick=function(){this.hidden=true};
  $('uni-del').onclick=function(){
    var p=selected;if(!p||!p.o.photo) return;
    if(!window.confirm('¿Eliminar el planeta "'+p.o.name+'"?')) return;
    scene.remove(p.pivot);p.mesh.material.map.dispose();
    planets=planets.filter(function(q){return q!==p});
    store=store.filter(function(s){return s.id!==p.o.id});
    save();deselect();
  };
  $('uni-file').onchange=function(){
    var files=Array.prototype.slice.call(this.files||[]).filter(function(f){return f.type.indexOf('image/')===0});
    this.value='';
    if(!files.length) return;
    var single=files.length===1,
        name=single?(window.prompt('¿Cómo se llama este planeta?','Nuestro planeta')||'Nuestro planeta'):'';
    (function next(i){
      if(i>=files.length) return;
      var url=URL.createObjectURL(files[i]);
      squareData(url,function(d){
        URL.revokeObjectURL(url);
        if(d) addPhoto(newEntry((single?name:'Planeta '+(store.length+1)).slice(0,22),d,''),single);
        else note('No se pudo leer una de las fotos.');
        next(i+1);
      });
    })(0);
  };
}

/* se inicia y corre solo cuando la sección está a la vista (ahorra batería) */
new IntersectionObserver(function(en){
  var on=en[0].isIntersecting;
  if(on&&!tried){tried=true;inited=init()}
  if(on&&inited&&!running){running=true;last=performance.now();requestAnimationFrame(frame)}
  else if(!on) running=false;
},{threshold:0}).observe(stage);
})();