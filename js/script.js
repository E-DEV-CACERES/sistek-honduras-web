// ===== Configuración =====
// Cambia este número por tu WhatsApp real (código de país 504 + número, sin espacios ni guiones)
const WHATSAPP_NUMBER = "50488971964";

// ===== Año dinámico en el footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navbar: cambia de estilo al hacer scroll =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ===== Menú móvil =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

// ===== Animación al hacer scroll (reveal) =====
const animatedEls = document.querySelectorAll("[data-animate]");
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

// ===== FAQ acordeón =====
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// ===== Formulario de contacto -> redirige a WhatsApp con el mensaje ya escrito =====
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = contactForm.nombre.value.trim();
  const telefono = contactForm.telefono.value.trim();
  const mensaje = contactForm.mensaje.value.trim();

  const texto = `Hola, soy ${nombre} (Tel: ${telefono}).%0A%0A${encodeURIComponent(mensaje)}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
  window.open(url, "_blank");
});
