import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Browsers,
  Database,
  GitBranch,
  Handshake,
  PlugsConnected,
  TreeStructure,
  UsersThree,
} from "@phosphor-icons/react";
import "./Tecnologias.css";
import ButtonLabel from "./ui/ButtonLabel";
import { useMotionMode } from "../hooks/usePinned";
import { SERVICIOS_URL } from "../data/site";

/* ---------- 1. Datos (alineados a tu hoja de vida) ---------- */
const frontend = [
  "React.js (Core)",
  "Next.js",
  "JavaScript (ES6+)",
  "TypeScript",
  "HTML5",
  "CSS3 (Modular, Tokens y Temas)",
  "Diseño Responsive (Mobile First)",
  "PWA (Progressive Web Apps)",
  "Framer Motion (Animaciones)",
  "Data Visualization (Dashboards/KPIs)",
  "React Hook Form (Smart Forms)",
];

const backend = [
  "Node.js",
  "NestJS",
  "Express.js",
  ".NET (C#)",
  "ASP.NET Core",
  "APIs REST",
  "GraphQL",
  "Autenticación JWT",
  "Multi-tenant Architecture",
  "Tiempo real",
  "Sincronización offline-first",
  "Idempotencia",
  "Arquitectura limpia",
  "Arquitectura por funcionalidades (Feature-based)",
  "Principios SOLID",
];

const basesDeDatos = [
  "PostgreSQL",
  "Prisma ORM",
  "SQL Server",
  "MySQL",
  "Firebase (Realtime Data)",
  "Entity Framework Core",
  "LINQ",
  "Modelado multi-tenant",
];

const despliegue = [
  "Despliegues a producción",
  "Vercel",
  "Railway",
  "Docker",
  "VPS",
  "CI/CD",
  "Dominios propios",
  "Git & GitHub",
  "Flujo de ramas",
  "Postman",
  "Vite",
  "Visual Studio Code",
  "Figma",
];

const integraciones = [
  "IA (Copilot/Agentes y Automatización)",
  "WhatsApp (pedidos automáticos)",
  "Google Workspace",
  "Shopify API (E-commerce Multimarca)",
  "Biométricos ZKTeco / BioTime",
  "Sistemas de impresión",
  "Geolocalización y zonas de domicilio",
  "QR / Omnicanalidad (Carritos por QR)",
];

const habilidadesBlandas = [
  "Liderazgo técnico en proyectos multimarca",
  "Diseño de experiencias omnicanal (físico + digital)",
  "Resolución de problemas de alta complejidad",
  "Comunicación asertiva en entornos corporativos",
  "Atención al detalle y calidad de UI (Pixel Perfect)",
  "Pensamiento estratégico de producto",
  "Transformación digital y gestión del cambio",
  "Diseño y estandarización de procesos",
  "Adaptabilidad tecnológica y aprendizaje acelerado",
];

const grupos = [
  { titulo: "Frontend & UX", Icono: Browsers, items: frontend },
  { titulo: "Backend & APIs", Icono: TreeStructure, items: backend },
  { titulo: "Bases de Datos", Icono: Database, items: basesDeDatos },
  {
    titulo: "Despliegue & Flujo de Trabajo",
    Icono: GitBranch,
    items: despliegue,
  },
  {
    titulo: "Integraciones & Automatización",
    Icono: PlugsConnected,
    items: integraciones,
    ancha: true,
  },
  {
    id: "habilidades",
    titulo: "Habilidades Profesionales",
    Icono: UsersThree,
    descripcion:
      "Más allá del código: estrategia, gestión multimarca e innovación tecnológica.",
    items: habilidadesBlandas,
    ancha: true,
  },
];

/* ---------- 2. Componente ----------
   En escritorio el scroll vertical desplaza la pista en horizontal.
   En móvil la pista es un carrusel nativo con scroll-snap. */
const Tecnologias = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const mode = useMotionMode();
  const pinned = mode === "desktop";
  const [distance, setDistance] = useState(0);

  /* Móvil: avance del carrusel nativo */
  const { scrollXProgress } = useScroll({ container: trackRef });

  useLayoutEffect(() => {
    if (!pinned) return;

    const measure = () =>
      setDistance(
        Math.max(0, trackRef.current.scrollWidth - stickyRef.current.clientWidth),
      );

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(trackRef.current);
    observer.observe(stickyRef.current);
    return () => observer.disconnect();
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0005,
  });
  const x = useTransform(progress, [0, 1], [0, -distance]);

  return (
    <section
      className="tecnologias"
      id="tecnologias"
      ref={sectionRef}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="tecnologias__sticky" ref={stickyRef}>
        <motion.div
          className="tecnologias__track"
          ref={trackRef}
          style={pinned ? { x } : undefined}
        >
          <header className="tecnologias__intro">
            <h2 className="display">Tecnologías</h2>
            <p className="lead">
              Transformando ideas complejas en soluciones digitales robustas y
              escalables.
            </p>
          </header>

          {grupos.map(({ id, titulo, Icono, descripcion, items, ancha }) => (
            <article
              className={`tech-card${ancha ? " tech-card--ancha" : ""}`}
              id={id}
              key={titulo}
            >
              <div className="tech-card__head">
                <h3>{titulo}</h3>
                <span className="tech-card__icon" aria-hidden="true">
                  <Icono size={22} weight="light" />
                </span>
              </div>
              {descripcion && <p className="tech-card__desc">{descripcion}</p>}
              <ul className="tech-grid">
                {items.map((item) => (
                  <li className="tech-chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* --- SERVICIOS --- */}
          <article className="tech-card tech-card--servicios" id="servicios">
            <div className="tech-card__head">
              <h3>Servicios Freelance & Consultoría</h3>
              <span className="tech-card__icon" aria-hidden="true">
                <Handshake size={22} weight="light" />
              </span>
            </div>
            <p className="tech-card__desc">
              Ayudo a empresas y emprendedores a dar el salto digital con
              soluciones que combinan <strong>Arquitectura robusta</strong>,{" "}
              <strong>IA Generativa</strong> y{" "}
              <strong>E-commerce de alto nivel</strong>. No solo creo sitios
              web, construyo herramientas que optimizan tus ventas y procesos.
            </p>
            <a
              href={SERVICIOS_URL}
              className="btn btn--ink servicios__boton"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonLabel>Ver paquetes y precios</ButtonLabel>
              <span className="btn__icon">
                <ArrowUpRight size={18} weight="bold" />
              </span>
            </a>
          </article>
        </motion.div>

        {mode !== "static" && (
          <div className="tecnologias__bar" aria-hidden="true">
            <motion.span
              style={{ scaleX: pinned ? progress : scrollXProgress }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Tecnologias;
