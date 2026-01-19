import React from "react";
import "./CintaNeon.css";

const frases = [
  "🏗️ Código limpio hoy, soluciones escalables para el mañana.",
  "🚀 Transformando requerimientos complejos en experiencias de alta fidelidad.",
  "🤖 La IA no reemplaza al desarrollador, potencia su capacidad de innovación.",
  "🧠 Ingeniería con propósito: donde la lógica se encuentra con la emoción.",
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
