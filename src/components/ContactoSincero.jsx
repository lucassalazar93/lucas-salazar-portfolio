import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import "./ContactoSincero.css";
import SplitText from "./ui/SplitText";
import Magnetic from "./ui/Magnetic";
import ButtonLabel from "./ui/ButtonLabel";
import {
  CTA_CONTACTO,
  EMAIL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_LABEL,
  WHATSAPP_URL,
} from "../data/site";

const EASE = [0.16, 1, 0.3, 1];

const redes = [
  { href: `mailto:${EMAIL}`, label: "Enviar email", Icono: EnvelopeSimple },
  { href: GITHUB_URL, label: "Ver GitHub", Icono: GithubLogo },
  { href: LINKEDIN_URL, label: "Ver LinkedIn", Icono: LinkedinLogo },
  { href: INSTAGRAM_URL, label: "Ver Instagram Creativo", Icono: InstagramLogo },
];

const ContactoSincero = () => (
  <section className="contacto-sincero" id="contacto">
    <motion.div
      className="contacto-card"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="contacto-glow" aria-hidden="true" />

      <div className="contacto-top">
        <p className="contacto-logo">
          Lucas<span>Salazar</span>
        </p>

        <div className="contacto-cta">
          <h2 className="display seccion-titulo">
            <SplitText text="¿Tienes una idea?" inView />
          </h2>
          <p className="contacto-texto">
            ¿Te gustó lo que viste? ¿Necesitas ayuda con algo? Podemos trabajar
            juntos, conversar o simplemente compartir conocimiento.
          </p>
          <Magnetic>
            <a
              href={WHATSAPP_URL}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonLabel>{CTA_CONTACTO}</ButtonLabel>
              <span className="btn__icon">
                <ArrowUpRight size={18} weight="bold" />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="contacto-bottom">
        <div className="contacto-datos">
          <p className="contacto-label">Escríbeme</p>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            {WHATSAPP_LABEL}
          </a>
        </div>

        <ul className="contact-links">
          {redes.map(({ href, label, Icono }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icono size={22} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>

    <footer className="footer-cierre" id="footer">
      <p className="footer-frase">
        “Desarrollo con alma. Porque la tecnología también puede tener corazón.”
      </p>
      <p className="footer-firma">
        by <span className="nombre">Lucas Salazar</span>
      </p>
    </footer>
  </section>
);

export default ContactoSincero;
