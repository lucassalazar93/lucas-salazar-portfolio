import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./Contador.css";

const EASE = [0.16, 1, 0.3, 1];

/* Cifra que sube desde cero al entrar en pantalla. La copia final,
   invisible, reserva el ancho para que el texto no salte al contar.
   quieto: muestra el valor final sin animar. */
const Contador = ({ valor, formato, quieto }) => {
  const ref = useRef(null);
  const enVista = useInView(ref, { once: true, amount: 0.8 });
  const actual = useMotionValue(quieto ? valor : 0);
  const texto = useTransform(actual, (v) => formato(Math.round(v)));

  useEffect(() => {
    if (quieto) {
      actual.set(valor);
      return;
    }
    if (!enVista) return;
    const control = animate(actual, valor, { duration: 1.8, ease: EASE });
    return () => control.stop();
  }, [enVista, quieto, valor, actual]);

  return (
    <span className="contador" ref={ref}>
      <span className="sr-only">{formato(valor)}</span>
      <span className="contador__reserva" aria-hidden="true">
        {formato(valor)}
      </span>
      <motion.span className="contador__cifra" aria-hidden="true">
        {texto}
      </motion.span>
    </span>
  );
};

export default Contador;
