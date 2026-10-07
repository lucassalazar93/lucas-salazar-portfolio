/* ─── Enlaces y datos de contacto compartidos ─── */
export const WHATSAPP_URL =
  "https://wa.me/573150399322?text=Hola%20Lucas,%20me%20encantó%20tu%20portafolio%20y%20me%20gustaría%20hablar%20contigo%20👋";

export const WHATSAPP_LABEL = "+57 315 039 9322";

export const CV_URL = "/Lucas_SalazarVilla_CV2026 Fullstack Developer.pdf";

export const EMAIL = "lucassalazar.work93@gmail.com";

export const SERVICIOS_URL = "https://lukbyte-my-website.vercel.app/";

export const GITHUB_URL = "https://github.com/lucassalazar93";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/lucas-salazar-722b79319/";
export const INSTAGRAM_URL = "https://www.instagram.com/soylukassalazar/";

/* Etiqueta única para la intención "contacto" en toda la página */
export const CTA_CONTACTO = "Tomémonos un café";

export const NAV_LINKS = [
  { id: "home", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "certificados", label: "Certificados" },
  { id: "contacto", label: "Contacto" },
];

export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ─── Trayectoria ─── */
export const INICIO_EXPERIENCIA = new Date(2024, 11, 1); // diciembre de 2024

/* Tiempo de experiencia calculado contra la fecha actual, para que no envejezca */
export function tiempoDeExperiencia(hoy = new Date()) {
  const meses =
    (hoy.getFullYear() - INICIO_EXPERIENCIA.getFullYear()) * 12 +
    (hoy.getMonth() - INICIO_EXPERIENCIA.getMonth());
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  const plural = (n) => (n === 1 ? "año" : "años");

  if (anios === 0) return { cifra: `${Math.max(meses, 1)}`, unidad: "meses" };
  if (resto >= 10) return { cifra: `Casi ${anios + 1}`, unidad: plural(anios + 1) };
  if (resto === 0) return { cifra: `${anios}`, unidad: plural(anios) };
  return { cifra: `+${anios}`, unidad: plural(anios) };
}
