import React from "react";
import { motion, useScroll } from "framer-motion";
import "./ScrollProgress.css";

/* Línea de avance de lectura. Solo se muestra en móvil (ver CSS). */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
