/* Blue Ocean: KIIT University Campus Events */

const events = [
  { id: 1, title: "KIIT Tech Innovators Summit", category: "Technology", date: "2026-08-15T10:00:00", venue: "Campus 6 Auditorium, KIIT University", image: "https://picsum.photos/seed/kiittechsummit/700/875", description: "KIIT's flagship technology summit featuring project demos, AI and robotics showcases from CSE students, coding battles, and talks by alumni working at leading tech companies." },
  { id: 2, title: "KIIT Fest: Indie Music Night", category: "Music", date: "2026-09-05T18:30:00", venue: "Open Air Theatre, KIIT Campus 1", image: "https://picsum.photos/seed/kiitmusicnight/700/875", description: "An electrifying evening of live indie performances, student bands, food stalls, and a campus-wide after-party at the KIIT Open Air Theatre." },
  { id: 3, title: "KIIT TBI Startup Bootcamp", category: "Business", date: "2026-07-22T09:00:00", venue: "KIIT TBI Incubator, Campus 11", image: "https://picsum.photos/seed/kiitstartup/700/875", description: "A hands-on bootcamp at the KIIT Technology Business Incubator covering ideation, pitch decks, funding basics, and mentorship from successful KIIT alumni founders." },
  { id: 4, title: "KIIT School of Art Exhibition", category: "Art", date: "2026-10-12T11:00:00", venue: "Campus 6 Gallery, KIIT University", image: "https://picsum.photos/seed/kiitartexhibition/700/875", description: "Explore contemporary paintings, digital art, and interactive installations created by students of the KIIT School of Fine Arts, with live sketching sessions." },
  { id: 5, title: "KIIT Campus Marathon 2026", category: "Sports", date: "2026-11-01T06:00:00", venue: "KIIT Stadium, Campus 3", image: "https://picsum.photos/seed/kiitmarathon/700/875", description: "Lace up for the annual KIIT Campus Marathon. Choose 5K, 10K, or half-marathon routes across campus, with hydration points, medals, and a post-race celebration." },
  { id: 6, title: "KIIT AI & Data Science Bootcamp", category: "Education", date: "2026-08-29T10:00:00", venue: "Campus 15 Lab, KIIT University", image: "https://picsum.photos/seed/kiitaibootcamp/700/875", description: "A beginner-friendly KIIT bootcamp covering Python, data analysis, machine learning basics, and career guidance, taught by faculty and senior students from the School of Computer Engineering." }
];

/* ---------- Element refs ---------- */
const $ = (id) => document.getElementById(id);
const eventGrid = $("eventGrid"), searchInput = $("searchInput"), categoryChips = $("categoryChips"), noResults = $("noResults");
const registrationForm = $("registrationForm"), nameInput = $("name"), emailInput = $("email"), phoneInput = $("phone"), eventSelect = $("eventSelect"), formMessage = $("formMessage");
const nameError = $("nameError"), emailError = $("emailError"), phoneError = $("phoneError"), eventError = $("eventError");
const eventModal = $("eventModal"), modalClose = $("modalClose"), modalImage = $("modalImage"), modalCategory = $("modalCategory"), modalTitle = $("modalTitle"), modalMeta = $("modalMeta"), modalDesc = $("modalDesc"), countdown = $("countdown"), modalRegister = $("modalRegister");
const themeToggle = $("themeToggle");

let currentCategory = "All", activeEventId = null, countdownTimer = null;

const formatDate = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
const pad = (n) => String(n).padStart(2, "0");

/* ---------- Render events ---------- */
function renderEvents() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = events.filter((e) => {
    const okCat = currentCategory === "All" || e.category === currentCategory;
    const okSearch = [e.title, e.description, e.venue, e.category].some((t) => t.toLowerCase().includes(term));
    return okCat && okSearch;
  });

  eventGrid.innerHTML = filtered.map((e, i) => `
    <article class="event-card" data-id="${e.id}" style="animation-delay:${i * 90}ms">
      <div class="card-img">
        <span class="card-category">${e.category}</span>
        <img src="${e.image}" alt="${e.title}" loading="lazy" />
      </div>
      <div class="card-top"><span>${pad(i + 1)}</span><span>${formatDate(e.date)}</span></div>
      <h3>${e.title}</h3>
      <p class="card-meta">${e.venue}</p>
      <div class="card-actions">
        <button class="btn btn-outline" type="button" data-action="details">Details</button>
        <button class="btn btn-small" type="button" data-action="register">Register</button>
      </div>
    </article>`).join("");

  noResults.hidden = filtered.length !== 0;
}

function populateEventSelect() {
  eventSelect.insertAdjacentHTML("beforeend", events.map((e) => `<option value="${e.id}">${e.title} (${formatDate(e.date)})</option>`).join(""));
}

/* ---------- Marquee ---------- */
function buildMarquee() {
  const items = events.map((e) => `<span>${e.title}</span>`).join("");
  $("marqueeTrack").innerHTML = items + items + items + items;
}

