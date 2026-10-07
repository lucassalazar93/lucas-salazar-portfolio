/* Genera la hoja de vida en una sola columna, legible por filtros ATS:
   sin tablas, sin cuadros de texto, sin imágenes, con títulos estándar.

   No forma parte del sitio. Para regenerarla tras editar el contenido:
     npm install --no-save docx
     node scripts/generar-cv.cjs cv/Lucas_Salazar_Villa_CV_Fullstack_Developer.docx
   y luego, en Word: Archivo > Guardar como > PDF. */
const fs = require("fs");
const path = require("path");
const {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  LevelFormat,
  Packer,
  Paragraph,
  TabStopType,
  TextRun,
} = require("docx");

const SALIDA = process.argv[2];
if (!SALIDA) throw new Error("Falta la ruta de salida");

/* ─── Medidas (A4, igual que el original) ─── */
const ANCHO = 11906;
const ALTO = 16838;
const MARGEN_X = 936;
const MARGEN_Y = 720;
const ANCHO_UTIL = ANCHO - MARGEN_X * 2;

const NAVY = "101726";
const NARANJA = "E64A00";
const GRIS = "4A5160";
const FUENTE = "Calibri";
const CUERPO = 20; // 10 pt

/* ─── Piezas ─── */
const run = (text, opts = {}) => new TextRun({ text, font: FUENTE, size: CUERPO, ...opts });

const enlace = (texto, url) =>
  new ExternalHyperlink({
    link: url,
    children: [run(texto, { color: NAVY, underline: {} })],
  });

const seccion = (titulo) =>
  new Paragraph({
    keepNext: true,
    spacing: { before: 170, after: 70 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 3 } },
    children: [run(titulo.toUpperCase(), { bold: true, size: 22, color: NAVY, characterSpacing: 20 })],
  });

/* Cargo y empresa a la izquierda, fechas a la derecha, en el mismo párrafo */
const cargo = (titulo, empresa, fechas) =>
  new Paragraph({
    keepNext: true,
    spacing: { before: 110, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: ANCHO_UTIL }],
    children: [
      run(titulo, { bold: true, size: 21 }),
      run(` | ${empresa}`, { bold: true, size: 21, color: NAVY }),
      run(`\t${fechas}`, { color: GRIS }),
    ],
  });

const lugar = (texto) =>
  new Paragraph({
    keepNext: true,
    spacing: { after: 50 },
    children: [run(texto, { italics: true, color: GRIS, size: 19 })],
  });

const vineta = (texto) =>
  new Paragraph({
    numbering: { reference: "vinetas", level: 0 },
    spacing: { after: 30, line: 250 },
    children: [run(texto)],
  });

const grupo = (etiqueta, texto) =>
  new Paragraph({
    spacing: { after: 36, line: 250 },
    children: [run(`${etiqueta}: `, { bold: true, color: NAVY }), run(texto)],
  });

