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

// ===== Analizador web (Google PageSpeed Insights API) =====
// Obtén tu API key gratis en Google Cloud Console > APIs > PageSpeed Insights API
// https://developers.google.com/speed/docs/insights/v5/get-started
const GOOGLE_PSI_API_KEY = "AIzaSyAYR8Lebimv7aigoSl5gsRK4dY6ilnSlR4";

const analyzerForm = document.getElementById("analyzerForm");
if (analyzerForm) {
  const urlInput = document.getElementById("analyzerUrl");
  const btn = document.getElementById("analyzerBtn");
  const errorEl = document.getElementById("analyzerError");
  const loadingEl = document.getElementById("analyzerLoading");
  const resultsEl = document.getElementById("analyzerResults");
  const checksEl = document.getElementById("analyzerChecks");
  const scoresEl = document.getElementById("analyzerScores");
  const scoreEl = document.getElementById("analyzerScoreLabel");
  const waLink = document.getElementById("analyzerWhatsApp");

  function normalizeUrl(raw) {
    let value = (raw || "").trim();
    if (!value) return null;
    if (!/^https?:\/\//i.test(value)) value = "https://" + value;
    try {
      const u = new URL(value);
      if (!u.hostname.includes(".")) return null;
      return u;
    } catch {
      return null;
    }
  }

  function scoreOf(category) {
    if (!category || typeof category.score !== "number") return null;
    return Math.round(category.score * 100);
  }

  function auditOk(audit) {
    if (!audit) return null;
    // Lighthouse: score 0-1, null for informative, or scoreDisplayMode
    if (typeof audit.score === "number") return audit.score >= 0.9;
    return audit.scoreDisplayMode === "notApplicable" ? true : null;
  }

  function renderScores(scores) {
    scoresEl.innerHTML = "";
    scores.forEach((s) => {
      const div = document.createElement("div");
      div.className = "analyzer-check " + (s.value >= 90 ? "ok" : s.value >= 50 ? "ok" : "bad");
      div.innerHTML = `
        <div class="mark">${s.value ?? "--"}</div>
        <div>
          <div class="title">${s.label}</div>
          <div class="desc">Google Lighthouse</div>
        </div>`;
      scoresEl.appendChild(div);
    });
  }

  function renderChecks(checks) {
    checksEl.innerHTML = "";
    checks.forEach((c) => {
      const div = document.createElement("div");
      div.className = `analyzer-check ${c.ok ? "ok" : "bad"}`;
      div.innerHTML = `
        <div class="mark">${c.ok ? "OK" : "!"}</div>
        <div>
          <div class="title">${c.title}</div>
          <div class="desc">${c.desc}</div>
        </div>`;
      checksEl.appendChild(div);
    });
  }

  analyzerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.classList.add("hidden");
    resultsEl.classList.add("hidden");

    const parsed = normalizeUrl(urlInput.value);
    if (!parsed) {
      errorEl.textContent = "Ingresa una URL válida, por ejemplo https://tu-negocio.com";
      errorEl.classList.remove("hidden");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Analizando...";
    loadingEl.classList.remove("hidden");

    try {
      const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
      endpoint.searchParams.set("url", parsed.href);
      endpoint.searchParams.set("strategy", "mobile");
      endpoint.searchParams.append("category", "performance");
      endpoint.searchParams.append("category", "accessibility");
      endpoint.searchParams.append("category", "best-practices");
      endpoint.searchParams.append("category", "seo");
      endpoint.searchParams.set("locale", "es");
      if (GOOGLE_PSI_API_KEY) endpoint.searchParams.set("key", GOOGLE_PSI_API_KEY);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);
      const res = await fetch(endpoint.toString(), { signal: controller.signal });
      clearTimeout(timeout);

      const data = await res.json();
      if (!res.ok) {
        const apiMsg = data?.error?.message || "";
        let msg = apiMsg || "Google no pudo analizar el sitio. Revisa la URL o configura tu API key.";
        if (/referer null/i.test(apiMsg) || /referer.*blocked/i.test(apiMsg)) {
          msg =
            "La API key está bloqueada por restricción de sitios. Abre la web con http://localhost (no con archivo local) o en sistechonduras.online. También puedes poner temporalmente la restricción en \"Ninguno\".";
        }
        throw new Error(msg);
      }

      const lh = data.lighthouseResult;
      if (!lh) throw new Error("Respuesta incompleta de Google PageSpeed.");

      const cats = lh.categories || {};
      const perf = scoreOf(cats.performance);
      const seo = scoreOf(cats.seo);
      const a11y = scoreOf(cats.accessibility);
      const best = scoreOf(cats["best-practices"]);

      const scores = [
        { label: "Rendimiento", value: perf },
        { label: "SEO", value: seo },
        { label: "Accesibilidad", value: a11y },
        { label: "Buenas prácticas", value: best },
      ].filter((s) => s.value !== null);

      const avg = Math.round(scores.reduce((sum, s) => sum + s.value, 0) / scores.length);
      scoreEl.textContent = `Puntaje promedio: ${avg}/100`;
      renderScores(scores);

      const audits = lh.audits || {};
      const checks = [];

      const httpsOk = auditOk(audits["is-on-https"]);
      if (httpsOk !== null) {
        checks.push({
          ok: httpsOk,
          title: "HTTPS seguro",
          desc: httpsOk ? "Google confirma que usa HTTPS." : "Google detecta problemas de HTTPS.",
        });
      }

      const viewportOk = auditOk(audits.viewport);
      if (viewportOk !== null) {
        checks.push({
          ok: viewportOk,
          title: "Optimizado para móvil",
          desc: viewportOk
            ? "Tiene viewport correcto para celulares."
            : "Falta o falla la configuración móvil (viewport).",
        });
      }

      const titleOk = auditOk(audits["document-title"]);
      if (titleOk !== null) {
        checks.push({
          ok: titleOk,
          title: "Título de la página",
          desc: titleOk
            ? "El título está bien definido."
            : "El título falta o no es óptimo para Google.",
        });
      }

      const metaOk = auditOk(audits["meta-description"]);
      if (metaOk !== null) {
        checks.push({
          ok: metaOk,
          title: "Meta descripción",
          desc: metaOk
            ? "Tiene meta descripción."
            : "Falta meta descripción para buscadores.",
        });
      }

      const lcp = audits["largest-contentful-paint"];
      if (lcp?.displayValue) {
        const lcpOk = typeof lcp.score === "number" ? lcp.score >= 0.5 : false;
        checks.push({
          ok: lcpOk,
          title: "Velocidad de carga (LCP)",
          desc: `Largest Contentful Paint: ${lcp.displayValue}`,
        });
      }

      const cls = audits["cumulative-layout-shift"];
      if (cls?.displayValue) {
        const clsOk = typeof cls.score === "number" ? cls.score >= 0.9 : false;
        checks.push({
          ok: clsOk,
          title: "Estabilidad visual (CLS)",
          desc: `Cumulative Layout Shift: ${cls.displayValue}`,
        });
      }

      renderChecks(checks);

      const mensaje =
        `Hola, analicé mi web con Google PageSpeed en Sistek Honduras.\n` +
        `URL: ${parsed.href}\n` +
        `Promedio: ${avg}/100\n` +
        `Rendimiento: ${perf ?? "-"} | SEO: ${seo ?? "-"} | Accesibilidad: ${a11y ?? "-"} | Buenas prácticas: ${best ?? "-"}\n` +
        `Quiero mejorar mi sitio.`;

      waLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
      resultsEl.classList.remove("hidden");
    } catch (err) {
      errorEl.textContent =
        err.name === "AbortError"
          ? "Google tardó demasiado. Intenta de nuevo en unos segundos."
          : err.message || "No se pudo analizar con Google PageSpeed.";
      errorEl.classList.remove("hidden");
    } finally {
      loadingEl.classList.add("hidden");
      btn.disabled = false;
      btn.textContent = "Analizar mi web";
    }
  });
}
