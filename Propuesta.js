/* =====================================================================
   PERSONALIZA AQUÍ: textos, fechas, fotos y preguntas.
   Las fotos se ponen con rutas o URLs (por ejemplo "fotos/1.jpg").
   Si dejas una vacía se muestra un marcador de color.
   ===================================================================== */
const GALLERY_ADMIN_EMAIL = "dannasmp44@gmail.com";
let heroCrop = { x: 50, y: 50, zoom: 100 };
let pendingHeroFile = null;
let heroPreviewObjectUrl = null;
const CONFIG = {
  to: "Sofía",
  couple: "Ana y Danna",
  from: "De Danna",
  startDate: "2026-11-11",
  question: "¿Me harías el honor de ser mi novia?",
  answer: "Sí, quiero ♥",
  place: "Todo empezó por un live",

  photos: {
    hero: "imagenes/5.png",
    final: "imagenes/6.png",
    gallery: [
      "imagenes/1.png",
      "imagenes/2.png",
      "imagenes/3.png",
      "imagenes/4.png",
      "imagenes/5.png",
      "imagenes/6.png",
      "imagenes/7.png",
      "imagenes/image.png"
    ]
  },

  letter: [
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
  ],

  events: [
    { date: "2024-07-05", title: "Nuestro primer mensaje", avatar: "",
      text: "Un mensaje que marcó el comienzo de una historia muy especial para las dos. Desde ese día empezamos a acercarnos y a crear recuerdos juntas." },
    { date: "2024-12-12", title: "Nuestra primera vez en la nieve", avatar: "",
      text: "Nunca voy a olvidar la primera vez que vimos la nieve juntos. Entre el frío, las risas y los abrazos para entrar en calor, ese día se convirtió en uno de mis recuerdos favoritos contigo." },
    { date: "2026-08-02", title: "La primera vez que nos vimos", avatar: "",
      text: "El día que por fin nos vimos en persona. Un momento que guardo con muchísimo cariño y que se convirtió en un recuerdo muy especial de nuestra historia." },
    { date: "2026-01-12", title: "Nuestra casa juntos", avatar: "",
      text: "Tener una casa contigo siempre fue mucho más que tener cuatro paredes. Es el lugar donde empezamos a construir nuestros sueños, donde cada rincón guarda un recuerdo y donde, poco a poco, estamos creando nuestro hogar." }
  ],

  final: { message: "Te amo, hoy y siempre", sign: "— Danna" },

  winMessage: "El mejor regalo siempre has sido tú. Gracias por cada día a tu lado."
};

/* ===================== Utilidades ===================== */
const $ = (s, el = document) => el.querySelector(s);
const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const fmtLong = iso => { const [y,m,d] = iso.split("-").map(Number); return `${d} de ${MESES[m-1]} de ${y}`; };
const fmtUp = iso => fmtLong(iso).toUpperCase();
const isISODate = value => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
};
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCKw_RkiVSiu-1ncaSpEAitLwirUaUM7aM",
  authDomain: "apiproject-1b89e.firebaseapp.com",
  projectId: "apiproject-1b89e",
  storageBucket: "apiproject-1b89e.firebasestorage.app",
  messagingSenderId: "408819531565",
  appId: "1:408819531565:web:3deb097257cad4396e9da4"
};

function setPhoto(el, url) {
  if (url) { el.style.backgroundImage = `url("${url}")`; el.classList.remove("ph"); }
  else el.classList.add("ph");
}
function applyHeroCrop(crop = heroCrop) {
  const photo = $(".hero .photo");
  if (photo) {
    photo.style.backgroundPosition = `${crop.x}% ${crop.y}%`;
    photo.style.transform = `scale(${crop.zoom / 100})`;
    photo.style.transformOrigin = `${crop.x}% ${crop.y}%`;
  }
  const preview = $("#heroEditPreview");
  if (preview) {
    preview.style.objectPosition = `${crop.x}% ${crop.y}%`;
    preview.style.transform = `scale(${crop.zoom / 100})`;
    preview.style.transformOrigin = `${crop.x}% ${crop.y}%`;
  }
  $("#editHeroX").value = crop.x;
  $("#editHeroY").value = crop.y;
  $("#editHeroZoom").value = crop.zoom;
  $("#editHeroXValue").value = `${crop.x}%`;
  $("#editHeroYValue").value = `${crop.y}%`;
  $("#editHeroZoomValue").value = `${crop.zoom}%`;
}

