import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* ✅ Importa el archivo CSS que contiene tus fuentes */
import "./assets/fonts/fonts.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
