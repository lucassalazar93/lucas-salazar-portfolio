import React from "react";
import "./App.css";

/* ✅ Importación global de fuentes personalizadas */
import "./assets/fonts/fonts.css";

/* ✅ Componentes principales */
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuienSoy from "./components/QuienSoy";
import Proyectos from "./components/Proyectos";
import CintaNeon from "./components/CintaNeon";
import Tecnologias from "./components/Tecnologias";
import PersonalTouch from "./components/PersonalTouch";
import ContactoSincero from "./components/ContactoSincero";
import Footer from "./components/Footer/Footer";
import Certificados from "./components/Certificados";
import Servicios from "./components/Servicios";

/* ✅ Futuras secciones: sobre mí, proyectos, contacto, etc. */

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <CintaNeon />
      <QuienSoy />
      <Proyectos />
      <Certificados />
      <Tecnologias />
      <Servicios />
      <CintaNeon />
      <PersonalTouch />
      <ContactoSincero />
      <Footer />
    </>
  );
}

export default App;