/* ===================== Contenido ===================== */
$("#toName").textContent = CONFIG.to;
$("#coupleNames").textContent = CONFIG.couple;
$("#fromLine").textContent = `${CONFIG.from} · ${fmtUp(CONFIG.startDate)}`;
$("#place").innerHTML = `<span aria-hidden="true">📍</span> ${esc(CONFIG.place)}`;
$("#finalNames").textContent = CONFIG.couple;
$("#finalMsg").innerHTML = `${esc(CONFIG.final.message)} <span style="color:var(--wine)">♥</span>`;
$("#finalSign").textContent = CONFIG.final.sign;
$("#ask").textContent = CONFIG.question;
$("#yes").textContent = CONFIG.answer;
$("#letterBody").innerHTML = CONFIG.letter.map(p => `<p>${esc(p)}</p>`).join("");

document.querySelectorAll("[data-photo]").forEach(el => {
  const k = el.dataset.photo;
  setPhoto(el, CONFIG.photos[k]);
});

function applyEditableContent(data) {
  if (!data || typeof data !== "object") return;
  ["to", "couple", "from", "place", "question", "answer"].forEach(key => {
    if (typeof data[key] === "string") CONFIG[key] = data[key];
  });
  if (typeof data.letter === "string") CONFIG.letter = data.letter.split(/\n\s*\n/).map(part => part.trim()).filter(Boolean);
  if (Array.isArray(data.letter)) CONFIG.letter = data.letter.filter(part => typeof part === "string");
  if (Array.isArray(data.events)) {
    CONFIG.events = data.events.filter(item => item && isISODate(item.date) && typeof item.title === "string" && typeof item.text === "string")
      .map(item => ({ date: item.date, title: item.title, text: item.text, avatar: typeof item.avatar === "string" ? item.avatar : "" }));
  }
  if (data.photos && typeof data.photos === "object") {
    ["hero", "cover", "final"].forEach(key => {
      if (typeof data.photos[key] === "string") CONFIG.photos[key] = data.photos[key];
    });
  }
  if (data.heroCrop && typeof data.heroCrop === "object") {
    const x = Number(data.heroCrop.x), y = Number(data.heroCrop.y), zoom = Number(data.heroCrop.zoom);
    if (Number.isFinite(x)) heroCrop.x = Math.min(100, Math.max(0, x));
    if (Number.isFinite(y)) heroCrop.y = Math.min(100, Math.max(0, y));
    if (Number.isFinite(zoom)) heroCrop.zoom = Math.min(180, Math.max(100, zoom));
  }
  if (data.final && typeof data.final === "object") {
    ["message", "sign"].forEach(key => {
      if (typeof data.final[key] === "string") CONFIG.final[key] = data.final[key];
    });
  }
  $("#toName").textContent = CONFIG.to;
  $("#coupleNames").textContent = CONFIG.couple;
  $("#fromLine").textContent = `${CONFIG.from} · ${fmtUp(CONFIG.startDate)}`;
  $("#place").innerHTML = `<span aria-hidden="true">📍</span> ${esc(CONFIG.place)}`;
  $("#finalNames").textContent = CONFIG.couple;
  $("#finalMsg").innerHTML = `${esc(CONFIG.final.message)} <span style="color:var(--wine)">♥</span>`;
  $("#finalSign").textContent = CONFIG.final.sign;
  $("#ask").textContent = CONFIG.question;
  $("#yes").textContent = CONFIG.answer;
  $("#letterBody").innerHTML = CONFIG.letter.map(paragraph => `<p>${esc(paragraph)}</p>`).join("");
  document.querySelectorAll("[data-photo]").forEach(el => setPhoto(el, CONFIG.photos[el.dataset.photo]));
  renderTimeline();
  applyHeroCrop();
}

// El inicio se comparte con index y persiste entre visitas.
const COUNTER_KEY = "inicio_noviazgo";
let counterStart = null;
let counterTimer = null;

function updateCounter() {
  const elapsed = Math.max(0, Math.floor((Date.now() - counterStart) / 1000));
  $("#days").textContent = Math.floor(elapsed / 86400).toLocaleString("es-ES");
  $("#hours").textContent = Math.floor(elapsed % 86400 / 3600);
  $("#minutes").textContent = Math.floor(elapsed % 3600 / 60);
  $("#seconds").textContent = elapsed % 60;
}

function startCounter(timestamp) {
  counterStart = timestamp;
  $("#since").textContent = `Desde el ${new Date(timestamp).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" })}`;
  $("#yes").disabled = true;
  $("#yes").classList.add("accepted");
  $("#no").disabled = true;
  $("#no").hidden = true;
  $("#no-message").textContent = "¡Sabía que dirías que sí! ♥";
  $("#no-message").style.display = "block";
  updateCounter();
  if (counterTimer) clearInterval(counterTimer);
  counterTimer = setInterval(updateCounter, 1000);
}

