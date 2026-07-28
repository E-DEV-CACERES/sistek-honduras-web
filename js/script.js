// ===== Configuración =====
const WHATSAPP_NUMBER = "50488971964";

// ===== Año dinámico en el footer =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Navbar: cambia de estilo al hacer scroll =====
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });
}

// ===== Menú móvil =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });
}

// ===== Animación al hacer scroll (reveal) =====
const animatedEls = document.querySelectorAll("[data-animate]");
if (animatedEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedEls.forEach((el) => observer.observe(el));
}

// ===== FAQ acordeón =====
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (!question) return;
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// ===== Formulario de contacto -> WhatsApp =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = contactForm.nombre.value.trim();
    const telefono = contactForm.telefono.value.trim();
    const mensaje = contactForm.mensaje.value.trim();

    const texto = `Hola, soy ${nombre} (Tel: ${telefono}).%0A%0A${encodeURIComponent(mensaje)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
    window.open(url, "_blank");
  });
}

// ===== Cotizador de precios =====
const quoteForm = document.getElementById("quoteForm");
if (quoteForm) {
  const SERVICES = {
    paginas: { label: "Página web / Landing", base: 6000, unit: "proyecto" },
    apps: { label: "App móvil", base: 15000, unit: "proyecto" },
    sistemas: { label: "Sistema web", base: 15000, unit: "proyecto" },
    tiendas: { label: "Tienda en línea", base: 15000, unit: "proyecto" },
    financieras: { label: "Sistema para financieras", base: 25000, unit: "proyecto" },
    ia: { label: "Automatización con IA", base: 12000, unit: "proyecto" },
    mantenimiento: { label: "Mantenimiento mensual", base: 3000, unit: "mes" },
  };

  const COMPLEXITY = {
    simple: { label: "Simple", factor: 1 },
    media: { label: "Media", factor: 1.4 },
    avanzada: { label: "Avanzada", factor: 1.9 },
  };

  const EXTRAS = {
    admin: { label: "Panel de administración", price: 4000 },
    multiplat: { label: "Android + iOS", price: 5000 },
    pagos: { label: "Pagos en línea", price: 3500 },
    impresion: { label: "Impresión en campo", price: 6000 },
    bot: { label: "Bot de WhatsApp", price: 4000 },
    usuarios: { label: "Multi-usuarios / roles", price: 3000 },
  };

  const rangeEl = document.getElementById("quoteRange");
  const noteEl = document.getElementById("quoteNote");
  const summaryEl = document.getElementById("quoteSummary");
  const waBtn = document.getElementById("quoteWhatsApp");

  function money(n) {
    return "L. " + Math.round(n).toLocaleString("es-HN");
  }

  function calc() {
    const serviceKey = quoteForm.service.value;
    const complexityKey = quoteForm.complexity.value;
    const service = SERVICES[serviceKey];
    const complexity = COMPLEXITY[complexityKey];
    const selectedExtras = [...quoteForm.querySelectorAll('input[name="extras"]:checked')].map(
      (el) => el.value
    );

    let extrasTotal = 0;
    const extrasLabels = [];
    selectedExtras.forEach((key) => {
      const extra = EXTRAS[key];
      if (!extra) return;
      extrasTotal += extra.price;
      extrasLabels.push(extra.label);
    });

    const subtotal = service.base * complexity.factor + extrasTotal;
    const min = Math.round(subtotal * 0.9);
    const max = Math.round(subtotal * 1.3);

    rangeEl.textContent = `${money(min)} – ${money(max)}`;
    noteEl.textContent =
      service.unit === "mes"
        ? `Estimado mensual · ${complexity.label.toLowerCase()}.`
        : `Proyecto ${complexity.label.toLowerCase()} de ${service.label.toLowerCase()}.`;

    summaryEl.innerHTML = "";
    const lines = [
      `Servicio: ${service.label}`,
      `Complejidad: ${complexity.label}`,
      extrasLabels.length ? `Extras: ${extrasLabels.join(", ")}` : "Extras: ninguno",
    ];
    lines.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = "• " + line;
      summaryEl.appendChild(li);
    });

    return {
      service,
      complexity,
      extrasLabels,
      min,
      max,
      unit: service.unit,
    };
  }

  quoteForm.addEventListener("change", calc);
  calc();

  waBtn.addEventListener("click", () => {
    const quote = calc();
    const nombre = (quoteForm.nombre.value || "").trim() || "Cliente";
    const telefono = (quoteForm.telefono.value || "").trim() || "No indicado";
    const extras =
      quote.extrasLabels.length > 0 ? quote.extrasLabels.join(", ") : "Ninguno";

    const mensaje =
      `Hola, quiero una cotización exacta.\n` +
      `Nombre: ${nombre}\n` +
      `WhatsApp: ${telefono}\n` +
      `Servicio: ${quote.service.label}\n` +
      `Complejidad: ${quote.complexity.label}\n` +
      `Extras: ${extras}\n` +
      `Estimado del cotizador: ${money(quote.min)} - ${money(quote.max)}` +
      (quote.unit === "mes" ? " por mes" : "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  });
}
