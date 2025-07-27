import React from "react";
import "./Servicios.css";

const Servicios = () => (
  <section className="servicios" id="servicios">
    <div className="container">
      <h2 className="servicios__titulo">Servicios Freelance</h2>
      <p className="servicios__descripcion">
        ¿Buscas una landing page impactante, un sitio web profesional o quieres
        automatizar procesos con inteligencia artificial? Diseño soluciones
        digitales a medida para hacer crecer tu negocio.
        <br />
        👉 Descubre los paquetes disponibles y elige el que mejor se adapta a
        tus necesidades.
      </p>
      <a
        href="https://lukbyte-my-website.vercel.app/"
        className="servicios__boton"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver paquetes y precios
      </a>
    </div>
  </section>
);

export default Servicios;