/* ---------- Filters & card actions ---------- */
categoryChips.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  categoryChips.querySelectorAll(".chip").forEach((c) => { c.classList.remove("active"); c.setAttribute("aria-selected", "false"); });
  chip.classList.add("active");
  chip.setAttribute("aria-selected", "true");
  currentCategory = chip.dataset.category;
  renderEvents();
});

eventGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".event-card");
  if (!card) return;
  const id = Number(card.dataset.id);
  const button = e.target.closest("[data-action]");
  if (button && button.dataset.action === "register") selectEvent(id);
  else openModal(id);
});

searchInput.addEventListener("input", renderEvents);

/* ---------- Modal ---------- */
function openModal(eventId) {
  const e = events.find((x) => x.id === eventId);
  if (!e) return;
  activeEventId = eventId;
  modalImage.src = e.image;
  modalImage.alt = e.title;
  modalCategory.textContent = e.category;
  modalTitle.textContent = e.title;
  modalMeta.textContent = `${formatDate(e.date)}  |  ${e.venue}`;
  modalDesc.textContent = e.description;
  eventModal.classList.add("show");
  eventModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  startCountdown(e.date);
}

function closeModal() {
  eventModal.classList.remove("show");
  eventModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeEventId = null;
  clearInterval(countdownTimer);
  countdownTimer = null;
  countdown.textContent = "";
}

modalClose.addEventListener("click", closeModal);
eventModal.addEventListener("click", (e) => { if (e.target.dataset.close === "true") closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && eventModal.classList.contains("show")) closeModal(); });
modalRegister.addEventListener("click", () => { if (activeEventId !== null) selectEvent(activeEventId); });

function startCountdown(target) {
  clearInterval(countdownTimer);
  const t = new Date(target).getTime();
  function tick() {
    const diff = t - Date.now();
    if (diff <= 0) {
      countdown.textContent = "This event has started or already passed.";
      clearInterval(countdownTimer);
      return;
    }
    const d = Math.floor(diff / 864e5), h = Math.floor((diff / 36e5) % 24), m = Math.floor((diff / 6e4) % 60), s = Math.floor((diff / 1e3) % 60);
    countdown.textContent = `Starts in ${d}d ${h}h ${m}m ${s}s`;
  }
  tick();
  countdownTimer = setInterval(tick, 1000);
}

function selectEvent(eventId) {
  eventSelect.value = String(eventId);
  closeModal();
  updatePass();
  goTo("#register", "Register");
  setTimeout(() => nameInput.focus({ preventScroll: true }), 1600);
}

/* ---------- Form validation ---------- */
function setError(input, el, msg) {
  el.textContent = msg;
  if (msg) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function clearErrors() {
  setError(nameInput, nameError, "");
  setError(emailInput, emailError, "");
  setError(phoneInput, phoneError, "");
  setError(eventSelect, eventError, "");
}

function validateForm() {
  let valid = true;
  clearErrors();
  if (nameInput.value.trim().length < 2) { setError(nameInput, nameError, "Enter your full name."); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) { setError(emailInput, emailError, "Enter a valid email address."); valid = false; }
  if (!/^\d{10,15}$/.test(phoneInput.value.replace(/\D/g, ""))) { setError(phoneInput, phoneError, "Enter a phone number with 10 to 15 digits."); valid = false; }
  if (!eventSelect.value) { setError(eventSelect, eventError, "Choose an event."); valid = false; }
  return valid;
}

registrationForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  formMessage.textContent = "";
  formMessage.className = "form-message";

  if (!validateForm()) {
    formMessage.textContent = "Fix the highlighted fields above.";
    formMessage.classList.add("error-message");
    return;
  }

  const chosen = events.find((e) => e.id === Number(eventSelect.value));
  const registration = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    eventId: chosen.id,
    eventTitle: chosen.title,
    venue: chosen.venue,
    passId: passId(chosen.id, nameInput.value.trim()),
    style: pass.dataset.theme,
    registeredAt: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem("blueocean-registrations") || "[]");
    existing.push(registration);
    localStorage.setItem("blueocean-registrations", JSON.stringify(existing));
  } catch (_) {}

  formMessage.textContent = `You're in, ${registration.name}. Registration confirmed for "${chosen.title}" at ${chosen.venue}.`;
  formMessage.classList.add("success");
  updatePass();
  pass.classList.add("confirmed");
  registrationForm.reset();
  clearErrors();
});

[nameInput, emailInput, phoneInput, eventSelect].forEach((f) =>
  f.addEventListener("input", () => { formMessage.textContent = ""; formMessage.className = "form-message"; pass.classList.remove("confirmed"); })
);