const configuredStart = () => new Date(`${CONFIG.startDate}T00:00:00`).getTime();

$("#yes").addEventListener("click", () => {
  const timestamp = configuredStart();
  try { localStorage.setItem(COUNTER_KEY, timestamp); } catch (error) {}
  startCounter(timestamp);
  $("#days").closest(".counter").scrollIntoView({ behavior: "smooth", block: "center" });
});

let noAttempts = 0;
const noPrompts = ["¿Crees que te vas a librar de mí?", "¿No quieres?", "¿Segura?", "¿De verdad?"];
$("#no").addEventListener("click", () => {
  const button = $("#no");
  const rect = button.getBoundingClientRect();
  noAttempts++;
  const maxX = Math.max(0, window.innerWidth - rect.width);
  const maxY = Math.max(0, window.innerHeight - rect.height);
  const points = [[maxX * .82, maxY * .18], [maxX * .12, maxY * .72], [maxX * .76, maxY * .78], [maxX * .25, maxY * .22]];
  button.disabled = true;
  button.classList.add("no-flying");
  button.style.left = rect.left + "px";
  button.style.top = rect.top + "px";
  const frames = [{ transform: "translate(0,0) rotate(0deg)" }];
  points.forEach((point, index) => frames.push({ transform: `translate(${point[0] - rect.left}px,${point[1] - rect.top}px) rotate(${(index % 2 ? 1 : -1) * 18}deg)` }));
  const flight = button.animate(frames, { duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1800, easing: "ease-in-out", fill: "forwards" });
  flight.onfinish = () => {
    button.style.transform = frames[frames.length - 1].transform;
    flight.cancel();
    setTimeout(() => {
      const message = $("#no-message");
      if (noAttempts > noPrompts.length) {
        button.remove();
        message.textContent = "Sabía que dirías que sí ♥";
        $("#yes").classList.add("glow");
      } else {
        button.textContent = noAttempts === 1 ? "Ya" : noPrompts[noAttempts - 1];
        message.textContent = noPrompts[noAttempts - 1];
        button.classList.remove("no-flying");
        button.style.left = "";
        button.style.top = "";
        button.style.transform = "";
        button.disabled = false;
      }
      message.style.display = "block";
    }, 900);
  };
});

try {
  const savedStart = Number(localStorage.getItem(COUNTER_KEY));
  if (Number.isFinite(savedStart) && savedStart > 0) startCounter(configuredStart());
} catch (error) {}

// Timeline (de más antiguo a más reciente)
function renderTimeline() {
  $("#timeline").innerHTML = [...CONFIG.events].sort((a,b) => a.date.localeCompare(b.date)).map(event => `
  <article class="event">
    <div class="meta"><div class="avatar" data-av="${esc(event.avatar || "")}"></div><time datetime="${esc(event.date)}">${fmtLong(event.date)}</time></div>
    <h3>${esc(event.title)}</h3>
    <p>${esc(event.text)}</p>
  </article>`).join("");
  document.querySelectorAll("#timeline [data-av]").forEach(el => setPhoto(el, el.dataset.av));
}
renderTimeline();

