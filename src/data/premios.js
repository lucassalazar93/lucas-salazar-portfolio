import tiendaDelFuturo from "../assets/img/premios/tienda-del-futuro.webp";
import hiperautomatizacion from "../assets/img/premios/hiperautomatizacion-rpa-ia.webp";

/* ─── Premios ───────────────────────
   Una fila por premio, en orden de puesto. monto en pesos colombianos.
   lugar: se dibuja como número grande en contorno (01, 03).
   Las fotos van recortadas a 960x1000: sin carné ni terceros. */
export const premios = [
  {
    id: "tienda-del-futuro",
    foto: tiendaDelFuturo,
    alt: "Lucas Salazar sentado bajo el logo de Crystal, con el cheque de $20.000.000 para Tienda del Futuro",
    titulo: "Tienda del Futuro",
    descripcion:
      "Experiencia omnicanal para Gef, Punto Blanco y Baby Fresh, con outfits visualizados mediante IA y un checkout unificado.",
    detalles: ["IA Generativa", "Shopify API", "Omnicanal", "Multimarca"],
    monto: 20000000,
    lugar: 1,
    puesto: "Primer puesto",
    convocatoria: "INNOVA",
    anio: 2025,
  },
  {
    id: "hiperautomatizacion",
    foto: hiperautomatizacion,
    alt: "Lucas Salazar sosteniendo el cheque de $5.000.000 para Hiperautomatización RPA + IA",
    titulo: "Hiperautomatización RPA + IA",
    descripcion:
      "Automatización de procesos con robots de software (RPA) e inteligencia artificial.",
    detalles: ["RPA", "IA", "Automatización de procesos"],
    monto: 5000000,
    lugar: 3,
    puesto: "Tercer puesto",
    convocatoria: "INNOVA",
    anio: 2025,
  },
];

export const totalPremios = premios.reduce((suma, p) => suma + p.monto, 0);

export function formatoPesos(valor) {
  return `$${valor.toLocaleString("es-CO")}`;
}

export function formatoMillones(valor) {
  return `$${Math.round(valor / 1000000)}M`;
}
