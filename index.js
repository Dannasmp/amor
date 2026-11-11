/* ✏️ PERSONALIZA AQUÍ */
var CONFIG = {
  titulo: "11:11…",
  nombres: "Mis hoyuelitos hermosos",
  firma: "— Danna",
  pregunta: "¿Me harias el honor de ser mi novia?",
  boton: "Sí, quiero ♥",
  carta: [
    "Hola, mis hoyuelitos lindos. ¿Cómo estás? Yo estoy bien y feliz de tenerte a mi lado. Desde que te conozco soy feliz, y esa felicidad tiene marcado tu nombre. ¿Sabes? Nunca llegué a imaginar que serías tú quien lograría sacarme de aquel bloqueo, que fueses tú quien hiciera que mi corazón se emocionara y sintiera paz cada vez que está a tu lado.",
    "Sé que no suelo hacer esto muy seguido, pero te prometo que, a partir de hoy, te conquistaré todos los días; porque te podré tener a mi lado, pero siempre haré que te enamores más y más de mí. Me alegro por haberte conocido, me alegro de haber hecho ese live y me alegro demasiado de que tus ojos se hubieran posado en mí.",
    "Desde que te conozco descubrí el significado de sentirse amada. Estoy experimentando cosas nuevas, emociones nuevas, detalles nuevos; cada cosa que antes ni había hecho y que estuve reservando para la mujer que me demostrara que de verdad valía la pena. Tú lo hiciste: me demostraste lo que es tener a una mujer a mi lado, una mujer que ama, que siente, que no le apena expresar lo que siente, y con cada día que pasa te adueñas más de mi corazón.",
    "El día de hoy, 11 de noviembre, quiero que quede de recuerdo para las dos, no solo por hoy; quiero que quede para el resto de nuestras vidas. Quiero que, cuando estemos las dos en un altar, pueda decirte estas mismas palabras y terminar con un: «Y hoy te proclamo como mi esposa».",
    "Quiero que en cada paso que dé me acompañes, que en cada situación que pase estés presente, quiero que seas quien me despierte cuando me quede dormida, quien me abrace cuando no logre conciliar el sueño, quien me apoye y se quede a mi lado cuando trasnoche. Quiero que seas tú la mujer que esté conmigo, y quiero serlo yo para ti.",
    "Eres una chica increíble, y las veces que no logres verlo recuerda esta carta, recuerda lo mucho que te amo. Te prometo que cada noche y cada día te lo recordaré, te recordaré lo maravillosa y talentosa que eres, y cada detalle, por mínimo que sea de ti. Soy impaciente, soy impulsiva, soy evasiva... soy tantas cosas que simplemente a veces no logro entender por qué eres tan comprensiva conmigo. Pero luego recuerdo las veces que, llorando, pedí unos brazos comprensivos, un corazón amable y una persona maravillosa, y llegaste tú.",
    "Eres la recompensa que tanto esperé y que no dejaré ir, sin importar cuánto me cueste, cuánto te ruegue o cuántas veces deba pedirte perdón. Lo único que importa es que tu corazón todos los días me siga eligiendo, como el mío lo hace con el tuyo. Capaz esté llorando escribiendo esto, no lo negaré, ¡puajajajaja! Tocas cada fibra de mi ser, de mi alma y de mi corazón. Quiero que mi corazón sea prisionero del tuyo, quiero que me ames sin detimiento, que no le temas a desbordarte de amor, porque mis manos están libres para recibirlo. No quiero que guardes ninguna emoción, ninguna palabra, ningún sentimiento; quiero que me lo digas todo, que lo expreses todo. Sé intensa, siempre amaré eso de ti: tus celos, tus muecas, tus «ay nooooo», cada cosa, por mínima que sea.",
    "Prometo amarte hasta en los días en que no nos entendamos, prometo cuidarte, ponerte como prioridad y darte todo lo que tu alma y tu corazón deseen y sueñen. ¿Quieres una boda de película? La tendrás. ¿Quieres el mundo? Lo pondré en tus manos con cuidado; pide y te lo daré.",
    "Hoy, 11 de noviembre, quiero poner esta fecha en aquel portal energético que se abre, en aquellas manifestaciones que llegamos a hacer para llegar a este punto. No es lo que tengo planeado para hacer esto definitivo, ten paciencia y te prometo que valdrá la pena. Así que hoy, 11 de noviembre de 2026, quiero prometerte que te seré leal, que te amaré, que te elegiré y que mejoraré para ser digna de estar a tu lado.",
    "Quiero ser yo quien te ponga el anillo y quiero ser yo quien envejezca a tu lado.",
    "Así que te haré la siguiente pregunta... (Baja la página)"
  ]
};

var FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCKw_RkiVSiu-1ncaSpEAitLwirUaUM7aM',
  authDomain: 'apiproject-1b89e.firebaseapp.com',
  projectId: 'apiproject-1b89e',
  storageBucket: 'apiproject-1b89e.firebasestorage.app',
  messagingSenderId: '408819531565',
  appId: '1:408819531565:web:3deb097257cad4396e9da4'
};

var $ = function(id){return document.getElementById(id)};
$('hello').textContent = 'Hay algo que quiero decirte…';
document.title = CONFIG.titulo + ' · Hay algo para ti';
$('names').textContent = CONFIG.nombres;
$('sign').textContent = CONFIG.firma;
$('ask').textContent = CONFIG.pregunta;
$('yes').textContent = CONFIG.boton;
$('body').innerHTML = CONFIG.carta.map(function(t){var p=document.createElement('p');p.className='t';p.textContent=t;return p.outerHTML}).join('');

/* fotos: se cargan solo en este dispositivo */
function wirePhoto(id){
  var box=$(id), inp=document.createElement('input');
  inp.type='file'; inp.accept='image/*';
  inp.onchange=function(){
    var f=inp.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(){
      var old=box.querySelector('img'); if(old) old.remove();
      var im=document.createElement('img'); im.src=r.result; im.alt='';
      box.appendChild(im); var sp=box.querySelector('span'); if(sp) sp.style.display='none';
    };
    r.readAsDataURL(f);
  };
  box.onclick=function(){inp.click()};
  box.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();inp.click()}};
}
wirePhoto('p1'); wirePhoto('p2');

/* recuerdos compartidos con Firebase Storage */
var localMedia=['2.png','3.png','4.png','5.png','6.png','7.png'].map(function(name){
  return {name:name,url:'imagenes/'+name,type:'image'};
});
var mediaItems=localMedia.slice(), mediaIndex=0, cloudStorage=null, cloudAuth=null;
var mediaInput=$('media-input'), mediaCurrent=$('media-current');
var mediaStatus=$('media-status');

function renderMedia(){
  var item=mediaItems[mediaIndex], empty=$('media-empty');
  mediaCurrent.replaceChildren();
  if(!item){
    empty.style.display='grid';
    $('media-caption').textContent='Aún no hay recuerdos';
  }else{
    empty.style.display='none';
    var media=document.createElement(item.type==='video'?'video':'img');
    media.src=item.url;
    if(media.tagName==='VIDEO'){
      media.controls=true;
      media.playsInline=true;
      media.preload='metadata';
    }else{
      media.alt=item.name;
    }
    mediaCurrent.appendChild(media);
    $('media-caption').textContent=(mediaIndex+1)+' / '+mediaItems.length+' · '+item.name;
  }
  $('media-previous').disabled=mediaItems.length<2;
  $('media-next').disabled=mediaItems.length<2;
}

