import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import "./Certificados.css";
import SplitText from "./ui/SplitText";
import { useFinePointer } from "../hooks/usePinned";
import { certificados } from "../data/certificados";

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { stiffness: 260, damping: 26, mass: 0.5 };

const Certificados = () => {
  const finePointer = useFinePointer();
  const [activo, setActivo] = useState(null);

  /* Vista previa del diploma que sigue al cursor y se inclina al moverse */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const rotate = useTransform(useVelocity(springX), [-1800, 1800], [-14, 14]);

  const handleMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section className="certificados" id="certificados">
      <header className="certificados__header">
        <h2 className="display certificados__titulo">
          <SplitText text="Certificados" inView />
        </h2>
        <p className="lead certificados__subtitulo">
          “Cada curso es una chispa que alimenta mi crecimiento profesional.”
        </p>
      </header>

      <ul
        className="certificados__lista"
        onPointerMove={finePointer ? handleMove : undefined}
        onPointerLeave={() => setActivo(null)}
      >
        {certificados.map((c, i) => (
          <motion.li
            key={c.titulo}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
          >
            <a
              href={c.enlace}
              className="certificado"
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => setActivo(i)}
            >
              <img
                src={c.icono}
                alt=""
                className="certificado__thumb"
                loading="lazy"
              />
              <div className="certificado__main">
                <h3>{c.titulo}</h3>
                <p className="descripcion">{c.descripcion}</p>
              </div>
              <p className="certificado__meta">
                <span className="entidad">{c.entidad}</span>
                <span className="fecha">{c.fecha}</span>
              </p>
              <span className="certificado__link">
                Ver certificado
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      {finePointer && (
        <motion.div
          className="certificados__preview"
          aria-hidden="true"
          style={{ x: springX, y: springY, rotate }}
        >
          <motion.div
            className="certificados__preview-inner"
            initial={false}
            animate={{
              opacity: activo === null ? 0 : 1,
              scale: activo === null ? 0.6 : 1,
            }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {certificados.map((c, i) => (
              <img
                key={c.titulo}
                src={c.icono}
                alt=""
                loading="lazy"
                style={{ opacity: i === activo ? 1 : 0 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Certificados;
