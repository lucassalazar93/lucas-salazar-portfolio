import React, { useRef } from "react";
import "./QuienSoy.css";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cube,
  GraduationCap,
  PaintBrush,
  Robot,
  Target,
} from "@phosphor-icons/react";
import quienImg from "../assets/img/lucas-about.webp";
import SplitText from "./ui/SplitText";
import { useMotionMode } from "../hooks/usePinned";
import { enElMercado, proyectos } from "../data/proyectos";
import { tiempoDeExperiencia } from "../data/site";

const pilares = [
  {
    Icono: Target,
    titulo: "Desarrollo con Propósito",
    texto:
      "Soluciones alineadas a objetivos de negocio y necesidades del usuario.",
  },
  {
    Icono: Robot,
    titulo: "IA Estratégica",
    texto:
      "Integración de IA para optimizar flujos de trabajo y crear agentes inteligentes.",
  },
  {
    Icono: PaintBrush,
    titulo: "UX de Alta Fidelidad",
    texto:
      "Diseño emocional respaldado por una arquitectura sólida y limpia.",
  },
  {
    Icono: Cube,
    titulo: "Enfoque en Producto",
    texto:
      "Creación de herramientas digitales que entienden y evolucionan con las personas.",
  },
];

// Animaciones
const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const QuienSoy = () => {
  const ref = useRef(null);
  const pinned = useMotionMode() !== "static";
  const experiencia = tiempoDeExperiencia();

  /* Las cifras salen de los datos: no hay que mantenerlas a mano */
  const cifras = [
    {
      cifra: experiencia.cifra,
      texto: `${experiencia.unidad} construyendo software`,
    },
    { cifra: proyectos.length, texto: "proyectos" },
    { cifra: enElMercado.length, texto: "productos en el mercado" },
  ];

  /* Parallax: la foto es más alta que su marco y se desliza por dentro */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["5.5%", "-5.5%"]);

  return (
    <section className="quiensoy" id="sobre-mi" ref={ref}>
      <div className="quiensoy__container">
        {/* Imagen */}
        <motion.div
          className="quiensoy__img"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="quiensoy__plate">
            <motion.img
              src={quienImg}
              alt="Lucas Salazar en su escritorio, frente al portátil"
              width="940"
              height="1470"
              loading="lazy"
              style={pinned ? { y: imgY } : undefined}
            />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          className="quiensoy__text"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <h2 className="display">
            <SplitText text="¿Quién soy realmente?" inView />
          </h2>

          {/* Inicio */}
          <motion.p className="quiensoy__lead" variants={itemVariants}>
            ¿Sabes qué me impulsó al desarrollo? La certeza de que una línea de
            código bien pensada puede simplificar la vida de una persona y
            mejorar el rendimiento de un negocio. No construyo solo interfaces;
            diseño soluciones que resuelven problemas reales.
          </motion.p>

          {/* Cuerpo */}
          <motion.p variants={itemVariants}>
            Soy Lucas, desarrollador fullstack con mentalidad emprendedora que
            equilibra lógica, diseño y agilidad técnica. Trabajo de punta a
            punta: frontend, backend, bases de datos y despliegue. Mi
            experiencia en entornos industriales y proyectos freelance me ha
            enseñado que un producto digital solo es valioso cuando es
            funcional, intuitivo y escalable.
          </motion.p>

          {/* Diferencial */}
          <motion.p variants={itemVariants}>
            Mi enfoque no es crear “sitios web”, sino desarrollar ecosistemas
            digitales con propósito. Utilizo la inteligencia artificial como
            aliada estratégica para optimizar procesos, acelerar el desarrollo y
            construir soluciones de alto impacto que generan valor real.
          </motion.p>

          {/* Trayectoria */}
          <motion.ul className="quiensoy__cifras" variants={itemVariants}>
            {cifras.map(({ cifra, texto }) => (
              <li key={texto}>
                <strong>{cifra}</strong>
                <span>{texto}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p className="quiensoy__formacion" variants={itemVariants}>
            <GraduationCap size={24} weight="light" aria-hidden="true" />
            Estudiante de Ingeniería de Sistemas, etapa final
          </motion.p>

          {/* Pilares */}
          <motion.ul className="quiensoy__pilares" variants={containerVariants}>
            {pilares.map(({ Icono, titulo, texto }) => (
              <motion.li key={titulo} variants={itemVariants}>
                <Icono size={30} weight="light" aria-hidden="true" />
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default QuienSoy;
