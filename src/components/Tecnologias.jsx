/* ─────────────────────────────────────────────
   Tecnologias.jsx ▸ “Lluvia” de chips con Framer Motion
───────────────────────────────────────────── */
import React from "react";
import { motion } from "framer-motion";
import "./Tecnologias.css";

/* ---------- 1. Datos ---------- */
const herramientasTecnicas = [
  "HTML5",
  "CSS3",
  "JavaScript (ES6+)",
  "React.js",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "API REST",
  "MongoDB",
  "MySQL",
  "Sequelize ORM",
  "Autenticación JWT",
  "Manejo de rutas",
  "Consumo de APIs",
  "Git",
  "GitHub",
  "Postman",
  "Visual Studio Code",
  "Figma",
  "SunEditor",
];

const habilidadesBlandas = [
  "Diseño responsive",
  "Comunicación efectiva y asertiva",
  "Resolución de problemas",
  "Liderazgo y trabajo en equipo",
  "Adaptabilidad y aprendizaje continuo",
  "Proactividad y responsabilidad",
  "Diseño web",
  "Mantenimiento web",
  "Atención al detalle",
  "Gestión de sitios web",
  "Creatividad",
  "Integración de servicios web",
];

/* ---------- 2. Variantes de animación ---------- */
const container = {
  hidden: {},
  visible: {
    transition: {
      /* tiempo entre burbujas → lluvia suave y rápida */
      staggerChildren: 0.08,
    },
  },
};

const chip = {
  hidden: { opacity: 0, y: -25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ---------- 3. Componente ---------- */
const Tecnologias = () => (
  <>
    {/* --- TECNOLOGÍAS --- */}
    <section className="tecnologias" id="tecnologias">
      <div className="container">
        <h2 className="tecnologias__titulo">Tecnologías</h2>
        <p className="tecnologias__subtitulo">
          Estas son mis herramientas favoritas. Pero no son mi único talento.
        </p>

        <motion.div
          className="tech-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {herramientasTecnicas.map((tech) => (
            <motion.span key={tech} className="tech-chip" variants={chip}>
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>

    {/* --- HABILIDADES BLANDAS --- */}
    <section className="habilidades" id="habilidades">
      <div className="container">
        <h2 className="tecnologias__titulo">Habilidades</h2>
        <p className="tecnologias__subtitulo">
          Lo técnico importa, pero la forma en que trabajamos lo cambia todo.
        </p>

        <motion.div
          className="skills-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {habilidadesBlandas.map((skill) => (
            <motion.span key={skill} className="skill-chip" variants={chip}>
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  </>
);

export default Tecnologias;
