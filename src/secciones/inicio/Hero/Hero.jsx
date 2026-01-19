import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

import heroImg from "../../../assets/hero.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import AOS from "aos";
import "aos/dist/aos.css";

import { motion } from "framer-motion";

const phrases = [
  "No solo escribo código; diseño soluciones digitales con propósito y escalabilidad. Como desarrollador de software, fusiono arquitectura limpia, inteligencia artificial y diseño emocional para construir interfaces que no solo conectan con las personas, sino que impulsan resultados de negocio medibles e impactos reales en la industria.",
];

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
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const actionsRef = useRef(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setActionsVisible(entry.isIntersecting),
      { threshold: 0.4 },
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
        <motion.div className="hero__image" variants={piece}>
          <img src={heroImg} alt="Lucas Salazar trabajando" />
        </motion.div>

        <motion.div className="hero__text" variants={piece}>
          <h1>
            Hola, soy <br />
            Lucas Salazar
          </h1>

          <p className="hero__subtitle">
            Frontend Developer | React & TypeScript Specialist
          </p>

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

          <div
            ref={actionsRef}
            className={`hero__actions ${actionsVisible ? "is-visible" : ""}`}
          >
            <a
              href="https://lukbyte-my-website.vercel.app/servicios/ejemplos#"
              className="btn btn--primary"
            >
              Ver mis proyectos
            </a>

            <a
              href="/CV_Lucas_Salazar_Frontend_Developer.pdf"
              className="btn btn--primary"
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
