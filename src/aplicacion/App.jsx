import "./App.css";

import BarraNavegacion from "../secciones/layout/BarraNavegacion";
import PiePagina from "../secciones/layout/PiePagina";

import Hero from "../secciones/inicio/Hero";
import QuienSoy from "../secciones/sobre-mi/QuienSoy";
import Proyectos from "../secciones/proyectos/Proyectos";
import Servicios from "../secciones/servicios/Servicios";
import Tecnologias from "../secciones/tecnologias/Tecnologias";
import Certificados from "../secciones/certificados/Certificados";
import ContactoSincero from "../secciones/contacto/ContactoSincero";

import CintaNeon from "../compartido/ui/CintaNeon";
import ToquePersonal from "../compartido/ui/ToquePersonal";

function App() {
  return (
    <>
      <BarraNavegacion />

      <main>
        <section id="home">
          <Hero />
        </section>

        <CintaNeon />

        <section id="sobre-mi">
          <QuienSoy />
        </section>

        <ToquePersonal />

        <section id="proyectos">
          <Proyectos />
        </section>

        <section id="servicios">
          <Servicios />
        </section>

        <section id="tecnologias">
          <Tecnologias />
        </section>

        <section id="certificados">
          <Certificados />
        </section>

        <section id="contacto">
          <ContactoSincero />
        </section>
      </main>

      <PiePagina />
    </>
  );
}

export default App;
