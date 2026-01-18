import React from "react";
import { motion } from "framer-motion";
import "./Certificados.css";

const certificados = [
  {
    icono: "/images/certificados/diploma-basico-programacion.jpg",
    titulo: "Programación Básica",
    entidad: "Platzi",
    fecha: "Septiembre 2022",
    descripcion:
      "Fundamentos esenciales de lógica, estructuras de control y pensamiento computacional. El inicio sólido que impulsó mi carrera como desarrollador.",
    enlace: "/images/certificados/diploma-basico-programacion.pdf",
  },
  {
    icono: "/images/certificados/diploma-c-sharp-poo.jpg",
    titulo: "Programación Orientada a Objetos en C#",
    entidad: "Platzi",
    fecha: "Julio 2025",
    descripcion:
      "Aprendí los principios clave de la POO: encapsulamiento, herencia, polimorfismo y abstracción, aplicados en C# con buenas prácticas.",
    enlace: "/images/certificados/diploma-c-sharp-poo.pdf",
  },
  {
    icono: "/images/certificados/diploma-csharp.jpg",
    titulo: "C# desde cero",
    entidad: "Platzi",
    fecha: "Julio 2025",
    descripcion:
      "Desarrollé habilidades fundamentales en C# para construir aplicaciones sólidas con sintaxis clara, estructuras de control y lógica estructurada.",
    enlace: "/images/certificados/diploma-csharp.pdf",
  },
  {
    icono: "/images/certificados/diploma-linq .jpg",
    titulo: "Manejo de Datos con LINQ",
    entidad: "Platzi",
    fecha: "Julio 2025",
    descripcion:
      "Curso enfocado en el uso de LINQ para consultar y transformar datos en C#. Aprendí a optimizar la manipulación de colecciones con sintaxis declarativa y expresiones lambda.",
    enlace: "/images/certificados/diploma-linq.pdf",
  },
  {
    icono: "/images/certificados/diploma-arquitectura-software.jpg",
    titulo: "Fundamentos de Arquitectura de Software",
    entidad: "Platzi",
    fecha: "Julio 2025",
    descripcion:
      "Certificación técnica en el diseño de sistemas escalables y mantenibles. Aprendí a seleccionar estructuras de software adecuadas basándome en requerimientos de negocio y atributos de calidad.",
    enlace: "/images/certificados/diploma-arquitectura-software-2025.pdf",
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60 },
  },
};

const Certificados = () => (
  <section className="certificados" id="certificados">
    <h2 className="certificados__titulo"> Certificados</h2>
    <p className="certificados__subtitulo">
      “Cada curso es una chispa que alimenta mi crecimiento profesional.”
    </p>

    <motion.div
      className="certificados__grid"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {certificados.map((c) => (
        <motion.article
          className="certificado__card"
          key={c.titulo}
          variants={cardVariants}
          whileTap={{ scale: 0.97 }}
        >
          <img
            src={c.icono}
            alt={c.titulo}
            className="certificado__icono"
            loading="lazy"
          />
          <h3>{c.titulo}</h3>
          <p className="entidad">{c.entidad}</p>
          <span className="fecha">{c.fecha}</span>
          {c.descripcion && <p className="descripcion">{c.descripcion}</p>}
          <a
            href={c.enlace}
            className="certificado__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver certificado
          </a>
        </motion.article>
      ))}
    </motion.div>
  </section>
);

export default Certificados;
