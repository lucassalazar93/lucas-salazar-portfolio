import React, { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import "./Proyectos.css";
import SplitText from "./ui/SplitText";
import { useMotionMode } from "../hooks/usePinned";
import { claseEstado, destacados, otros } from "../data/proyectos";

const EASE = [0.16, 1, 0.3, 1];

/* ─── Pila con scroll ───────────────────────
   Cada tarjeta entra desde abajo durante ENTRADA del paso y
   la anterior se encoge y oscurece mientras tanto. */
const PASO = 1 / (destacados.length - 1);
const ENTRADA = 0.75;
const VH_POR_PASO = 80;

const Chips = ({ items }) => (
  <ul className="chips">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Enlace = ({ proyecto }) => (
  <a
    className="proyecto-enlace"
    href={proyecto.enlace}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Ver ${proyecto.titulo} en vivo`}
  >
    Ver en vivo
    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
  </a>
);

const Tarjeta = ({ proyecto, index, progress, deckProgress, mode }) => {
  const entra = (index - 1) * PASO;
  const sale = index * PASO;
  const y = useTransform(progress, [entra, entra + PASO * ENTRADA], ["104%", "0%"]);
  const scale = useTransform(progress, [sale, sale + PASO * ENTRADA], [1, 0.93]);
  const velo = useTransform(progress, [sale, sale + PASO * ENTRADA], [0, 0.6]);

  /* Móvil: las tarjetas se pegan arriba (sticky en CSS) y las de atrás
     se encogen y oscurecen a medida que llegan las siguientes. */
  const detras = destacados.length - 1 - index;
  const desde = (index + 0.35) / destacados.length;
  const deckScale = useTransform(deckProgress, [desde, 1], [1, 1 - detras * 0.035]);
  const deckVelo = useTransform(deckProgress, [desde, 1], [0, detras * 0.13]);

  const style =
    mode === "desktop"
      ? { y, scale }
      : mode === "mobile"
        ? { scale: deckScale, "--i": index }
        : undefined;

  return (
    <motion.article className="stack-card" style={style}>
      <div className="stack-card__emblem">
        <img
          src={proyecto.icono}
          alt=""
          loading="lazy"
          style={proyecto.placa ? { background: proyecto.placa } : undefined}
        />
      </div>

      <div className="stack-card__body">
        <span className={`estado ${claseEstado(proyecto.estado)}`}>
          {proyecto.estado}
        </span>
        <h3>{proyecto.titulo}</h3>
        {proyecto.bajada && (
          <p className="stack-card__bajada">{proyecto.bajada}</p>
        )}
        <p className="stack-card__desc">{proyecto.descripcion}</p>
        {proyecto.nota && <p className="stack-card__nota">{proyecto.nota}</p>}
        {proyecto.flujo && (
          <ol className="stack-card__flujo" aria-label="Flujo del sistema">
            {proyecto.flujo.map((paso, i) => (
              <li key={paso}>
                {i > 0 && <ArrowRight size={12} weight="bold" aria-hidden="true" />}
                {paso}
              </li>
            ))}
          </ol>
        )}
        <Chips items={proyecto.detalles} />
        {proyecto.enlace && <Enlace proyecto={proyecto} />}
      </div>

      {mode !== "static" && (
        <motion.div
          className="stack-card__velo"
          style={{ opacity: mode === "desktop" ? velo : deckVelo }}
        />
      )}
    </motion.article>
  );
};

/* Foco que sigue al cursor dentro de la tarjeta */
const handleSpot = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const Proyectos = () => {
  const workRef = useRef(null);
  const frameRef = useRef(null);
  const mode = useMotionMode();
  const pinned = mode === "desktop";
  const [activo, setActivo] = useState(0);

  /* Avance del scroll a lo largo de la baraja (móvil) */
  const { scrollYProgress: deckProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress } = useScroll({
    target: workRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0005,
  });
  const progress = useTransform(smooth, [0.04, 0.9], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const index = Math.floor(v / PASO + (1 - ENTRADA / 2));
    setActivo(Math.min(destacados.length - 1, Math.max(0, index)));
  });

  /* Móvil: todas las tarjetas de la baraja miden lo que la más alta, para
     que cada una tape por completo a la anterior al apilarse. */
  useLayoutEffect(() => {
    if (mode !== "mobile") return;
    const frame = frameRef.current;
    let ancho = 0;

    const igualar = (forzar = false) => {
      if (!forzar && frame.clientWidth === ancho) return;
      ancho = frame.clientWidth;
      frame.style.setProperty("--deck-h", "0px");
      const alturas = [...frame.children].map((card) => card.offsetHeight);
      frame.style.setProperty("--deck-h", `${Math.max(...alturas)}px`);
    };

    igualar();
    const observer = new ResizeObserver(() => igualar());
    observer.observe(frame);
    document.fonts?.ready.then(() => igualar(true));

    return () => {
      observer.disconnect();
      frame.style.removeProperty("--deck-h");
    };
  }, [mode]);

  const irA = (index) => {
    const el = workRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const recorrido = el.offsetHeight - window.innerHeight;
    const p = index === 0 ? 0 : (index - 0.2) * PASO;
    window.scrollTo({
      top: top + recorrido * (0.04 + p * 0.86),
      behavior: "smooth",
    });
  };

  return (
    <section className="proyectos" id="proyectos">
      {/* ─── Destacados ─── */}
      <div
        className="work"
        ref={workRef}
        style={
          pinned
            ? { height: `${100 + (destacados.length - 1) * VH_POR_PASO}vh` }
            : undefined
        }
      >
        <div className="work__sticky">
          <h2 className="display work__titulo">
            <SplitText text="Ideas que se volvieron reales" inView />
          </h2>

          <div className="work__layout">
            {pinned && (
              <ol className="work__index">
                <motion.span
                  className="work__index-fill"
                  style={{ scaleY: progress }}
                />
                {destacados.map((p, i) => (
                  <li key={p.id} className={i === activo ? "is-active" : ""}>
                    <button
                      type="button"
                      onClick={() => irA(i)}
                      aria-current={i === activo ? "true" : undefined}
                    >
                      <span className="work__index-nombre">{p.titulo}</span>
                      <span className="work__index-estado">{p.estado}</span>
                    </button>
                  </li>
                ))}
              </ol>
            )}

            <div className="work__frame" ref={frameRef}>
              {destacados.map((p, i) => (
                <Tarjeta
                  key={p.id}
                  proyecto={p}
                  index={i}
                  progress={progress}
                  deckProgress={deckProgress}
                  mode={mode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Resto de proyectos ─── */}
      <div className="mas">
        <h3 className="display mas__titulo">Más proyectos</h3>

        <div className="mas__grid">
          {otros.map((p, i) => (
            <motion.article
              className="mas__tile"
              key={p.id}
              onPointerMove={handleSpot}
              initial={{ opacity: 0, y: 40, x: pinned ? 0 : i % 2 ? 36 : -36 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <div className="mas__emblem">
                <img
                  src={p.icono}
                  alt=""
                  loading="lazy"
                  style={p.placa ? { background: p.placa } : undefined}
                />
              </div>
              <div className="mas__body">
                <span className={`estado ${claseEstado(p.estado)}`}>
                  {p.estado}
                </span>
                <h4>{p.titulo}</h4>
                {p.bajada && <p className="mas__bajada">{p.bajada}</p>}
                <p>{p.descripcion}</p>
                {p.nota && <p className="mas__nota">{p.nota}</p>}
                <Chips items={p.detalles} />
                {p.enlace && <Enlace proyecto={p} />}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
