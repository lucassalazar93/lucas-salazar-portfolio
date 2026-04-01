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
  "No solo escribo código: construyo soluciones digitales con propósito y escalabilidad. Como desarrollador fullstack, combino arquitectura limpia, inteligencia artificial y experiencia de usuario para crear productos que conectan con las personas y generan resultados reales de negocio.",
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
    AOS.init({ duration: 600, once: true });
  }, []);

  /* Botones show/hide con IntersectionObserver */
  const actionsRef = useRef(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setActionsVisible(entry.isIntersecting),
      { threshold: 0.1 },
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
          <p className="hero__subtitle">
            Fullstack Developer | Construyo productos SaaS y sistemas reales
          </p>

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
            {/*
            <a
              href="https://lukbyte-my-website.vercel.app/servicios/ejemplos#"
              className="btn btn--primary"
            >
              Ver mis proyectos
            </a>
            */}
            <a
              href="/Lucas_SalazarVilla_CV2026 Fullstack Developer.pdf"
              className="btn btn--outline"
              download
            >
              Descargar CV
            </a>
            <a
              href="https://wa.me/573150399322?text=Hola%20Lucas,%20me%20encantó%20tu%20portafolio%20y%20me%20gustaría%20hablar%20contigo%20👋"
              className="btn btn--coffee"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tomémonos un café ☕
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
