import React, { useRef } from "react";
import "./Hero.css";
import heroImg from "../../assets/img/lucas-hero.webp";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";

/* Framer Motion */
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import SplitText from "../ui/SplitText";
import Magnetic from "../ui/Magnetic";
import ButtonLabel from "../ui/ButtonLabel";
import { useMotionMode } from "../../hooks/usePinned";
import { proyectos } from "../../data/proyectos";
import { CTA_CONTACTO, CV_URL, WHATSAPP_URL } from "../../data/site";

const EASE = [0.16, 1, 0.3, 1];

/* Dos columnas de proyectos que se cruzan detrás del panel */
const columnaA = proyectos.filter((_, i) => i % 2 === 0);
const columnaB = [...proyectos.filter((_, i) => i % 2 === 1), proyectos[0]];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/* shift: desplazamiento horizontal de cada línea con el scroll (móvil) */
const Titulo = ({ decorative = false, shift }) => (
  <>
    <motion.span className="hero__line" style={shift && { x: shift[0] }}>
      <SplitText text="Hola, soy" delay={0.25} decorative={decorative} />
    </motion.span>
    <motion.span className="hero__line" style={shift && { x: shift[1] }}>
      <SplitText text="Lucas Salazar" delay={0.4} decorative={decorative} />
    </motion.span>
  </>
);

const Columna = ({ items, y }) => (
  <motion.div className="hero__col" style={{ y }}>
    {items.map((p) => (
      <div className="hero__tile" key={p.id}>
        <img
          src={p.icono}
          alt=""
          loading="lazy"
          style={p.placa ? { background: p.placa } : undefined}
        />
        <span>{p.titulo}</span>
      </div>
    ))}
  </motion.div>
);

const Hero = () => {
  const ref = useRef(null);
  const mode = useMotionMode();
  const desktop = mode === "desktop";
  const mobile = mode === "mobile";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0005,
  });

  /* Escritorio: el panel se encoge y deja ver el muro de proyectos */
  const scale = useTransform(progress, [0, 0.55], [1, 0.4]);
  const borderRadius = useTransform(progress, [0, 0.25], [0, 56]);
  const shade = useTransform(progress, [0, 0.5], [0.8, 0]);
  const colA = useTransform(progress, [0, 1], ["0%", "-34%"]);
  const colB = useTransform(progress, [0, 1], ["-34%", "0%"]);

  /* Móvil: el panel retrocede mientras el bloque de proyectos sube encima.
     El retrato se acerca y las líneas del título se abren. */
  const mScale = useTransform(progress, [0, 1], [1, 0.86]);
  const mRadius = useTransform(progress, [0, 0.3], [0, 32]);
  const portraitScale = useTransform(progress, [0, 1], [1, 1.14]);
  const portraitY = useTransform(progress, [0, 1], ["0%", "-5%"]);
  const lineA = useTransform(progress, [0, 1], ["0%", "-16%"]);
  const lineB = useTransform(progress, [0, 1], ["0%", "12%"]);
  const copyOpacity = useTransform(progress, [0, 0.35], [1, 0]);

  const panelStyle = desktop
    ? { scale, borderRadius }
    : mobile
      ? { scale: mScale, borderRadius: mRadius }
      : undefined;
  const shift = mobile ? [lineA, lineB] : undefined;

  /* Foco de luz que sigue al cursor (arranca detrás del texto) */
  const spotX = useMotionValue(window.innerWidth * 0.3);
  const spotY = useMotionValue(window.innerHeight * 0.75);
  const spotSpringX = useSpring(spotX, { stiffness: 80, damping: 20 });
  const spotSpringY = useSpring(spotY, { stiffness: 80, damping: 20 });

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = e.currentTarget.offsetWidth / rect.width;
    spotX.set((e.clientX - rect.left) * ratio);
    spotY.set((e.clientY - rect.top) * ratio);
  };

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero__sticky">
        {desktop && (
          <div className="hero__wall" aria-hidden="true">
            <Columna items={columnaA} y={colA} />
            <Columna items={columnaB} y={colB} />
            <motion.div className="hero__shade" style={{ opacity: shade }} />
          </div>
        )}

        <motion.div
          className="hero__panel"
          style={panelStyle}
          onPointerMove={handlePointerMove}
        >
          <div className="hero__glow hero__glow--a" />
          <div className="hero__glow hero__glow--b" />
          <motion.div
            className="hero__spot"
            style={{ x: spotSpringX, y: spotSpringY }}
          />

          <div className="hero__lead">
            <div className="hero__heading">
              <h1 className="hero__title">
                <Titulo shift={shift} />
              </h1>
              {/* Misma tipografía en contorno, por delante del retrato */}
              <div className="hero__title hero__title--outline" aria-hidden="true">
                <Titulo decorative shift={shift} />
              </div>
            </div>

            <motion.p className="hero__role" {...fadeUp(0.85)}>
              Fullstack Developer
            </motion.p>

            <motion.div
              className="hero__bottom"
              style={mobile ? { opacity: copyOpacity } : undefined}
            >
              <motion.p className="hero__text" {...fadeUp(0.95)}>
                Combino arquitectura limpia, inteligencia artificial y
                experiencia de usuario para crear productos que generan
                resultados reales.
              </motion.p>

              <motion.div className="hero__actions" {...fadeUp(1.05)}>
                <Magnetic>
                  <a
                    href={WHATSAPP_URL}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ButtonLabel>{CTA_CONTACTO}</ButtonLabel>
                    <span className="btn__icon">
                      <ArrowUpRight size={18} weight="bold" />
                    </span>
                  </a>
                </Magnetic>
                <a href={CV_URL} className="btn btn--outline" download>
                  <ButtonLabel>Descargar CV</ButtonLabel>
                  <span className="btn__icon">
                    <DownloadSimple size={18} weight="bold" />
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="hero__portrait"
            style={mobile ? { scale: portraitScale, y: portraitY } : undefined}
          >
            <motion.img
              src={heroImg}
              alt="Lucas Salazar"
              width="1024"
              height="1024"
              fetchPriority="high"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            />
          </motion.div>

          <motion.div className="hero__meta" {...fadeUp(1.1)}>
            <p>
              Fullstack
              <br />
              Developer
            </p>
            <p>
              Productos SaaS
              <br />y sistemas reales
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
