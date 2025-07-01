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
        {/* FRÁSE PRINCIPAL */}
        <blockquote
          className="personal-quote"
          data-aos="zoom-in"
          data-aos-delay="50"
        >
          “<span className="resaltado">Soy humano antes que desarrollador</span>
          ,<br />y ese latido se escucha en cada línea de código.”
        </blockquote>

        {/* PÁRRAFO PRINCIPAL */}
        <p className="texto-personal" data-aos="fade-up" data-aos-delay="250">
          Amo acompañar a las personas en sus desafíos, traducir sus historias
          en soluciones que simplifican la vida y sembrar pequeñas chispas de
          alegría digital.
          <br />
          <br />
          Comparto sin reservas lo que sé —aunque sea poco— porque el
          conocimiento solo cobra sentido cuando se multiplica en otras manos.
          <br />
          <br />
          No busco impresionar con tecnicismos. Mi anhelo es construir puentes
          auténticos entre la idea y la experiencia real.
        </p>

        {/* FRASE DE CIERRE EMOCIONAL */}
        <p className="cierre-cita" data-aos="fade-up" data-aos-delay="450">
          Que cada usuario sienta que la tecnología que creamos fue pensada para
          ellos,
          <br />
          <strong>con cariño y propósito.</strong>
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
