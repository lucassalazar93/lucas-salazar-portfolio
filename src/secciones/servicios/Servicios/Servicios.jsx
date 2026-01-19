import React from "react";
import "./Servicios.css";

const Servicios = () => (
  <section className="servicios" id="servicios">
    <div className="container">
      <h2 className="servicios__titulo">Servicios Freelance & Consultoría</h2>

      <p className="servicios__descripcion">
        Ayudo a empresas y emprendedores a dar el salto digital con soluciones
        que combinan <strong>Arquitectura robusta</strong>,{" "}
        <strong>IA Generativa</strong> y{" "}
        <strong>E-commerce de alto nivel</strong>. No solo creo sitios web,
        construyo herramientas que optimizan tus ventas y procesos.
        <br />
        <br />
        <strong>
          Explora mis soluciones especializadas y lleva tu visión al siguiente
          nivel.
        </strong>
      </p>

      <a
        href="https://lukbyte-my-website.vercel.app/"
        className="btn btn--primary btn--lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver paquetes y precios
      </a>
    </div>
  </section>
);

export default Servicios;
