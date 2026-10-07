import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Proyectos from "./components/Proyectos";
import Marcas from "./components/Marcas";
import QuienSoy from "./components/QuienSoy";
import Tecnologias from "./components/Tecnologias";
import CintaNeon from "./components/CintaNeon";
import Certificados from "./components/Certificados";
import PersonalTouch from "./components/PersonalTouch";
import ContactoSincero from "./components/ContactoSincero";
import ScrollProgress from "./components/ui/ScrollProgress";

function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Proyectos />
        <Marcas />
        <QuienSoy />
        <Tecnologias />
        <CintaNeon />
        <Certificados />
        <PersonalTouch />
      </main>
      <ContactoSincero />
    </>
  );
}

export default App;
