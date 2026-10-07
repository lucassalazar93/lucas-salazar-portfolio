// src/components/CintaNeon.jsx
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Asterisk } from "@phosphor-icons/react";
import "./cintaNeon.css";

const frases = [
  "Código limpio hoy, soluciones escalables para el mañana.",
  "Transformando requerimientos complejos en experiencias de alta fidelidad.",
  "La IA no reemplaza al desarrollador, potencia su capacidad de innovación.",
  "Ingeniería con propósito: donde la lógica se encuentra con la emoción.",
];

const VELOCIDAD_BASE = 1.6; // % de la pista por segundo

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* La cinta acelera, se inclina y cambia de sentido con la velocidad del scroll */
const CintaNeon = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [10, -10]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = 1;
    else if (factor > 0) direction.current = -1;

    const step = direction.current * VELOCIDAD_BASE * (delta / 1000);
    baseX.set(baseX.get() + step + step * Math.abs(factor));
  });

  return (
    <section className="cinta-neon" ref={ref} aria-label="Frases">
      <motion.div
        className="cinta-neon__track"
        style={reduce ? undefined : { x, skewX }}
      >
        {[0, 1].map((copy) => (
          <div
            className="cinta-neon__group"
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {frases.map((texto, i) => (
              <React.Fragment key={texto}>
                <span className={i % 2 ? "is-outline" : ""}>{texto}</span>
                <Asterisk weight="bold" aria-hidden="true" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default CintaNeon;
