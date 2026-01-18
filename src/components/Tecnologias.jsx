import React from "react";
import { motion } from "framer-motion";
import "./Tecnologias.css";

/* ---------- 1. Datos (alineados a tu hoja de vida) ---------- */
const frontend = [
  "React.js (Core)",
  "JavaScript (ES6+)",
  "TypeScript",
  "HTML5",
  "CSS3 (Modular, Tokens y Temas)",
  "Diseño Responsive (Mobile First)",
  "PWA (Progressive Web Apps)",
  "Framer Motion (Animaciones)",
  "Shopify API (E-commerce Multimarca)",
  "Data Visualization (Dashboards/KPIs)",
  "React Hook Form (Smart Forms)",
];

const backend = [
  ".NET (C#)",
  "ASP.NET Core",
  "Arquitectura limpia aplicada a Frontend",
  "Arquitectura por funcionalidades (Feature-based)",
  "Principios SOLID",
  "Separación de responsabilidades",
  "LINQ",
  "Entity Framework Core",
  "Node.js",
  "Express.js",
  "APIs REST",
  "GraphQL",
  "Autenticación JWT",
  "Multi-tenant Architecture",
];

const basesDeDatos = ["SQL Server", "MySQL", "Firebase (Realtime Data)"];

const herramientas = [
  "IA (Copilot/Agentes y Automatización)",
  "Git & GitHub",
  "Postman",
  "Vite",
  "Visual Studio Code",
  "Figma",
  "QR / Omnicanalidad (Carritos por QR)",
];

const habilidadesBlandas = [
  "Liderazgo técnico en proyectos multimarca",
  "Diseño de experiencias omnicanal (físico + digital)",
  "Resolución de problemas de alta complejidad",
  "Comunicación asertiva en entornos corporativos",
  "Atención al detalle y calidad de UI (Pixel Perfect)",
  "Pensamiento estratégico de producto",
  "Adaptabilidad tecnológica y aprendizaje acelerado",
];

/* ---------- 2. Variantes de animación ---------- */
const container = {
  hidden: {},
  visible: {
    transition: {
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
          Transformando ideas complejas en soluciones digitales robustas y
          escalables.
        </p>

        <div className="categorias-tecnologias">
          {/* Bloque Frontend */}
          <div className="bloque-tecnologia">
            <h3 className="categoria-titulo">Frontend & UX</h3>
            <motion.div
              className="tech-grid"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {frontend.map((tech) => (
                <motion.span key={tech} className="tech-chip" variants={chip}>
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Bloque Backend */}
          <div className="bloque-tecnologia">
            <h3 className="categoria-titulo">Backend & Arquitectura</h3>
            <motion.div
              className="tech-grid"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {backend.map((tech) => (
                <motion.span key={tech} className="tech-chip" variants={chip}>
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Bloque Datos y Herramientas */}
          <div className="bloque-tecnologia">
            <h3 className="categoria-titulo">Datos & Innovación</h3>
            <motion.div
              className="tech-grid"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {[...basesDeDatos, ...herramientas].map((tech) => (
                <motion.span
                  key={tech}
                  className="tech-chip tech-chip--special"
                  variants={chip}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* --- HABILIDADES --- */}
    <section className="habilidades" id="habilidades">
      <div className="container">
        <h2 className="tecnologias__titulo">Habilidades Profesionales</h2>
        <p className="tecnologias__subtitulo">
          Más allá del código: estrategia, gestión multimarca e innovación
          tecnológica.
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
