import React from "react";
import { motion } from "framer-motion";
import "./Proyectos.css";

const proyectos = [
  {
    icono: "/images/tienda-futuro-multibrand.png",
    titulo: "Tienda del Futuro Multimarca",
    descripcion:
      "Experiencia omnicanal para Gef, Punto Blanco y Baby Fresh con visualización de outfits mediante IA y checkout unificado.",
    detalles:
      "React · IA Generativa · Shopify API · Arquitectura Multimarca · QR Payments.",
    estado: "Proyecto Corporativo",
  },
  {
    icono: "/images/pqrs-multibrand.png",
    titulo: "Sistema PQRS Multimarca",
    descripcion:
      "Plataforma centralizada de atención al cliente para el ecosistema de marcas de Crystal (Gef, Punto Blanco, Baby Fresh, Galax).",
    detalles: "React · Omnicanalidad · UI Dinámica · Gestión de Datos.",
    estado: "Proyecto Corporativo",
  },
  {
    icono: "/images/eficiencia-crystal.png",
    titulo: "Eficiencia Crystal",
    descripcion:
      "Sistema industrial para la digitalización de KPIs y monitoreo de rendimiento de producción en tiempo real.",
    detalles: "React · Data Visualization · PWA · Industrial UX.",
    estado: "Proyecto Corporativo",
  },
  {
    icono: "/images/orix-glow.png",
    titulo: "ORIX - Agenda Inteligente",
    descripcion:
      "Ecosistema SaaS para centros de estética, spas y barberías. Permite la creación de tiendas y gestión multicanal de agendas profesionales.",
    detalles: "React · Node.js · Multi-tenant · SaaS · PWA · Smart Scheduling",
    estado: "En desarrollo",
  },
  {
    icono: "/images/soy-arte.png",
    titulo: "Soy Arte",
    descripcion: "Plataforma que mezcla tecnología, empoderamiento y alma.",
    detalles: "Node · React · MySQL · css · Framer Motion",
    estado: "En desarrollo",
  },
  {
    icono: "/images/sabor-a-felicidad.png",
    titulo: "Nore Quintero",
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
    icono: "/images/ia.png",
    titulo: "Hackea la IA",
    descripcion: "Una landing que convirtió curiosidad en acción.",
    detalles: "React · Vite · EmailJS — 300+ leads en la primera semana.",
    estado: "Finalizado",
  },
];

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

function normalizarEstado(estado) {
  return String(estado || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function claseEstado(estado) {
  const e = normalizarEstado(estado);

  if (e === "finalizado") return "estado-finalizado";
  if (e === "en desarrollo" || e === "en-desarrollo" || e === "endesarrollo")
    return "estado-en-desarrollo";

  if (
    e === "caso de exito" ||
    e === "proyecto corporativo" ||
    e === "corporativo"
  )
    return "estado-exito";

  return "estado-en-desarrollo";
}

const Proyectos = () => (
  <section className="proyectos" id="proyectos">
    <h2 className="proyectos__titulo">Proyectos</h2>
    <p className="proyectos__frase">
      “Estos son más que líneas de código. Son ideas que se volvieron reales.”
    </p>

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

          <span className={`estado ${claseEstado(p.estado)}`}>{p.estado}</span>
        </motion.article>
      ))}
    </motion.div>
  </section>
);

export default Proyectos;
