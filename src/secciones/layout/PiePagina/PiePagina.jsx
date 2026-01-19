import React from "react";
import "./PiePagina.css";

const PiePagina = () => {
  return (
    <footer className="pie-pagina">
      <div className="container">
        <p>
          © {new Date().getFullYear()} Lucas Salazar — Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default PiePagina;
