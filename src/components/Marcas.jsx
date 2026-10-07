import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Marcas.css";
import SplitText from "./ui/SplitText";
import { useMotionMode } from "../hooks/usePinned";
import { marcas } from "../data/marcas";

const EASE = [0.16, 1, 0.3, 1];

/* Las columnas alternas se desplazan a distinta velocidad con el scroll */
const Ficha = ({ marca, index, progress, parallax }) => {
  const y = useTransform(progress, [0, 1], index % 2 ? [34, -34] : [-16, 16]);

  return (
    <motion.li style={parallax ? { y } : undefined}>
      <motion.div
        className="marca"
        style={marca.placa ? { background: marca.placa } : undefined}
        initial={{ opacity: 0, scale: 0.86 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE, delay: (index % 4) * 0.07 }}
      >
        <img src={marca.logo} alt={marca.nombre} loading="lazy" />
      </motion.div>
    </motion.li>
  );
};

const Marcas = () => {
  const ref = useRef(null);
  const parallax = useMotionMode() !== "static";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section className="marcas" id="marcas" ref={ref}>
      <header className="marcas__header">
        <h2 className="display">
          <SplitText text="Marcas con las que he trabajado" inView />
        </h2>
        <p className="lead">
          Empresas y emprendimientos para los que he diseñado y construido
          software.
        </p>
      </header>

      <ul className="marcas__grid">
        {marcas.map((marca, i) => (
          <Ficha
            key={marca.nombre}
            marca={marca}
            index={i}
            progress={scrollYProgress}
            parallax={parallax}
          />
        ))}
      </ul>
    </section>
  );
};

export default Marcas;