/* ===================== Entrada: sobre + flores ===================== */
(function initEnvelope() {
  const gate = $("#gate"), btn = $("#envelopeBtn"), bloom = $("#bloom"), env = $(".envelope");
  if (!gate || !btn || !bloom || !env) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rnd = (a, b) => a + Math.random() * (b - a);

  const PALETTES = [
    ["#f7a8b8", "#ec7a93", "#c9304f"],
    ["#fbe9e0", "#f4cfc6", "#e8a9a4"],
    ["#c7243f", "#a3162f", "#7b0f22"],
    ["#f9c6cf", "#f08fa4", "#d9546f"],
    ["#fff6ea", "#f6dcc8", "#e9bca6"],
    ["#ea8ea4", "#d4607d", "#b13a58"]
  ];

  function flowerSVG(p) {
    const layer = (n, cy, rx, ry, fill, rot) => {
      let s = "";
      for (let i = 0; i < n; i++) s += `<ellipse cx="0" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" transform="rotate(${rot + i * 360 / n})"/>`;
      return s;
    };
    return `<svg viewBox="-52 -52 104 104" aria-hidden="true">
      <g stroke="rgba(120,20,40,.2)" stroke-width=".8">
        ${layer(8, -27, 15, 24, p[0], 0)}${layer(6, -18, 12, 18, p[1], 20)}${layer(5, -10, 8, 12, p[2], 10)}
      </g>
      <circle r="4.5" fill="#e8b548" opacity=".85"/>
    </svg>`;
  }

  function buildBloom() {
    const rect = env.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const R = Math.max(
      Math.hypot(cx, cy), Math.hypot(innerWidth - cx, cy),
      Math.hypot(cx, innerHeight - cy), Math.hypot(innerWidth - cx, innerHeight - cy)
    ) * 1.06;
    const N = Math.min(150, Math.max(90, Math.round(innerWidth * innerHeight / 7000)));
    const c = R / Math.sqrt(N), golden = Math.PI * (3 - Math.sqrt(5));
    const frag = document.createDocumentFragment();
    for (let i = 1; i <= N; i++) {
      const r = c * Math.sqrt(i), a = i * golden;
      const size = Math.max(84, c * 2.7) * rnd(.85, 1.2);
      const f = document.createElement("span");
      f.className = "flower";
      f.style.width = f.style.height = size + "px";
      f.style.left = (Math.cos(a) * r - size / 2) + "px";
      f.style.top = (Math.sin(a) * r - size / 2) + "px";
      f.style.setProperty("--r0", rnd(-50, -20) + "deg");
      f.style.setProperty("--r1", rnd(0, 360) + "deg");
      f.style.setProperty("--d", ((r / R) * 1.2 + rnd(0, .15)).toFixed(2) + "s");
      f.innerHTML = flowerSVG(PALETTES[Math.floor(Math.random() * PALETTES.length)]);
      frag.appendChild(f);
    }
    bloom.replaceChildren(frag);
  }

  function reveal(keepFlowers = false) {
    document.body.classList.remove("locked");
    $("#main").removeAttribute("aria-hidden");
    window.scrollTo(0, 0);
    if (keepFlowers) {
      document.body.classList.add("flowers-kept");
      document.body.appendChild(bloom);
      gate.remove();
      return;
    }
    gate.classList.add("gone");
    setTimeout(() => { bloom.replaceChildren(); gate.style.display = "none"; }, 1400);
  }

  function bloomAndReveal(keepFlowers = false) {
    buildBloom();
    gate.classList.add("is-blooming");
    setTimeout(() => reveal(keepFlowers), reduce ? 500 : 2350);
  }

  if (new URLSearchParams(window.location.search).has("fromUniverse")) {
    gate.classList.add("from-universe");
    bloomAndReveal(true);
    return;
  }

  btn.addEventListener("click", () => {
    if (gate.classList.contains("is-opening")) return;
    btn.disabled = true;
    gate.classList.add("is-opening");
    setTimeout(() => {
      bloomAndReveal(false);
    }, reduce ? 120 : 500);
  });
})();

