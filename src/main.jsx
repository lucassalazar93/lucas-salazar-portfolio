import React from "react";
import ReactDOM from "react-dom/client";

/* Los estilos globales van primero: los de cada componente los sobrescriben */
import "./styles/globals.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