const proyecto = ({ nombre, url, estado, descripcion }) =>
  new Paragraph({
    numbering: { reference: "vinetas", level: 0 },
    spacing: { after: 36, line: 250 },
    children: [
      run(nombre, { bold: true }),
      ...(estado ? [run(` (${estado})`, { color: GRIS })] : []),
      ...(url ? [run(" | "), enlace(url.replace(/^https?:\/\//, "").replace(/\/$/, ""), url)] : []),
      run(`. ${descripcion}`),
    ],
  });

const linea = (izquierda, derecha, detalle) =>
  new Paragraph({
    spacing: { after: 50 },
    tabStops: [{ type: TabStopType.RIGHT, position: ANCHO_UTIL }],
    children: [
      run(izquierda, { bold: true }),
      ...(detalle ? [run(` | ${detalle}`)] : []),
      ...(derecha ? [run(`\t${derecha}`, { color: GRIS })] : []),
    ],
  });

/* ─── Contenido ─── */
const contenido = [
  /* Encabezado */
  new Paragraph({
    spacing: { after: 20 },
    children: [run("LUCAS SALAZAR VILLA", { bold: true, size: 46, color: NAVY, characterSpacing: 10 })],
  }),
  new Paragraph({
    spacing: { after: 90 },
    children: [
      run("Fullstack Developer", { bold: true, size: 26, color: NARANJA }),
      run("  |  React, Next.js, NestJS, PostgreSQL", { size: 24, color: GRIS }),
    ],
  }),
  new Paragraph({
    spacing: { after: 30 },
    children: [
      run("Medellín, Colombia (remoto o híbrido) | +57 315 039 9322 | "),
      enlace("lucassalazar.work93@gmail.com", "mailto:lucassalazar.work93@gmail.com"),
    ],
  }),
  new Paragraph({
    spacing: { after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: NARANJA, space: 8 } },
    children: [
      enlace("lucas-salazar-portfolio.vercel.app", "https://lucas-salazar-portfolio.vercel.app"),
      run(" | "),
      enlace("github.com/lucassalazar93", "https://github.com/lucassalazar93"),
      run(" | "),
      enlace("linkedin.com/in/lucas-salazar-722b79319", "https://www.linkedin.com/in/lucas-salazar-722b79319/"),
    ],
  }),

  /* Perfil */
  seccion("Perfil profesional"),
  new Paragraph({
    spacing: { after: 40, line: 256 },
    children: [
      run(
        "Desarrollador fullstack con dos productos propios en el mercado y experiencia en entornos corporativos. " +
          "Construyo soluciones de punta a punta: frontend con React y Next.js, backend con NestJS y Node.js, " +
          "bases de datos PostgreSQL y despliegue en producción. Llevé al mercado MandiPOS, un ecosistema POS " +
          "para restaurantes que opera en dos sedes, y Quick Flow, una plataforma de catálogos inteligentes. " +
          "Combino ingeniería de software con visión de producto e integro inteligencia artificial en el flujo " +
          "de desarrollo para resolver problemas reales de negocio.",
      ),
    ],
  }),

  /* Competencias */
  seccion("Competencias y habilidades"),
  grupo(
    "Frontend",
    "React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Framer Motion, Progressive Web Apps (PWA), diseño responsive.",
  ),
  grupo(
    "Backend",
    "Node.js, NestJS, Express.js, APIs REST, GraphQL, autenticación JWT, WebSockets / Socket.io, C# y .NET.",
  ),
  grupo(
    "Bases de datos",
    "PostgreSQL, MySQL, SQL Server, MongoDB, Firebase, Prisma ORM, Sequelize ORM, modelado relacional.",
  ),
  grupo(
    "Despliegue y DevOps",
    "Vercel, Railway, Docker, VPS, CI/CD, Git y GitHub (flujo de ramas), dominios propios.",
  ),
  grupo(
    "Arquitectura",
    "Clean Architecture, arquitectura por funcionalidades (feature-based), principios SOLID, SaaS multi-tenant, tiempo real, sincronización offline-first, idempotencia.",
  ),
  grupo(
    "Integraciones",
    "Shopify API, WhatsApp, Google Workspace, biométricos ZKTeco / BioTime, Microsoft Copilot Studio (agentes de IA), geolocalización, sistemas de impresión.",
  ),
  grupo("Herramientas", "Vite, Postman, Swagger, Figma, Trello, Visual Studio Code."),
  grupo(
    "Habilidades profesionales",
    "Liderazgo técnico, pensamiento estratégico de producto, resolución de problemas complejos, comunicación con clientes y equipos, adaptabilidad y gestión del cambio.",
  ),

  /* Experiencia */
  seccion("Experiencia profesional"),

  cargo("Fullstack Developer", "Freelance", "Enero 2026 - Actualidad"),
  lugar("Medellín, Colombia"),
  vineta(
    "Llevé al mercado MandiPOS, un ecosistema POS para restaurantes en operación en dos sedes (Mandingas La 37 y Mundo Mandingas): POS, app de domicilios, catálogo para clientes y un robot que controla los sistemas de impresión.",
  ),
  vineta(
    "Diseñé su arquitectura SaaS multi-tenant con NestJS, Prisma y PostgreSQL en backend y Next.js en frontend, con tiempo real entre cocina, caja y domicilios y cierre financiero por turnos.",
  ),
  vineta(
    "Desarrollé y publiqué Quick Flow, plataforma de catálogos inteligentes con geolocalización que recomienda los productos más vendidos, cotiza domicilios por zonas y envía los pedidos a WhatsApp o directamente al POS.",
  ),
  vineta(
    "Implementé para Primotos la transformación digital sobre Google Workspace: migración del correo, unidades compartidas, permisos y estándares de gestión documental para tres áreas, con manuales operativos.",
  ),
  vineta(
    "Desarrollo para Primotos un sistema de control de asistencia y horas extras integrado con biométricos ZKTeco y BioTime, con un agente local offline-first, sincronización idempotente por API y un motor de cálculo de turnos.",
  ),
  vineta(
    "Construyo Patient 360, CRM y plataforma de gestión para clínicas odontológicas, y las tiendas virtuales de ELVORÉ (joyería) y Nore Quintero (repostería gourmet).",
  ),

  cargo("Frontend Developer Jr (Prácticas Profesionales)", "Crystal S.A.S.", "Julio 2025 - Enero 2026"),
  lugar("Medellín, Colombia. Empresa del sector industrial y textil"),
  vineta(
    "Desarrollé en React y TypeScript el sistema de PQRS de cuatro marcas (Gef, Punto Blanco, Baby Fresh y Galax) y un panel multimarca para tiendas físicas, integrando el inventario físico y online en tiempo real con Shopify.",
  ),
  vineta(
    "Implementé un sistema de recomendaciones inteligentes de outfits y generación de carritos mediante códigos QR, conectando la tienda física con la pasarela de pagos digital.",
  ),
  vineta(
    "Programé funcionalidades de geolocalización para recuperar ventas, sugiriendo tiendas cercanas con stock cuando el producto no estaba disponible en el punto físico.",
  ),
  vineta(
    "Lideré el frontend de una Progressive Web App industrial para digitalizar indicadores de rendimiento (KPIs) en planta.",
  ),
  vineta(
    "Participé en la creación de agentes de IA con Microsoft Copilot Studio para la atención automatizada y la gestión de incidentes.",
  ),

  cargo("Fullstack Developer", "Freelance", "Diciembre 2024 - Junio 2025"),
  lugar("Medellín, Colombia"),
  vineta(
    "Desarrollé soluciones web completas (frontend y backend) para distintos clientes: SPAs y dashboards con React y TypeScript, lógica de negocio, integración de APIs y manejo de datos.",
  ),
  vineta(
    "Implementé autenticación y control de acceso con JWT y Firebase, gestionando usuarios, sesiones y permisos en paneles administrativos con información en tiempo real.",
  ),
  vineta(
    "Diseñé arquitecturas modulares y escalables, con separación de responsabilidades y buenas prácticas que facilitan el mantenimiento y la evolución de los sistemas.",
  ),

  cargo("Fundador y Administrador", "Lukas Express", "Julio 2018 - Septiembre 2024"),
  lugar("Medellín, Colombia"),
  vineta(
    "Fundé y gestioné una microempresa de logística: coordiné equipos, cumplí metas de entrega y digitalicé el control de inventario y los procesos.",
  ),

  cargo("Administrador de Producción", "Tapas y Tanques", "Enero 2014 - Marzo 2017"),
  lugar("Medellín, Colombia"),
  vineta(
    "Coordiné al personal de planta, el control de inventarios, la producción metalmecánica y los procesos de calidad.",
  ),

  /* Proyectos */
  seccion("Proyectos destacados"),
  proyecto({
    nombre: "MandiPOS",
    estado: "en el mercado",
    url: "https://pos.mandingas.online",
    descripcion:
      "Ecosistema POS para restaurantes: POS, app de domicilios, catálogo para clientes y robot de impresión. Next.js, NestJS, PostgreSQL, Prisma, multi-tenant, tiempo real.",
  }),
  proyecto({
    nombre: "Quick Flow",
    estado: "en el mercado",
    url: "https://quickflow-tau.vercel.app/",
    descripcion:
      "Catálogos inteligentes con geolocalización, cotizador de domicilios por zonas y pedidos a WhatsApp o al POS.",
  }),
  proyecto({
    nombre: "Nore Quintero",
    estado: "publicado",
    url: "https://nore-quintero.vercel.app/",
    descripcion:
      "Tienda virtual de repostería gourmet. JavaScript con módulos ES, arquitectura por capas, integración con WhatsApp y Google Maps.",
  }),
  proyecto({
    nombre: "Hackea la IA",
    estado: "finalizado",
    descripcion: "Landing que generó más de 300 leads en su primera semana. React, Vite, EmailJS.",
  }),
  proyecto({
    nombre: "Patient 360",
    estado: "en desarrollo",
    descripcion:
      "CRM y gestión para clínicas odontológicas: agenda, atención clínica, planes de tratamiento, pagos y seguimiento del paciente.",
  }),
  proyecto({
    nombre: "ORIX",
    estado: "en desarrollo",
    descripcion:
      "Plataforma SaaS de agenda inteligente para centros de estética, spas y barberías. React, Node.js, Firebase, PWA.",
  }),
  proyecto({
    nombre: "Soy Arte",
    estado: "en desarrollo",
    descripcion:
      "Plataforma e-commerce fullstack con catálogo, blog y panel administrativo. React, Node.js, MySQL.",
  }),

  /* Educación */
  seccion("Educación"),
  linea(
    "Ingeniería de Sistemas",
    "Etapa final",
    "Corporación Unificada Nacional de Educación Superior (CUN)",
  ),
  linea("Tecnólogo en Análisis y Desarrollo de Software", "", "SENA, Medellín"),

  /* Certificaciones */
  seccion("Certificaciones"),
  grupo("2026", "React Avanzado y Patrones de Diseño."),
  grupo(
    "Platzi, 2025",
    "Fundamentos de Arquitectura de Software, Programación Orientada a Objetos con C#, Manejo de Datos con LINQ, C# desde cero.",
  ),
  grupo("Platzi, 2022", "Programación Básica."),

  /* Idiomas */
  seccion("Idiomas"),
  new Paragraph({
    children: [
      run("Español: ", { bold: true }),
      run("nativo.   "),
      run("Inglés: ", { bold: true }),
      run("básico (A2)."),
    ],
  }),
];

const documento = new Document({
  creator: "Lucas Salazar Villa",
  title: "Lucas Salazar Villa - Fullstack Developer",
  subject: "Hoja de vida",
  description: "Hoja de vida de Lucas Salazar Villa, Fullstack Developer",
  keywords:
    "Fullstack Developer, React, Next.js, NestJS, Node.js, TypeScript, PostgreSQL, Prisma, SaaS, Medellín",
  styles: {
    default: {
      document: { run: { font: FUENTE, size: CUERPO, language: { value: "es-CO" } } },
    },
  },
  numbering: {
    config: [
      {
        reference: "vinetas",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 340, hanging: 220 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: ANCHO, height: ALTO },
          margin: { top: MARGEN_Y, bottom: MARGEN_Y, left: MARGEN_X, right: MARGEN_X },
        },
      },
      children: contenido,
    },
  ],
});

Packer.toBuffer(documento).then((buffer) => {
  fs.mkdirSync(path.dirname(SALIDA), { recursive: true });
  fs.writeFileSync(SALIDA, buffer);
  console.log(`Escrito: ${SALIDA} (${Math.round(buffer.length / 1024)} KB)`);
});
