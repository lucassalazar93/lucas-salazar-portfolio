import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PersonalTouch.css";
import firmaLucas from "../assets/firma_lucas.svg"; // Ajusta la ruta si es necesario

const PersonalTouch = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <section className="personal-touch" id="personal">
      <div className="container">
        {/* FRÁSE PRINCIPAL: Más contundente */}
        <blockquote
          className="personal-quote"
          data-aos="zoom-in"
          data-aos-delay="50"
        >
          “La tecnología es solo el medio;{" "}
          <span className="resaltado">el propósito siempre es humano.</span>
          <br />
          Diseño software para que las personas vivan mejor, no solo para que
          las máquinas funcionen.”
        </blockquote>

        {/* PÁRRAFO PRINCIPAL: Conecta tu técnica con tu sentir */}
        <p className="texto-personal" data-aos="fade-up" data-aos-delay="250">
          Mi trayectoria en el ecosistema de{" "}
          <strong>Crystal (Gef, Punto Blanco, Baby Fresh)</strong> me enseñó que
          detrás de cada KPI de eficiencia o cada avatar creado con IA, hay un
          ser humano buscando una experiencia auténtica.
          <br />
          <br />
          No me conformo con escribir código limpio; busco traducir historias y
          desafíos en soluciones que simplifiquen el día a día. Comparto mi
          conocimiento porque creo firmemente que la innovación solo tiene valor
          cuando se democratiza y se multiplica en manos de otros.
          <br />
          <br />
          Mi enfoque no es impresionar con la complejidad de la arquitectura,
          sino construir puentes invisibles pero sólidos entre la visión de un
          negocio y la emoción de su usuario final.
        </p>

        {/* FRASE DE CIERRE: Inspiradora */}
        <p className="cierre-cita" data-aos="fade-up" data-aos-delay="450">
          Porque al final del día, el mejor software es aquel que se siente
          invisible
          <br />
          <strong>porque fue diseñado con empatía y propósito.</strong>
        </p>

        {/* FIRMA */}
        <div className="firma-wrapper" data-aos="fade-in" data-aos-delay="650">
          <hr className="firma-line" />
          <img
            src={firmaLucas}
            alt="Firma de Lucas Salazar"
            className="firma"
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalTouch;