/* ---------- Auto-generated event pass ---------- */
const pass = $("pass");
function hash(str) {
  let h = 2166136261;
  for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function passId(eventId, name) {
  return `BO-${pad(eventId)}-${hash(name.toLowerCase() + eventId).toString(36).toUpperCase().slice(0, 4).padEnd(4, "0")}`;
}
function updatePass() {
  const ev = events.find((e) => e.id === Number(eventSelect.value));
  const name = nameInput.value.trim();
  const style = registrationForm.elements.style.value || "ocean";
  pass.dataset.theme = style;
  $("passName").textContent = name || "Your name";
  if (!ev) return;
  $("passImg").src = ev.image;
  $("passImg").alt = ev.title;
  $("passCat").textContent = ev.category;
  $("passTitle").textContent = ev.title;
  $("passMeta").textContent = `${formatDate(ev.date)}, ${ev.venue}`;
  const id = passId(ev.id, name);
  $("passId").textContent = id;
  let seed = hash(id), bars = "";
  for (let i = 0; i < 46; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    bars += `<i style="width:${1 + (seed >>> 28) % 4}px"></i>`;
  }
  $("passBars").innerHTML = bars;
}
function popPass() {
  pass.classList.remove("pop");
  void pass.offsetWidth;
  pass.classList.add("pop");
}
nameInput.addEventListener("input", updatePass);
eventSelect.addEventListener("change", () => { updatePass(); popPass(); });
registrationForm.addEventListener("change", (e) => { if (e.target.name === "style") { updatePass(); popPass(); } });

// subtle 3D tilt that follows the pointer
pass.addEventListener("pointermove", (e) => {
  const r = pass.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  pass.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
});
pass.addEventListener("pointerleave", () => { pass.style.transform = ""; });

/* ---------- Theme ---------- */
function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark", dark);
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  try { localStorage.setItem("blueocean-theme", theme); } catch (_) {}
}
let saved = null;
try { saved = localStorage.getItem("blueocean-theme"); } catch (_) {}
applyTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeToggle.addEventListener("click", () => applyTheme(document.body.classList.contains("dark") ? "light" : "dark"));

/* ---------- Local clock (Bhubaneswar, IST) ---------- */
function tickClock() {
  $("clock").textContent = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
}
tickClock();
setInterval(tickClock, 30000);

/* ---------- Custom cursor ---------- */
(function cursor() {
  const c = $("cursor"), label = $("cursorLabel");
  if (matchMedia("(hover: none)").matches) return;
  let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; c.style.opacity = 1; });
  (function loop() {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    c.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    const card = e.target.closest(".event-card");
    const onButton = e.target.closest("button, a, input, select");
    const big = card && !onButton;
    c.classList.toggle("big", !!big);
    label.textContent = big ? "View" : "";
  });
})();

/* ---------- Stat counters ---------- */
function setupCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const run = (el) => {
    const target = parseFloat(el.dataset.target), suffix = el.dataset.suffix || "", start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / 1600, 1), v = target * (1 - Math.pow(1 - p, 3));
      el.textContent = Math.floor(v) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  };
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
  }), { threshold: 0.4 });
  counters.forEach((el) => io.observe(el));
}

/* ---------- Loader, then hero reveal ---------- */
function runLoader() {
  const num = $("loaderNum"), loader = $("loader"), start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / 1200, 1);
    num.textContent = Math.floor(p * 100);
    if (p < 1) return requestAnimationFrame(step);
    loader.classList.add("done");
    document.body.classList.add("ready");
  })(start);
}

/* ---------- Page curtain navigation ---------- */
const curtain = $("curtain");
let navigating = false;
function jump(hash) {
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  if (hash === "#contact") window.scrollTo(0, root.scrollHeight);
  else if (hash === "#top") window.scrollTo(0, 0);
  else document.querySelector(hash)?.scrollIntoView();
  root.style.scrollBehavior = "";
}
function goTo(hash, label) {
  if (navigating) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return jump(hash);
  navigating = true;
  $("curtainLabel").textContent = label || "";
  curtain.className = "curtain";
  void curtain.offsetWidth;
  curtain.classList.add("in");
  setTimeout(() => {
    jump(hash);
    curtain.classList.remove("in");
    curtain.classList.add("out");
    setTimeout(() => { curtain.className = "curtain"; navigating = false; }, 750);
  }, 750);
}
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.getAttribute("href").length < 2) return;
  e.preventDefault();
  goTo(a.getAttribute("href"), a.textContent.trim() === "Blue Ocean" ? "Top" : a.textContent.trim());
});

/* ---------- Footer reveal + scroll motion ---------- */
const footer = document.querySelector(".footer");
function sizeFooter() {
  const h = footer.offsetHeight;
  const tooTall = h > innerHeight;
  footer.classList.toggle("static", tooTall);
  document.body.classList.toggle("footer-static", tooTall);
  document.documentElement.style.setProperty("--footer-h", tooTall ? "0px" : h + "px");
}
addEventListener("resize", sizeFooter);

const heroTitle = document.querySelector(".hero-title");
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const p = Math.min(scrollY / innerHeight, 1);
    heroTitle.style.transform = `translateY(${-p * 8}%) scale(${1 - p * 0.12})`;
    heroTitle.style.opacity = 1 - p * 0.85;
    document.querySelectorAll(".event-card .card-img").forEach((box) => {
      const r = box.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const rel = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      box.firstElementChild.nextElementSibling.style.setProperty("--py", `${-rel * 36}px`);
    });
    ticking = false;
  });
}
addEventListener("scroll", onScroll, { passive: true });

/* ---------- Init ---------- */
populateEventSelect();
renderEvents();
buildMarquee();
setupCounters();
runLoader();
updatePass();
sizeFooter();
onScroll();
window.addEventListener("load", sizeFooter);