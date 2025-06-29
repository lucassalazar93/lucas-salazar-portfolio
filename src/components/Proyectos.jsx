import React from "react";
import { motion } from "framer-motion";
import "./Proyectos.css";

/* ─── Data de proyectos ─────────────────────── */
const proyectos = [
  {
    icono: "/images/ia.png",
    titulo: "Hackea la IA",
    descripcion: "Una landing que convirtió curiosidad en acción.",
    detalles: "React · Vite · EmailJS — 300+ leads en la primera semana.",
    estado: "Finalizado",
  },
  {
    icono: "/images/soy-arte.png",
    titulo: "Soy Arte",
    descripcion: "Plataforma que mezcla tecnología, empoderamiento y alma.",
    detalles: "Node · React · MySQL · Tailwind · OpenAI",
    estado: "En desarrollo",
  },
  {
    icono: "/images/sabor-a-felicidad.png",
    titulo: "Sabor a Felicidad",
    descripcion: "Sistema de pedidos para empresas… con sazón emocional.",
    detalles:
      "React · Firebase · EmailAuth — Catálogo visual y gestión gourmet.",
    estado: "Finalizado",
  },
  {
    icono: "/images/lukbyte.png",
    titulo: "Lukbyte",
    descripcion: "Sitio oficial de mi agencia de soluciones digitales.",
    detalles: "React · Vite · EmailJS · AOS · Framer Motion",
    estado: "Finalizado",
  },
  {
    icono: "/images/barber.png",
    titulo: "BarberKing",
    descripcion: "Sistema de gestión para barberías con enfoque mobile.",
    detalles: "React · Node.js · MySQL · Auth · PWA · Calendario",
    estado: "En desarrollo",
  },
];

/* ─── Variantes Framer Motion ───────────────── */
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const Proyectos = () => (
  <section className="proyectos" id="proyectos">
    <h2 className="proyectos__titulo">Proyectos</h2>
    <p className="proyectos__frase">
      “Estos son más que líneas de código. Son ideas que se volvieron reales.”
    </p>

    {/* Grid animado */}
    <motion.div
      className="proyectos__grid"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {proyectos.map((p) => (
        <motion.article
          className="proyecto__card"
          key={p.titulo}
          variants={cardVariants}
        >
          <img src={p.icono} alt={p.titulo} className="proyecto__icono" />
          <h3>{p.titulo}</h3>
          <p className="descripcion">{p.descripcion}</p>
          <span className="detalles">{p.detalles}</span>

          {/* Estado */}
          <span
            className={`estado ${
              p.estado === "Finalizado"
                ? "estado-finalizado"
                : "estado-en-desarrollo"
            }`}
          >
            {p.estado}
          </span>
        </motion.article>
      ))}
    </motion.div>
  </section>
);

export default Proyectos;