/* ===================== Galería ===================== */
const car = $("#carousel"), dots = $("#dots");
const localGallery = CONFIG.photos.gallery.map(url => ({ id: `local:${url}`, name: url.split("/").pop(), url, type: "image" }));
const ORDER_PATH = "config/propuesta-galeria.json";
const CONTENT_PATH = "config/propuesta-contenido.json";
let gallery = localGallery.slice();
let hiddenGalleryIds = new Set();
let galleryStorage = null;
let galleryAuth = null;
let cur = 0;
function setDot(i) { cur = i; [...dots.children].forEach((d, n) => d.classList.toggle("on", n === i)); }
function makeGalleryMedia(item) {
  const media = document.createElement(item.type === "video" ? "video" : "img");
  media.src = item.url;
  if (media.tagName === "VIDEO") {
    media.controls = true;
    media.playsInline = true;
    media.preload = "metadata";
    media.setAttribute("aria-label", item.name);
  } else {
    media.alt = item.name;
  }
  return media;
}
function renderGallery(selectedId) {
  const selected = selectedId || gallery[cur]?.id;
  car.replaceChildren();
  dots.replaceChildren();
  gallery.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.dataset.g = String(index);
    slide.append(makeGalleryMedia(item));
    const count = document.createElement("span");
    count.className = "count";
    count.textContent = `${index + 1}/${gallery.length}`;
    slide.append(count);
    car.append(slide);
    dots.append(document.createElement("i"));
  });
  cur = Math.max(0, gallery.findIndex(item => item.id === selected));
  setDot(cur);
  if (gallery.length > 1) requestAnimationFrame(() => goTo(cur));
  renderGalleryEditor();
  if (!$("#contentEditor").hidden) populateContentEditor();
}
function goTo(i) {
  if (!gallery.length) return;
  i = Math.max(0, Math.min(gallery.length - 1, i));
  const s = car.children[i];
  car.scrollTo({ left: s.offsetLeft - (car.clientWidth - s.clientWidth) / 2, behavior: "smooth" });
}
car.addEventListener("scroll", () => {
  const center = car.scrollLeft + car.clientWidth / 2;
  let best = 0, dist = Infinity;
  [...car.children].forEach((s, i) => {
    const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
    if (d < dist) { dist = d; best = i; }
  });
  if (best !== cur) setDot(best);
}, { passive: true });
$("#prev").onclick = () => goTo(cur - 1);
$("#next").onclick = () => goTo(cur + 1);
car.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") goTo(cur + 1);
  if (e.key === "ArrowLeft") goTo(cur - 1);
});
function renderGalleryEditor() {
  const editor = $("#galleryEditor");
  if (editor.hidden) return;
  editor.replaceChildren();
  gallery.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "gallery-edit-item";
    row.draggable = true;
    const preview = makeGalleryMedia(item);
    if (preview.tagName === "VIDEO") {
      preview.controls = false;
      preview.muted = true;
      preview.preload = "metadata";
    }
    const name = document.createElement("span");
    name.textContent = item.name;
    const up = document.createElement("button");
    up.type = "button";
    up.textContent = "↑";
    up.setAttribute("aria-label", `Mover ${item.name} antes`);
    up.disabled = index === 0;
    up.onclick = () => moveGalleryItem(index, index - 1);
    const down = document.createElement("button");
    down.type = "button";
    down.textContent = "↓";
    down.setAttribute("aria-label", `Mover ${item.name} después`);
    down.disabled = index === gallery.length - 1;
    down.onclick = () => moveGalleryItem(index, index + 1);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Quitar ${item.name} de la galería`);
    remove.onclick = () => deleteGalleryItem(item);
    row.append(preview, name, up, down, remove);
    row.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", String(index));
      row.classList.add("dragging");
    });
    row.addEventListener("dragend", () => row.classList.remove("dragging"));
    row.addEventListener("dragover", event => event.preventDefault());
    row.addEventListener("drop", event => {
      event.preventDefault();
      moveGalleryItem(Number(event.dataTransfer.getData("text/plain")), index);
    });
    editor.append(row);
  });
}
function saveGalleryOrder() {
  if (!galleryStorage || !isGalleryAdmin()) return Promise.resolve();
  const order = { items: gallery.map(item => item.id), hidden: [...hiddenGalleryIds] };
  $("#galleryStatus").textContent = "Guardando el orden…";
  return galleryStorage.ref(ORDER_PATH).putString(JSON.stringify(order), firebase.storage.StringFormat.RAW, { contentType: "application/json" })
    .then(() => { $("#galleryStatus").textContent = "Orden guardado para todas las visitas."; })
    .catch(() => { $("#galleryStatus").textContent = "No se pudo guardar el orden. Revisa las reglas de Firebase Storage."; });
}
function moveGalleryItem(from, to) {
  if (to < 0 || to >= gallery.length || from === to) return;
  const [item] = gallery.splice(from, 1);
  gallery.splice(to, 0, item);
  renderGallery(item.id);
  saveGalleryOrder();
}
function readGalleryOrder() {
  return galleryStorage.ref(ORDER_PATH).getDownloadURL()
    .then(url => fetch(url))
    .then(response => response.ok ? response.json() : null)
    .then(data => Array.isArray(data)
      ? { items: data, hidden: [] }
      : { items: Array.isArray(data?.items) ? data.items : [], hidden: Array.isArray(data?.hidden) ? data.hidden : [] })
    .catch(() => ({ items: [], hidden: [] }));
}
function readSharedContent() {
  return galleryStorage.ref(CONTENT_PATH).getDownloadURL()
    .then(url => fetch(url))
    .then(response => response.ok ? response.json() : null)
    .then(data => { if (data) applyEditableContent(data); })
    .catch(() => {});
}
function editableContentFromForm() {
  return {
    to: $("#editTo").value.trim(),
    couple: $("#editCouple").value.trim(),
    from: $("#editFrom").value.trim(),
    place: $("#editPlace").value.trim(),
    question: $("#editQuestion").value.trim(),
    answer: $("#editAnswer").value.trim(),
    letter: $("#editLetter").value.trim(),
    events: readEventsEditor(),
    final: { ...CONFIG.final, message: $("#editFinalMessage").value.trim(), sign: $("#editFinalSign").value.trim() },
    photos: {
      ...CONFIG.photos,
      hero: $("#editHeroPhoto").value,
      cover: $("#editCoverPhoto").value,
      final: $("#editFinalPhoto").value
    },
    heroCrop: {
      x: Number($("#editHeroX").value),
      y: Number($("#editHeroY").value),
      zoom: Number($("#editHeroZoom").value)
    }
  };
}
function readEventsEditor() {
  return [...$("#eventsEditor").querySelectorAll(".event-edit-item")].map(item => ({
    date: item.querySelector("[data-event-date]").value,
    title: item.querySelector("[data-event-title]").value.trim(),
    text: item.querySelector("[data-event-text]").value.trim(),
    avatar: item.dataset.avatar || ""
  }));
}
function updateEventEditorLabels() {
  [...$("#eventsEditor").querySelectorAll(".event-edit-item")].forEach((item, index) => {
    item.querySelector("legend").textContent = `Recuerdo ${index + 1}`;
  });
}
function renderEventsEditor(events) {
  const editor = $("#eventsEditor");
  editor.replaceChildren();
  events.forEach(event => {
    const item = document.createElement("fieldset");
    item.className = "event-edit-item";
    item.dataset.avatar = event.avatar || "";

    const legend = document.createElement("legend");
    item.append(legend);

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.required = true;
    dateInput.dataset.eventDate = "";
    dateInput.value = event.date || "";
    const dateLabel = document.createElement("label");
    dateLabel.append("Fecha", dateInput);

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.required = true;
    titleInput.dataset.eventTitle = "";
    titleInput.value = event.title || "";
    const titleLabel = document.createElement("label");
    titleLabel.append("Título", titleInput);

    const textInput = document.createElement("textarea");
    textInput.rows = 3;
    textInput.required = true;
    textInput.dataset.eventText = "";
    textInput.value = event.text || "";
    const textLabel = document.createElement("label");
    textLabel.className = "description-field";
    textLabel.append("Descripción", textInput);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "gallery-cancel";
    removeButton.textContent = "Eliminar recuerdo";
    removeButton.addEventListener("click", () => {
      item.remove();
      updateEventEditorLabels();
    });

    item.append(dateLabel, titleLabel, textLabel, removeButton);
    editor.append(item);
  });
  updateEventEditorLabels();
}
function populatePhotoSelect(selector, currentUrl) {
  const select = $(selector);
  select.replaceChildren();
  const current = document.createElement("option");
  current.value = currentUrl || "";
  current.textContent = currentUrl ? "Foto actual" : "Sin foto";
  select.append(current);
  gallery.filter(item => item.type === "image").forEach(item => {
    if (item.url === currentUrl) return;
    const option = document.createElement("option");
    option.value = item.url;
    option.textContent = item.name;
    select.append(option);
  });
  select.value = currentUrl || "";
}
function populateContentEditor() {
  $("#editTo").value = CONFIG.to;
  $("#editCouple").value = CONFIG.couple;
  $("#editFrom").value = CONFIG.from;
  $("#editPlace").value = CONFIG.place;
  $("#editQuestion").value = CONFIG.question;
  $("#editAnswer").value = CONFIG.answer;
  $("#editFinalMessage").value = CONFIG.final.message;
  $("#editFinalSign").value = CONFIG.final.sign;
  $("#editLetter").value = CONFIG.letter.join("\n\n");
  renderEventsEditor(CONFIG.events);
  populatePhotoSelect("#editHeroPhoto", CONFIG.photos.hero);
  $("#heroEditPreview").src = heroPreviewObjectUrl || CONFIG.photos.hero;
  $("#heroUploadName").textContent = pendingHeroFile?.name || "Elige una imagen para previsualizarla y ajustarla.";
  applyHeroCrop();
  populatePhotoSelect("#editFinalPhoto", CONFIG.photos.final);
}
$("#addTimelineEvent").addEventListener("click", () => {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  renderEventsEditor([...readEventsEditor(), { date, title: "", text: "", avatar: "" }]);
});
[["#editHeroX", "x", "#editHeroXValue"], ["#editHeroY", "y", "#editHeroYValue"], ["#editHeroZoom", "zoom", "#editHeroZoomValue"]].forEach(([selector, key, outputSelector]) => {
  $(selector).addEventListener("input", event => {
    heroCrop[key] = Number(event.target.value);
    $(outputSelector).value = `${event.target.value}%`;
    applyHeroCrop(heroCrop);
  });
});
function isGalleryAdmin() {
  const user = galleryAuth?.currentUser;
  return !!user && user.emailVerified && user.email === GALLERY_ADMIN_EMAIL;
}
function deleteGalleryItem(item) {
  if (!isGalleryAdmin() || !window.confirm(`¿Quitar «${item.name}» de la galería?`)) return;
  const deletion = item.id.startsWith("local:")
    ? Promise.resolve().then(() => hiddenGalleryIds.add(item.id))
    : galleryStorage.ref(item.id).delete();
  deletion.then(() => {
    gallery = gallery.filter(entry => entry.id !== item.id);
    renderGallery(gallery[cur]?.id);
    return saveGalleryOrder();
  }).then(() => {
    if (!$("#galleryStatus").textContent.startsWith("No se pudo")) $("#galleryStatus").textContent = "Elemento quitado de la galería.";
  }).catch(() => {
    $("#galleryStatus").textContent = "No se pudo quitar el elemento. Revisa las reglas de Firebase Storage.";
  });
}
function loadSharedGallery() {
  if (!galleryStorage) return;
  galleryStorage.ref("recuerdos").listAll().then(result => Promise.all(result.items.map(reference =>
    Promise.all([reference.getDownloadURL(), reference.getMetadata()]).then(([url, metadata]) => ({
      id: reference.fullPath,
      name: metadata.name,
      url,
      audio: metadata.contentType?.startsWith("audio/"),
      type: metadata.contentType?.startsWith("video/") ? "video" : "image",
      timeCreated: metadata.timeCreated
    }))
  ))).then(items => items.filter(item => !item.audio)).then(sharedItems => {
    sharedItems.sort((first, second) => new Date(first.timeCreated) - new Date(second.timeCreated));
    return readGalleryOrder().then(({ items, hidden }) => {
      hiddenGalleryIds = new Set(hidden);
      const available = [...localGallery, ...sharedItems].filter(item => !hiddenGalleryIds.has(item.id));
      const byId = new Map(available.map(item => [item.id, item]));
      const ordered = items.map(id => byId.get(id)).filter(Boolean);
      const included = new Set(ordered.map(item => item.id));
      gallery = ordered.concat(available.filter(item => !included.has(item.id)));
      renderGallery();
    });
  }).catch(() => {
    $("#galleryStatus").textContent = "No se pudieron cargar los recuerdos compartidos. Revisa las reglas de Firebase.";
  });
}
function initializeGallerySharing() {
  if (!window.firebase) {
    $("#galleryStatus").textContent = "No se pudo cargar Firebase. Revisa tu conexión a internet.";
    $("#galleryLogin").disabled = true;
    return;
  }
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    galleryStorage = firebase.storage();
    galleryAuth = firebase.auth();
    galleryAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
    galleryAuth.onAuthStateChanged(user => {
      const canManage = !!user && user.emailVerified && user.email === GALLERY_ADMIN_EMAIL;
      $("#galleryLogin").hidden = canManage;
      $("#galleryLogout").hidden = !canManage;
      $("#galleryAdd").hidden = !canManage;
      $("#galleryArrange").hidden = !canManage;
      $("#contentEdit").hidden = !canManage;
      if (!canManage) {
        $("#galleryEditor").hidden = true;
        $("#contentEditor").hidden = true;
        $("#galleryArrange").textContent = "Organizar galería";
      }
      renderGalleryEditor();
    });
    loadSharedGallery();
    readSharedContent();
  } catch (error) {
    $("#galleryStatus").textContent = "No se pudo iniciar Firebase. Revisa la configuración.";
    $("#galleryLogin").disabled = true;
  }
}
$("#galleryLogin").onclick = () => {
  window.location.assign("Propuesta-login.html");
};
$("#galleryLogout").onclick = () => galleryAuth?.signOut();
$("#galleryArrange").onclick = () => {
  const editor = $("#galleryEditor");
  editor.hidden = !editor.hidden;
  $("#galleryArrange").textContent = editor.hidden ? "Organizar galería" : "Terminar de organizar";
  renderGalleryEditor();
};
$("#contentEdit").onclick = () => {
  const editor = $("#contentEditor");
  editor.hidden = !editor.hidden;
  if (!editor.hidden) populateContentEditor();
};
$("#editHeroPhoto").addEventListener("change", event => {
  if (heroPreviewObjectUrl) URL.revokeObjectURL(heroPreviewObjectUrl);
  heroPreviewObjectUrl = null;
  pendingHeroFile = null;
  $("#editHeroUpload").value = "";
  $("#heroUploadName").textContent = "Elige una imagen para previsualizarla y ajustarla.";
  $("#heroEditPreview").src = event.target.value;
  setPhoto($(".hero .photo"), event.target.value);
  applyHeroCrop();
});
$("#editHeroUpload").addEventListener("change", event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/") || file.size >= 100 * 1024 * 1024) {
    event.target.value = "";
    $("#galleryStatus").textContent = "Selecciona una imagen de menos de 100 MB.";
    return;
  }
  if (heroPreviewObjectUrl) URL.revokeObjectURL(heroPreviewObjectUrl);
  pendingHeroFile = file;
  heroPreviewObjectUrl = URL.createObjectURL(file);
  $("#heroUploadName").textContent = file.name;
  $("#heroEditPreview").src = heroPreviewObjectUrl;
  setPhoto($(".hero .photo"), heroPreviewObjectUrl);
  applyHeroCrop();
});
$("#contentCancel").onclick = () => {
  $("#contentEditor").hidden = true;
  pendingHeroFile = null;
  $("#editHeroUpload").value = "";
  $("#heroUploadName").textContent = "Elige una imagen para previsualizarla y ajustarla.";
  if (heroPreviewObjectUrl) URL.revokeObjectURL(heroPreviewObjectUrl);
  heroPreviewObjectUrl = null;
  $("#heroEditPreview").src = CONFIG.photos.hero;
  setPhoto($(".hero .photo"), CONFIG.photos.hero);
  applyHeroCrop();
};
$("#contentEditor").onsubmit = event => {
  event.preventDefault();
  if (!galleryStorage || !isGalleryAdmin()) {
    $("#galleryStatus").textContent = "Inicia sesión con el correo administrador para guardar cambios.";
    return;
  }
  const content = editableContentFromForm();
  const saveButton = $("#contentEditor").querySelector("button[type='submit']");
  saveButton.disabled = true;
  $("#galleryStatus").textContent = "Guardando contenido…";
  const uploadHero = pendingHeroFile
    ? (() => {
      const file = pendingHeroFile;
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `recuerdos/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
      return galleryStorage.ref(path).put(file, { contentType: file.type })
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          content.photos.hero = url;
          gallery.push({ id: path, name: file.name, url, type: "image" });
          renderGallery();
        });
    })()
    : Promise.resolve();
  uploadHero.then(() => galleryStorage.ref(CONTENT_PATH).putString(JSON.stringify(content), firebase.storage.StringFormat.RAW, { contentType: "application/json" }))
    .then(() => {
      applyEditableContent(content);
      $("#contentEditor").hidden = true;
      $("#heroEditPreview").src = CONFIG.photos.hero;
      pendingHeroFile = null;
      $("#editHeroUpload").value = "";
      $("#heroUploadName").textContent = "Elige una imagen para previsualizarla y ajustarla.";
      if (heroPreviewObjectUrl) URL.revokeObjectURL(heroPreviewObjectUrl);
      heroPreviewObjectUrl = null;
      $("#galleryStatus").textContent = "Cambios guardados para todas las visitas.";
    })
    .catch(() => { $("#galleryStatus").textContent = "No se pudo guardar el contenido. Publica las reglas actualizadas de Firebase Storage."; })
    .then(() => { saveButton.disabled = false; });
};
$("#galleryAdd").onclick = () => $("#galleryInput").click();
$("#galleryInput").onchange = event => {
  const files = Array.from(event.target.files || []).filter(file => file.type.startsWith("image/") || file.type.startsWith("video/"));
  if (!galleryStorage || !isGalleryAdmin()) {
    $("#galleryStatus").textContent = "Inicia sesión para subir recuerdos.";
    event.target.value = "";
    return;
  }
  if (!files.length || files.some(file => file.size >= 100 * 1024 * 1024)) {
    $("#galleryStatus").textContent = "Selecciona fotos o videos de menos de 100 MB.";
    event.target.value = "";
    return;
  }
  $("#galleryAdd").disabled = true;
  $("#galleryStatus").textContent = "Subiendo recuerdos…";
  Promise.all(files.map(file => {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `recuerdos/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
    const reference = galleryStorage.ref(path);
    return reference.put(file, { contentType: file.type }).then(snapshot => snapshot.ref.getDownloadURL()).then(url => ({
      id: path,
      name: file.name,
      url,
      type: file.type.startsWith("video/") ? "video" : "image"
    }));
  })).then(uploaded => {
    gallery.push(...uploaded);
    renderGallery(uploaded[0]?.id);
    return saveGalleryOrder().then(() => {
      if (!$("#galleryStatus").textContent.startsWith("No se pudo guardar")) $("#galleryStatus").textContent = "Recuerdos subidos y compartidos.";
    });
  }).catch(() => { $("#galleryStatus").textContent = "No se pudieron subir. Revisa la conexión y las reglas de Firebase."; })
    .then(() => { $("#galleryAdd").disabled = false; event.target.value = ""; });
};
renderGallery();
initializeGallerySharing();

