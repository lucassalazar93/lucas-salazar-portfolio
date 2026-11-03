import React from "react";
import { motion } from "framer-motion";
import "./Premios.css";
import SplitText from "./ui/SplitText";
import Contador from "./ui/Contador";
import { useMotionMode } from "../hooks/usePinned";
import {
  formatoMillones,
  formatoPesos,
  premios,
  totalPremios,
} from "../data/premios";

const EASE = [0.16, 1, 0.3, 1];

const infoVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* La foto se descubre de abajo hacia arriba, como una cortina,
   y se asienta dentro del marco */
const cortinaVariants = {
  hidden: { clipPath: "inset(100% 0% 0% 0% round 28px)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    transition: { duration: 1.2, ease: EASE },
  },
};

const fotoVariants = {
  hidden: { scale: 1.15 },
  visible: { scale: 1, transition: { duration: 1.6, ease: EASE } },
};

/* Una fila por premio: foto de un lado, la historia del otro.
   Las pares se invierten y la foto se achica según el puesto. */
const Premio = ({ premio, quieto }) => {
  const lugar = String(premio.lugar).padStart(2, "0");
  const entrada = quieto ? false : "hidden";

  return (
    <li className="premio">
      <figure className="premio__figura">
        {/* El disparo va en el contenedor: el observador mide el área
            ya recortada, y con la cortina cerrada sería cero */}
        <motion.div
          className="premio__media"
          initial={entrada}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="premio__foto" variants={cortinaVariants}>
            <motion.img
              src={premio.foto}
              alt={premio.alt}
              width="960"
              height="1000"
              loading="lazy"
              variants={fotoVariants}
            />
          </motion.div>
        </motion.div>

        <motion.figcaption
          className="premio__info"
          variants={infoVariants}
          initial={entrada}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="premio__lugar" aria-hidden="true">
            <SplitText text={lugar} inView decorative />
          </span>

          <motion.p className="premio__puesto" variants={itemVariants}>
            {premio.puesto} · {premio.convocatoria} {premio.anio}
          </motion.p>
          <motion.h3 className="premio__titulo" variants={itemVariants}>
            {premio.titulo}
          </motion.h3>
          <motion.p className="premio__desc" variants={itemVariants}>
            {premio.descripcion}
          </motion.p>
          <motion.ul className="chips premio__chips" variants={itemVariants}>
            {premio.detalles.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </motion.ul>

          <motion.p className="premio__monto" variants={itemVariants}>
            <span className="premio__monto-label">Premio al equipo</span>
            <strong>
              <Contador
                valor={premio.monto}
                formato={formatoPesos}
                quieto={quieto}
              />
            </strong>
            <span className="premio__moneda">COP</span>
          </motion.p>
        </motion.figcaption>
      </figure>
    </li>
  );
};

const Premios = () => {
  const quieto = useMotionMode() === "static";

  return (
    <section className="premios" id="premios">
      <header className="premios__header">
        <div>
          <h2 className="display">
            <SplitText text="Ideas que ganaron" inView />
          </h2>
          <p className="lead">
            Fui parte de los equipos detrás de dos proyectos premiados en
            INNOVA, la convocatoria de innovación de Crystal: primer y tercer
            puesto.
          </p>
        </div>

        {/* El total sale de los datos */}
        <p className="premios__total">
          <strong>
            <Contador
              valor={totalPremios}
              formato={formatoMillones}
              quieto={quieto}
            />
          </strong>
          <span>COP en premios a los equipos · {premios[0].anio}</span>
        </p>
      </header>

      <ol className="premios__lista">
        {premios.map((p) => (
          <Premio key={p.id} premio={p} quieto={quieto} />
        ))}
      </ol>
    </section>
  );
};

export default Premios;