$('add-media').onclick=function(){mediaInput.click()};
mediaInput.onchange=function(){
  var files=Array.prototype.slice.call(mediaInput.files||[]).filter(function(file){
    return file.type.indexOf('image/')===0||file.type.indexOf('video/')===0;
  });
  if(!cloudStorage||!cloudAuth||!cloudAuth.currentUser){
    mediaStatus.textContent='Inicia sesión para subir recuerdos.';
    mediaInput.value='';
    return;
  }
  if(!files.length||files.some(function(file){return file.size>=100*1024*1024})){
    mediaStatus.textContent='Selecciona fotos o videos de menos de 100 MB.';
    mediaInput.value='';
    return;
  }
  $('add-media').disabled=true;
  mediaStatus.textContent='Subiendo recuerdos…';
  Promise.all(files.map(function(file){
    var safeName=file.name.replace(/[^a-zA-Z0-9._-]/g,'_');
    var path='recuerdos/'+Date.now()+'-'+Math.random().toString(36).slice(2)+'-'+safeName;
    var reference=cloudStorage.ref(path);
    return reference.put(file,{contentType:file.type}).then(function(snapshot){
      return snapshot.ref.getDownloadURL();
    }).then(function(url){
      return {name:file.name,url:url,type:file.type.indexOf('video/')===0?'video':'image'};
    });
  })).then(function(uploadedItems){
    mediaItems=mediaItems.concat(uploadedItems);
    mediaIndex=mediaItems.length-uploadedItems.length;
    renderMedia();
    mediaStatus.textContent='Recuerdos subidos y compartidos.';
  }).catch(function(){
    mediaStatus.textContent='No se pudieron subir. Revisa la conexión y las reglas de Firebase.';
  }).then(function(){
    $('add-media').disabled=false;
    mediaInput.value='';
  });
  mediaInput.value='';
};
$('media-previous').onclick=function(){
  if(mediaItems.length<2) return;
  mediaIndex=(mediaIndex-1+mediaItems.length)%mediaItems.length;
  renderMedia();
};
$('media-next').onclick=function(){
  if(mediaItems.length<2) return;
  mediaIndex=(mediaIndex+1)%mediaItems.length;
  renderMedia();
};
function loadSharedMedia(){
  if(!cloudStorage) return;
  cloudStorage.ref('recuerdos').listAll().then(function(result){
    return Promise.all(result.items.map(function(reference){
      return Promise.all([reference.getDownloadURL(),reference.getMetadata()]).then(function(results){
        var metadata=results[1];
        return {
          name:metadata.name,
          url:results[0],
          type:metadata.contentType&&metadata.contentType.indexOf('video/')===0?'video':'image',
          timeCreated:metadata.timeCreated
        };
      });
    }));
  }).then(function(sharedItems){
    sharedItems.sort(function(first,second){return new Date(first.timeCreated)-new Date(second.timeCreated)});
    var selectedUrl=mediaItems[mediaIndex]&&mediaItems[mediaIndex].url;
    var updatedItems=localMedia.concat(sharedItems);
    var changed=updatedItems.length!==mediaItems.length||updatedItems.some(function(item,index){
      return !mediaItems[index]||item.url!==mediaItems[index].url;
    });
    mediaItems=updatedItems;
    if(selectedUrl){
      var selectedIndex=mediaItems.findIndex(function(item){return item.url===selectedUrl});
      if(selectedIndex!==-1) mediaIndex=selectedIndex;
    }
    if(changed) renderMedia();
  }).catch(function(){
    mediaStatus.textContent='No se pudieron cargar los recuerdos compartidos. Revisa las reglas de Firebase.';
  });
}

function initializeMediaSharing(){
  var configured=Object.keys(FIREBASE_CONFIG).every(function(key){return FIREBASE_CONFIG[key]});
  if(!window.firebase){
    mediaStatus.textContent='No se pudo cargar Firebase. Revisa tu conexión a internet.';
    $('media-login').disabled=true;
    return;
  }
  if(!configured){
    mediaStatus.textContent='Falta configurar Firebase para compartir fotos y videos entre dispositivos.';
    $('media-login').disabled=true;
    return;
  }
  try{
    firebase.initializeApp(FIREBASE_CONFIG);
    cloudStorage=firebase.storage();
    cloudAuth=firebase.auth();
    cloudAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(){});
    cloudAuth.onAuthStateChanged(function(user){
      $('media-login').hidden=!!user;
      $('media-logout').hidden=!user;
      $('add-media').hidden=!user;
      if(!user) $('media-login-form').hidden=true;
    });
    loadSharedMedia();
    window.setInterval(loadSharedMedia,30000);
  }catch(error){
    mediaStatus.textContent='No se pudo iniciar Firebase. Revisa la configuración.';
    $('media-login').disabled=true;
  }
}

$('media-login').onclick=function(){
  $('media-login-form').hidden=false;
  $('media-email').focus();
};
$('media-cancel').onclick=function(){$('media-login-form').hidden=true};
$('media-login-form').onsubmit=function(event){
  event.preventDefault();
  if(!cloudAuth) return;
  mediaStatus.textContent='Iniciando sesión…';
  cloudAuth.signInWithEmailAndPassword($('media-email').value,$('media-password').value).then(function(){
    $('media-login-form').reset();
    $('media-login-form').hidden=true;
    mediaStatus.textContent='Sesión iniciada. Ya puedes subir recuerdos.';
  }).catch(function(){
    mediaStatus.textContent='No se pudo iniciar sesión. Revisa el correo y la contraseña.';
  });
};
$('media-logout').onclick=function(){
  if(cloudAuth) cloudAuth.signOut().then(function(){mediaStatus.textContent='Sesión cerrada.'});
};

