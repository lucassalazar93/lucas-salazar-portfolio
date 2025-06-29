import React from "react";
import "./QuienSoy.css";
import { motion } from "framer-motion";
import quienImg from "../assets/quien-soy.svg";

const frases = [
  { icono: "🧩", texto: "Desarrollo con propósito" },
  { icono: "🤖", texto: "IA como herramienta, no como moda" },
  { icono: "🎨", texto: "Diseño emocional + experiencia real" },
  { icono: "🧭", texto: "Productos que entienden a las personas" },
];

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const QuienSoy = () => {
  return (
    <section className="quiensoy" id="sobre-mi">
      <motion.div
        className="quiensoy__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Texto animado */}
        <motion.div className="quiensoy__text" variants={itemVariants}>
          <h2>¿Quién soy realmente?</h2>
          <p>
            ¿Sabes qué me trajo al mundo del desarrollo?
            <br />
            La idea de que con una línea de código puedes mejorarle la vida a
            alguien.
            <br />
            <br />
            Soy Lucas. Un humano curioso que combina diseño, lógica y emoción
            para construir herramientas digitales que funcionan de verdad (y que
            la gente quiera usar).
            <br />
            No me interesa solo crear “sitios web”. Me interesa contar historias
            que vivan en forma de código, mejorar procesos y crear experiencias
            que impacten.
            <br />
            <br />
            Estudié desarrollo de software, pero sigo aprendiendo todos los
            días.
            <br />
            <strong>Mi mejor aliada:</strong> la inteligencia artificial.
            <br />
            <strong>Mi motor:</strong> la satisfacción de ver algo útil y bonito
            funcionando.
          </p>

          <motion.ul className="quiensoy__frases" variants={containerVariants}>
            {frases.map(({ icono, texto }) => (
              <motion.li key={texto} variants={itemVariants}>
                <span className="icono">{icono}</span>
                {texto}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Imagen animada */}
        <motion.div className="quiensoy__img" variants={itemVariants}>
          <img src={quienImg} alt="Lucas Salazar diseño humano" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default QuienSoy;
