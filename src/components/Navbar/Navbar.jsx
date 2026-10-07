/* ─────────────────────────────────────────────
   Navbar.jsx ▸ Fija, se oculta al bajar y vuelve al subir
──────────────────────────────────────────── */
import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import "./Navbar.css";
import ButtonLabel from "../ui/ButtonLabel";
import {
  CTA_CONTACTO,
  NAV_LINKS,
  WHATSAPP_URL,
  scrollToSection,
} from "../../data/site";

const EASE = [0.16, 1, 0.3, 1];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(latest > 40);
    setHidden(latest > previous && latest > 400);
  });

  /* Bloquea / libera el scroll del body cuando se abre el menú móvil */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;

    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  const classes = [
    "navbar",
    solid && "navbar--solid",
    hidden && !menuOpen && "navbar--hidden",
    menuOpen && "navbar--open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className="navbar__container">
        <a
          className="navbar__logo"
          href="#home"
          onClick={(e) => handleNav(e, "home")}
        >
          Lucas<span>Salazar</span>
        </a>

        {/* Menú principal */}
        <nav className="navbar__menu" aria-label="Principal">
          {NAV_LINKS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => handleNav(e, id)}>
              {label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn--primary btn--sm navbar__cta"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonLabel>{CTA_CONTACTO}</ButtonLabel>
        </a>

        {/* Botón hamburguesa */}
        <button
          className="navbar__toggle"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="navbar__overlay"
            aria-label="Móvil"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <ul>
              {NAV_LINKS.map(({ id, label }, i) => (
                <li key={id}>
                  <motion.a
                    href={`#${id}`}
                    onClick={(e) => handleNav(e, id)}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: 0.15 + i * 0.06,
                    }}
                  >
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <a
              className="btn btn--primary"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CTA_CONTACTO}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
