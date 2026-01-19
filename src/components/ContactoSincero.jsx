import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ContactoSincero.css";

// Iconos importados desde /src/assets/icons/
import iconEmail from "../assets/icons/email.png";
import iconWhatsApp from "../assets/icons/whatsapp.png";
import iconGitHub from "../assets/icons/github.png";
import iconLinkedIn from "../assets/icons/linkedin.png";
import iconInstagram from "../assets/icons/instagram.png";

const ContactoSincero = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <section className="contacto-sincero" id="contacto">
      <div className="container">
        <h2 className="seccion-titulo" data-aos="fade-up">
          <span className="emoji">📩</span> Contacto
        </h2>

        <p className="contacto-texto" data-aos="fade-up" data-aos-delay="150">
          ¿Te gustó lo que viste? ¿Tienes una idea? ¿Necesitas ayuda con algo?
          <br />
          Podemos trabajar juntos, conversar o simplemente compartir
          conocimiento.
        </p>

        <div className="contact-links" data-aos="fade-up" data-aos-delay="300">
          <a
            href="mailto:lucassalazar.work93@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar email"
          >
            <img src={iconEmail} alt="Email" className="icon" />
            <span>Email</span>
          </a>
          <a
            href="https://wa.me/573150399322?text=Hola Lucas, vi tu portafolio y me gustaría conversar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir WhatsApp"
          >
            <img src={iconWhatsApp} alt="WhatsApp" className="icon" />
            <span>WhatsApp</span>
          </a>
          <a
            href="https://github.com/lucassalazar93"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver GitHub"
          >
            <img src={iconGitHub} alt="GitHub" className="icon" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-salazar-722b79319/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver LinkedIn"
          >
            <img src={iconLinkedIn} alt="LinkedIn" className="icon" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/soylukassalazar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver Instagram Creativo"
          >
            <img src={iconInstagram} alt="Instagram" className="icon" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactoSincero;
