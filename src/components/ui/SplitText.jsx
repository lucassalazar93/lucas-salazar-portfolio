import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./SplitText.css";

const EASE = [0.16, 1, 0.3, 1];

const charVariants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/* Revela un texto letra por letra desde una máscara.
   decorative: capa duplicada que no debe leerse dos veces. */
const SplitText = ({
  text,
  delay = 0,
  stagger = 0.03,
  inView = false,
  decorative = false,
}) => {
  const reduce = useReducedMotion();
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
    : { animate: "show" };

  return (
    <span className="split">
      {!decorative && <span className="sr-only">{text}</span>}
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : "hidden"}
        variants={{
          show: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
        {...trigger}
      >
        {text.split(" ").map((word, w) => (
          <React.Fragment key={`${word}-${w}`}>
            {w > 0 && " "}
            <span className="split__word">
              {[...word].map((char, c) => (
                <span className="split__mask" key={c}>
                  <motion.span className="split__char" variants={charVariants}>
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          </React.Fragment>
        ))}
      </motion.span>
    </span>
  );
};

export default SplitText;
