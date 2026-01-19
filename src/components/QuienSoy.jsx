import React from "react";
import "./QuienSoy.css";
import { motion } from "framer-motion";
import quienImg from "../assets/quien-soy.svg";

const pilares = [
  {
    icono: "💻",
    texto:
      "Desarrollo con Propósito: Soluciones alineadas a objetivos de negocio y necesidades del usuario.",
  },
  {
    icono: "🤖",
    texto:
      "IA Estratégica: Integración de IA para optimizar flujos de trabajo y crear agentes inteligentes.",
  },
  {
    icono: "🎨",
    texto:
      "UX de Alta Fidelidad: Diseño emocional respaldado por una arquitectura sólida y limpia.",
  },
  {
    icono: "🧠",
    texto:
      "Enfoque en Producto: Creación de herramientas digitales que entienden y evolucionan con las personas.",
  },
];

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
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
        {/* Texto */}
        <motion.div className="quiensoy__text" variants={itemVariants}>
          <h2>¿Quién soy realmente?</h2>

          {/* Inicio */}
          <p>
            ¿Sabes qué me impulsó al desarrollo? La certeza de que una línea de
            código bien ejecutada tiene el poder de simplificar la vida de una
            persona y optimizar el rendimiento de un negocio. No construyo solo
            interfaces; diseño soluciones que resuelven problemas reales.
          </p>

          {/* Cuerpo */}
          <p>
            Soy Lucas, un desarrollador con mentalidad emprendedora que
            equilibra lógica, diseño y agilidad técnica. Mi paso por sectores
            industriales y proyectos freelance me ha enseñado que un producto
            digital solo es exitoso si es funcional, intuitivo y, sobre todo,
            escalable.
          </p>

          {/* Diferencial */}
          <p>
            Mi enfoque no es crear “sitios web”, sino desarrollar ecosistemas
            digitales con propósito. Utilizo la Inteligencia Artificial como mi
            mayor aliada estratégica para acelerar ciclos de desarrollo y
            garantizar la máxima calidad en cada entrega. Mi motor es la
            satisfacción de transformar una necesidad compleja en una
            herramienta útil, estética y de alto impacto.
          </p>

          {/* Pilares */}
          <motion.ul className="quiensoy__frases" variants={containerVariants}>
            {pilares.map(({ icono, texto }) => (
              <motion.li key={texto} variants={itemVariants}>
                <span className="icono">{icono}</span>
                <span className="texto">{texto}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Imagen */}
        <motion.div className="quiensoy__img" variants={itemVariants}>
          <img src={quienImg} alt="Perfil profesional de Lucas Salazar" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default QuienSoy;
