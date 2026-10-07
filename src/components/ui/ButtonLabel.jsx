import React from "react";

/* Etiqueta de botón con efecto de rodillo (estilos en globals.css). */
const ButtonLabel = ({ children }) => (
  <span className="btn__roll">
    <span data-text={children}>{children}</span>
  </span>
);

export default ButtonLabel;
