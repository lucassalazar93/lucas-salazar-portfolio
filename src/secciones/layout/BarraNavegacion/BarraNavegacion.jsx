import React, { useState, useEffect } from "react";
import "./BarraNavegacion.css";

const NAVBAR_HEIGHT = 80;

const BarraNavegacion = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const y =
        target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__logo">
          <a href="#home" onClick={(e) => handleScroll(e, "home")}>
            Lucas<span>Salazar</span>| Frontend
          </a>
        </h1>

        <nav className={`navbar__menu ${menuOpen ? "open" : ""}`}>
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

        <button
          className={`navbar__toggle${menuOpen ? " active" : ""}`}
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

export default BarraNavegacion;
