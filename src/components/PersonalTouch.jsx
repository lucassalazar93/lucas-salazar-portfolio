import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./PersonalTouch.css";
import firmaLucas from "../assets/img/firma-lucas.webp";
import { useMotionMode } from "../hooks/usePinned";

const EASE = [0.16, 1, 0.3, 1];

const frase = [
  { texto: "La tecnología es solo el medio;" },
  { texto: "el propósito siempre es humano.", resaltado: true },
];

const palabras = frase.flatMap(({ texto, resaltado }) =>
  texto.split(" ").map((palabra) => ({ palabra, resaltado })),
);

/* Cada palabra se enciende cuando el scroll pasa por su tramo */
const Palabra = ({ index, progress, pinned, resaltado, children }) => {
  const opacity = useTransform(
    progress,
    [index / palabras.length, (index + 1) / palabras.length],
    [0.14, 1],
  );

  return (
    <motion.span
      className={resaltado ? "resaltado" : undefined}
      style={pinned ? { opacity } : undefined}
    >
      {children}
    </motion.span>
  );
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const PersonalTouch = () => {
  const quoteRef = useRef(null);
  const pinned = useMotionMode() !== "static";

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0.05, 0.68], [0, 1]);
  const cierreOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const cierreY = useTransform(scrollYProgress, [0.7, 0.88], [24, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.55, 1.25]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 1]);

  return (
    <section className="personal-touch" id="personal">
      {/* ─── Frase fijada ─── */}
      <div className="personal-quote-wrap" ref={quoteRef}>
        <div className="personal-quote-sticky">
          <motion.div
            className="personal-glow"
            aria-hidden="true"
            style={pinned ? { scale: glowScale, opacity: glowOpacity } : undefined}
          />

          <blockquote className="personal-quote">
            <p className="personal-quote__frase">
              {palabras.map(({ palabra, resaltado }, i) => (
                <React.Fragment key={i}>
                  <Palabra
                    index={i}
                    progress={progress}
                    pinned={pinned}
                    resaltado={resaltado}
                  >
                    {palabra}
                  </Palabra>{" "}
                </React.Fragment>
              ))}
            </p>
            <motion.p
              className="personal-quote__cierre"
              style={pinned ? { opacity: cierreOpacity, y: cierreY } : undefined}
            >
              Diseño software para que las personas vivan mejor, no solo para
              que las máquinas funcionen.
            </motion.p>
          </blockquote>
        </div>
      </div>

      {/* ─── Texto personal ─── */}
      <div className="container">
        <motion.p className="texto-personal" {...reveal()}>
          Mi trayectoria en el ecosistema de{" "}
          <strong>Crystal (Gef, Punto Blanco, Baby Fresh)</strong> me enseñó que
          detrás de cada KPI de eficiencia o cada avatar creado con IA, hay un
          ser humano buscando una experiencia auténtica.
        </motion.p>

        <motion.p className="texto-personal" {...reveal(0.05)}>
          No me conformo con escribir código limpio; busco traducir historias y
          desafíos en soluciones que simplifiquen el día a día. Comparto mi
          conocimiento porque creo firmemente que la innovación solo tiene valor
          cuando se democratiza y se multiplica en manos de otros.
        </motion.p>

        <motion.p className="texto-personal" {...reveal(0.1)}>
          Mi enfoque no es impresionar con la complejidad de la arquitectura,
          sino construir puentes invisibles pero sólidos entre la visión de un
          negocio y la emoción de su usuario final.
        </motion.p>

        <motion.p className="cierre-cita" {...reveal()}>
          Porque al final del día, el mejor software es aquel que se siente
          invisible{" "}
          <strong>porque fue diseñado con empatía y propósito.</strong>
        </motion.p>

        <motion.div className="firma-wrapper" {...reveal()}>
          <hr className="firma-line" />
          <img
            src={firmaLucas}
            alt="Firma de Lucas Salazar"
            className="firma"
            width="640"
            height="640"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalTouch;
