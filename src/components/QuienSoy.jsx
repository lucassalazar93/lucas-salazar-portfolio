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
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const QuienSoy = () => {
  return (
    <section className="quiensoy" id="sobre-mi">
      <motion.div
        className="quiensoy__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Texto */}
        <motion.div className="quiensoy__text" variants={itemVariants}>
          <h2>¿Quién soy realmente?</h2>

          {/* Inicio */}
          <p>
            ¿Sabes qué me impulsó al desarrollo? La certeza de que una línea de
            código bien pensada puede simplificar la vida de una persona y
            mejorar el rendimiento de un negocio. No construyo solo interfaces;
            diseño soluciones que resuelven problemas reales.
          </p>

          {/* Cuerpo */}
          <p>
            Soy Lucas, desarrollador con mentalidad emprendedora que equilibra
            lógica, diseño y agilidad técnica. Mi experiencia en entornos
            industriales y proyectos freelance me ha enseñado que un producto
            digital solo es valioso cuando es funcional, intuitivo y escalable.
          </p>

          {/* Diferencial */}
          <p>
            Mi enfoque no es crear “sitios web”, sino desarrollar ecosistemas
            digitales con propósito. Utilizo la inteligencia artificial como
            aliada estratégica para optimizar procesos, acelerar el desarrollo y
            construir soluciones de alto impacto que generan valor real.
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
