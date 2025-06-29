import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import heroImg from "../../assets/hero.svg";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

/* AOS */
import AOS from "aos";
import "aos/dist/aos.css";

/* Framer Motion */
import { motion } from "framer-motion";

/* ─── Frases que rotan ─────────────────────────────── */
const phrases = [
  "No solo escribo código, creo experiencias que respiran propósito. Como desarrollador de software, fusiono creatividad, inteligencia artificial y diseño emocional para construir interfaces que conectan con las personas y generan resultados que impactan de verdad.",
];

/* ─── Variantes de Framer Motion ───────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const piece = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60 },
  },
};

const Hero = () => {
  /* AOS init */
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  /* Botones show/hide con IntersectionObserver */
  const actionsRef = useRef(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setActionsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (actionsRef.current) io.observe(actionsRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero__content hero--image-left"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* ─── Imagen (pieza 1) ─── */}
        <motion.div className="hero__image" variants={piece}>
          <img src={heroImg} alt="Lucas Salazar trabajando" />
        </motion.div>

        {/* ─── Texto (pieza 2) ─── */}
        <motion.div className="hero__text" variants={piece}>
          <h1>
            Hola, soy <br />
            Lucas Salazar
          </h1>

          {/* Swiper frases */}
          <Swiper
            className="hero__swiper"
            modules={[EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop
          >
            {phrases.map((txt) => (
              <SwiperSlide key={txt}>
                <p>{txt}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones */}
          <div
            ref={actionsRef}
            className={`hero__actions ${actionsVisible ? "is-visible" : ""}`}
          >
            <a href="#proyectos" className="btn btn--primary">
              Ver mis proyectos
            </a>
            <a
              href="/hoja-de-vida-lucas-salazar-2025.pdf"
              className="btn btn--outline"
              download
            >
              Descargar CV
            </a>
            <a href="#contacto" className="btn btn--coffee">
              Tomémonos un café ☕
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
