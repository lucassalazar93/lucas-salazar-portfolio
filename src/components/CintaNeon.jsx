// src/components/CintaNeon.jsx
import React from "react";
import "./cintaNeon.css";

const frases = [
  "💡 Cada línea de código es una chispa de creación.",
  "🧠 La tecnología no reemplaza, potencia.",
  "🤖 La IA no piensa por mí, piensa conmigo.",
  "🚀 Desarrollo no es solo lógica… también es emoción.",
];

const CintaNeon = () => {
  return (
    <section className="cinta-neon">
      <div className="cinta-neon__inner">
        <div className="cinta-neon__track">
          {[...frases, ...frases].map((texto, i) => (
            <span key={i}>{texto}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CintaNeon;
