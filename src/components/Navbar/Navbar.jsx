/* ─────────────────────────────────────────────
   Navbar.jsx ▸ Responsive + Smooth-Scroll (FINAL)
──────────────────────────────────────────── */
import React, { useState, useEffect } from "react";
import "./Navbar.css";

const NAVBAR_HEIGHT = 80; // alto aprox. de tu barra sticky

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  /* Bloquea / libera el scroll del body cuando se abre el menú móvil */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  /* Scroll suave + offset para que el título no quede tapado */
  const handleScroll = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const y =
        target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false); // cierra el menú hamburguesa
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo (animación slide-in definida en CSS) */}
        <h1 className="navbar__logo">
          <a href="#home" onClick={(e) => handleScroll(e, "home")}>
            Lucas<span>Salazar</span>
          </a>
        </h1>

        {/* Menú principal */}
        <nav
          className={`navbar__menu ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <a href="#home" onClick={(e) => handleScroll(e, "home")}>
            Inicio
          </a>
          <a href="#proyectos" onClick={(e) => handleScroll(e, "proyectos")}>
            Proyectos
          </a>
          <a href="#sobre-mi" onClick={(e) => handleScroll(e, "sobre-mi")}>
            Sobre&nbsp;mí
          </a>
          <a
            href="#certificados"
            onClick={(e) => handleScroll(e, "certificados")}
          >
            Certificados
          </a>
          <a href="#contacto" onClick={(e) => handleScroll(e, "contacto")}>
            Contacto
          </a>
        </nav>

        <div
          className={`navbar__backdrop ${menuOpen ? "open" : ""}`}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />

        {/* Botón hamburguesa */}
        <button
          className={`navbar__toggle${menuOpen ? " active" : ""}`}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
