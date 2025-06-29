import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Footer.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="footer-cierre" id="footer" data-aos="fade-up">
      <p className="footer-frase">
        “Desarrollo con alma. Porque la tecnología también puede tener corazón.”
      </p>
      <p className="footer-firma">
        by <span className="nombre">Lucas Salazar</span>
        <span
          className="emoji-animado"
          role="img"
          aria-label="mente y corazón"
        ></span>
      </p>
    </footer>
  );
};

export default Footer;