renderMedia();
initializeMediaSharing();

/* abrir el sobre */
$('open').onclick=function(){
  $('envelope').style.display='none';
  $('letter').style.display='block';
  setTimeout(function(){$('letter').scrollIntoView({behavior:'smooth',block:'start'})},60);
};

/* corazones */
function hearts(n){
  var cols=['#d4566b','#e88a9a','#b8743a','#c4566a','#f2a7b3'];
  for(var i=0;i<n;i++){
    var h=document.createElement('div'); h.className='heart'; h.textContent='♥';
    h.style.left=(Math.random()*100)+'vw';
    h.style.fontSize=(10+Math.random()*16)+'px';
    h.style.color=cols[Math.floor(Math.random()*cols.length)];
    h.style.opacity=.5+Math.random()*.5;
    h.style.setProperty('--dx',(Math.random()*80-40)+'px');
    h.style.setProperty('--r',(Math.random()*360-180)+'deg');
    h.style.animationDuration=(4+Math.random()*5)+'s';
    h.style.animationDelay=(Math.random()*2.5)+'s';
    document.body.appendChild(h);
    (function(el){setTimeout(function(){el.remove()},11000)})(h);
  }
}

/* contador desde el "sí" (se guarda en el navegador) */
var start=null, timer=null, KEY='inicio_noviazgo', START_DATE=new Date('2026-11-11T00:00:00').getTime();

function tick(){
  var t=Math.floor((Date.now()-start)/1000);
  $('d').textContent=Math.floor(t/86400);
  $('h').textContent=Math.floor(t%86400/3600);
  $('m').textContent=Math.floor(t%3600/60);
  $('s').textContent=t%60;
}

function arrancar(){
  var f=new Date(start).toLocaleDateString('es',{day:'numeric',month:'long',year:'numeric'});
  $('since').textContent='Desde el '+f;
  $('yes').disabled=true; $('yes').style.opacity='.6';
  $('envelope').style.display='none';
  $('letter').style.display='block';
  $('after').style.display='block';
  tick(); timer=setInterval(tick,1000);
}

$('yes').onclick=function(){
  start=START_DATE;
  try{localStorage.setItem(KEY,start)}catch(e){}
  arrancar();
  hearts(40);
  var loop=setInterval(function(){hearts(14)},2500);
  setTimeout(function(){clearInterval(loop)},15000);
  setTimeout(function(){$('after').scrollIntoView({behavior:'smooth',block:'start'})},500);
};

var noAttempts=0;
var noPrompts=['¿Crees que te vas a librar de mí?','¿No quieres?','¿Segura?','¿De verdad?'];

$('no').onclick=function(){
  var button=$('no'), rect=button.getBoundingClientRect();
  noAttempts++;
  var maxX=Math.max(0,window.innerWidth-rect.width), maxY=Math.max(0,window.innerHeight-rect.height);
  var points=[
    [maxX*.82,maxY*.18],
    [maxX*.12,maxY*.72],
    [maxX*.76,maxY*.78],
    [maxX*.25,maxY*.22]
  ];
  button.disabled=true;
  button.classList.add('no-flying');
  button.style.left=rect.left+'px';
  button.style.top=rect.top+'px';
  var frames=[{transform:'translate(0,0) rotate(0deg)'}];
  points.forEach(function(point,index){
    frames.push({transform:'translate('+(point[0]-rect.left)+'px,'+(point[1]-rect.top)+'px) rotate('+((index%2?1:-1)*18)+'deg)'});
  });
  var flight=button.animate(frames,{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:1800,easing:'ease-in-out',fill:'forwards'});
  flight.onfinish=function(){
    button.style.transform=frames[frames.length-1].transform;
    flight.cancel();
    setTimeout(function(){
      var message=$('no-message');
      if(noAttempts>noPrompts.length){
        button.remove();
        message.textContent='Sabía que dirías que sí ♥';
        $('yes').classList.add('glow');
      }else{
        button.textContent=noAttempts===1?'Ya':noPrompts[noAttempts-1];
        message.textContent=noPrompts[noAttempts-1];
        button.classList.remove('no-flying');
        button.style.left='';
        button.style.top='';
        button.style.transform='';
        button.disabled=false;
      }
      message.style.display='block';
    },900);
  };
};

/* al volver a abrir la página, retoma el contador */
try{
  var g=localStorage.getItem(KEY);
  if(g){start=START_DATE; arrancar();}
}catch(e){}