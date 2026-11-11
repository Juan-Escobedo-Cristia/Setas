// Datos semilla de la guía de setas de L'Infiestu.
// Fuente: lecturas manuales en https://sporas.io/visor (v1.5.3) el 10 nov 2026.
// Este es el ÚNICO archivo que cambia al actualizar la información.
// Regla: null = no medido o ilegible. Nunca rellenar con estimaciones.
window.SETALES_DATA = {
  meta: {
    titulo: "Setas L'Infiestu",
    base: "L'Infiestu (Piloña, Asturias)",
    fuente: "sporas.io/visor v1.5.3",
    fuente_url: "https://sporas.io/visor",
    fecha_lectura: "2026-11-10",
    version_datos: 1,
    horizonte: "Previsión a 3 días del visor (jueves 12 y viernes 13 nov, según el punto)",
    aviso_limites: [
      "Son lecturas puntuales de un modelo (cruza clima, altitud, arbolado cartografiado y suelo). No son observaciones de campo.",
      "Hay unos 15 puntos medidos. Las zonas son áreas orientativas alrededor de esos puntos, no límites reales de bosque.",
      "Las probabilidades cambian cada día. Comprobar en el visor la mañana de la salida."
    ]
  },

  clima: {
    punto_referencia: { nombre: "Cuerrías (Piloña)", lat: 43.3142, lon: -5.3167, alt_m: 508, orientacion: "umbría", bosque: "carbayu" },
    lluvia_mm: { d7: 5.8, d15: 7.9, d30: 41.4, d60: 200.9 },
    lluvia_21d_estimada_mm: "10–20",
    lluvia_21d_nota: "Estimación derivada de las lecturas de 15 y 30 días. El visor no da los 21 días exactos.",
    temp_media_c: { d7: 9.6, d15: 10.8, d30: 11.6, d60: 14.0 },
    prevision: { lluvia_mm: 12.6, fecha: "2026-11-12", nota: "Lluvia prevista el jueves, justo antes del viernes." },
    notas: [
      "Octubre fue lluvioso (60 mm el 7 oct, 22 mm el 17 oct) y desde entonces ha llovido muy poco.",
      "El visor marca aire seco y viento fuerte estos días.",
      "El 9 nov fue cálido (media de 15 °C). Por encima de ~800 m el visor avisa de 'demasiado frío'."
    ]
  },

  especies: {
    gula: {
      nombre: "Gula de monte", cientifico: "Cantharellus lutescens",
      temporada: "Oct–Dic (pico en noviembre)", altitud_m: [400, 1800],
      habitat: ["hayas", "castaños", "pinos", "abetos"],
      agua: "Humedad sostenida con musgo. Tolera bien el frío y el hielo.",
      fuente: "catalogo_sporas"
    },
    trompeta: {
      nombre: "Trompeta negra", cientifico: "Craterellus cornucopioides",
      temporada: "Sep–Nov (muy tardía)", altitud_m: null,
      habitat: ["bosque caducifolio"],
      agua: "Humedad sostenida bajo hojarasca. Pasa fácilmente desapercibida.",
      fuente: "catalogo_sporas"
    },
    niscalo: {
      nombre: "Níscalo", cientifico: "Lactarius deliciosus",
      temporada: "Sep–Dic", altitud_m: [100, 1800],
      habitat: ["pinos (exclusivo)"],
      agua: "Lluvia acumulada suficiente en las semanas previas más descenso térmico, sin heladas fuertes. Es la más fiable.",
      fuente: "catalogo_sporas"
    },
    rebozuelo: {
      nombre: "Rebozuelo", cientifico: "Cantharellus cibarius",
      temporada: "Jun–Oct (casi acabada)", altitud_m: [50, 1700],
      habitat: ["castaños", "hayas", "robles", "encinas", "pinos"],
      agua: "No responde a un chaparrón puntual sino a un acumulado de humedad sostenido y generoso.",
      fuente: "catalogo_sporas"
    },
    oronja: {
      nombre: "Oronja", cientifico: "Amanita caesarea",
      temporada: "Ago–Oct", altitud_m: [300, 1000],
      habitat: ["castaños", "hayas", "robles", "encinas"],
      agua: "Termófila. Prefiere solanas cálidas tras tormentas de verano. Muy sensible a heladas.",
      fuente: "catalogo_sporas"
    },
    boleto: {
      nombre: "Boletos", cientifico: "Boletus edulis / pinophilus / aereus",
      temporada: "Sep–Nov (pinophilus: jun, sep–nov)", altitud_m: [500, 2000],
      habitat: ["hayas", "castaños", "robles", "pinos"],
      agua: "Lluvia más temperaturas suaves.",
      fuente: "catalogo_sporas (parcial: solo se leyó la ficha de pinophilus)"
    }
  },

  agua_estimacion_propia: "Como orden de magnitud, la mayoría de estas especies quiere unos 40–60 mm repartidos en 2–3 semanas. Es una estimación general de Claude, no un dato del visor.",

  zonas: [
    {
      id: "oeste",
      nombre: "Oeste: Nava, Coya, Ceceda",
      resumen: "Pinar de pino insigne, castañar y carbayeda a baja y media altura.",
      altitud_m: [350, 750],
      dia_propuesto: { dia: "viernes", motivo: "Zona baja que aprovecha la lluvia del jueves." },
      porque: "Es la única zona donde se midió níscalo con valor real. Los pinares bajos quedan fuera del rango de la gula (empieza en 400 m).",
      especies_objetivo: [
        { id: "niscalo", prob_pct: 100, n_puntos: 1, nota: "Un solo punto medido (pinar a 451 m)." },
        { id: "trompeta", prob_pct: 52, n_puntos: 1, nota: "Carbayeda en umbría a 676 m." }
      ],
      puntos: [
        { id: "ceceda", nombre: "Ceceda de Arriba", lat: 43.3352, lon: -5.4437, alt_m: 451, orientacion: null, bosque: "pino insigne", uso: "referencia",
          lecturas: [{ especie: "niscalo", prob_pct: 100, pico_pct: 100, pico_fecha: "2026-11-09", fecha_prevision: "2026-11-12", nota: "Pico ya alcanzado en la lectura de hoy." }] },
        { id: "berones", nombre: "Berones", lat: 43.3367, lon: -5.4300, alt_m: 676, orientacion: "umbría", bosque: "carbayu", uso: "referencia",
          lecturas: [{ especie: "trompeta", prob_pct: 51.9, pico_pct: 63, pico_fecha: "2026-11-10", fecha_prevision: "2026-11-12", nota: null }] }
      ],
      riesgos: ["Viento fuerte y aire seco estos días.", "La zona está en el concejo de Nava, a unos 7 km al oeste de L'Infiestu."],
      plan_b: false
    },
    {
      id: "sur-proximo",
      nombre: "Sur próximo: Pesquerín, La Canal, Cuerrías",
      resumen: "Hayedo y bosque mixto en umbría entre 450 y 1.000 m.",
      altitud_m: [450, 1000],
      dia_propuesto: { dia: "sábado", motivo: "Mejor franja de gula medida, a poca distancia de L'Infiestu." },
      porque: "Los mejores valores de gula medidos están aquí (hayedo en umbría a ~540 m). El rebozuelo marca bajo porque su temporada está terminando.",
      especies_objetivo: [
        { id: "gula", prob_pct: 80, n_puntos: 2, nota: "La Canal y Pesquerín marcan lo mismo (~80%)." },
        { id: "rebozuelo", prob_pct: 27, n_puntos: 4, nota: "Pico previsto del 30–31% el 17 nov." }
      ],
      puntos: [
        { id: "la-canal", nombre: "La Canal", lat: 43.2997, lon: -5.2782, alt_m: 544, orientacion: "umbría", bosque: "haya", uso: "referencia",
          lecturas: [{ especie: "gula", prob_pct: 79.8, pico_pct: 100, pico_fecha: "2026-11-09", fecha_prevision: "2026-11-12", nota: null }] },
        { id: "pesquerin", nombre: "Pesquerín", lat: 43.3277, lon: -5.2913, alt_m: 533, orientacion: null, bosque: "sin arbolado cartografiado (alrededor: robles, hayas, castaños)", uso: "referencia",
          lecturas: [{ especie: "gula", prob_pct: 79.8, pico_pct: 100, pico_fecha: "2026-11-09", fecha_prevision: "2026-11-12", nota: null }] },
        { id: "cuerrias", nombre: "Cuerrías", lat: 43.3142, lon: -5.3167, alt_m: 508, orientacion: "umbría", bosque: "carbayu", uso: "referencia",
          lecturas: [{ especie: "rebozuelo", prob_pct: 26.7, pico_pct: 31, pico_fecha: "2026-11-17", fecha_prevision: "2026-11-12", nota: "Punto de referencia del clima de la guía." }] },
        { id: "porciles", nombre: "Porciles", lat: 43.3192, lon: -5.3442, alt_m: 432, orientacion: null, bosque: "sin arbolado cartografiado", uso: "referencia",
          lecturas: [{ especie: "rebozuelo", prob_pct: 26.7, pico_pct: 31, pico_fecha: "2026-11-17", fecha_prevision: "2026-11-12", nota: null }] },
        { id: "riofabar-590", nombre: "Ríofabar (alto)", lat: 43.2772, lon: -5.3435, alt_m: 590, orientacion: null, bosque: "sin arbolado cartografiado", uso: "referencia",
          lecturas: [{ especie: "rebozuelo", prob_pct: 26.7, pico_pct: 31, pico_fecha: "2026-11-17", fecha_prevision: "2026-11-12", nota: null }] },
        { id: "rozapanera", nombre: "Rozapanera", lat: 43.2752, lon: -5.3771, alt_m: 618, orientacion: "umbría", bosque: "castaño", uso: "referencia",
          lecturas: [{ especie: "rebozuelo", prob_pct: 26.7, pico_pct: 30, pico_fecha: "2026-11-17", fecha_prevision: "2026-11-12", nota: null }] },
        { id: "riofabar-370", nombre: "Ríofabar (pinar bajo)", lat: 43.2857, lon: -5.3524, alt_m: 370, orientacion: "umbría", bosque: "pino insigne", uso: "evitar",
          lecturas: [{ especie: "gula", prob_pct: 0, pico_pct: null, pico_fecha: null, fecha_prevision: "2026-11-12", nota: "Altitud fuera del rango de la gula. Para gula, evitar los pinares bajos." }] }
      ],
      riesgos: ["Aire seco estos días.", "Por encima de ~800 m el visor ya avisa de frío para algunas especies."],
      plan_b: false
    },
    {
      id: "sur-alto",
      nombre: "Sur alto: Nieves, Ambingue, Orlé",
      resumen: "Hayedo de altura entre 700 y 1.300 m. La cota más alta de la guía.",
      altitud_m: [700, 1300],
      dia_propuesto: { dia: "domingo", motivo: "El pico previsto es el 17 nov. Decidir esa mañana según la helada." },
      porque: "Es la apuesta de altura. La gula aguanta el frío y marca 58% a 1.200 m, pero el visor avisa de frío y viento para otras especies.",
      especies_objetivo: [
        { id: "gula", prob_pct: 58, n_puntos: 1, nota: "Un solo punto (Nieves, 1.207 m). Pico previsto del 91% el 17 nov." },
        { id: "rebozuelo", prob_pct: 10, n_puntos: 2, nota: "Demasiado frío según el visor." }
      ],
      puntos: [
        { id: "nieves", nombre: "Nieves", lat: 43.2137, lon: -5.3242, alt_m: 1207, orientacion: null, bosque: "sin arbolado cartografiado (alrededor: hayas, castaños, robles)", uso: "referencia",
          lecturas: [{ especie: "gula", prob_pct: 58.3, pico_pct: 91, pico_fecha: "2026-11-17", fecha_prevision: "2026-11-12", nota: "Viento fuerte y aire seco." }] },
        { id: "ambingue", nombre: "Ambingue", lat: 43.2382, lon: -5.2254, alt_m: 876, orientacion: null, bosque: "sin arbolado cartografiado (alrededor: hayas, castaños, robles)", uso: "referencia",
          lecturas: [{ especie: "rebozuelo", prob_pct: 12.0, pico_pct: 26, pico_fecha: "2026-11-17", fecha_prevision: "2026-11-12", nota: "El visor avisa: demasiado frío." }] },
        { id: "orle", nombre: "Orlé", lat: 43.2052, lon: -5.2879, alt_m: 1303, orientacion: null, bosque: "haya", uso: "referencia",
          lecturas: [{ especie: "rebozuelo", prob_pct: 8.8, pico_pct: 19, pico_fecha: "2026-11-17", fecha_prevision: "2026-11-12", nota: "El visor avisa: demasiado frío y viento fuerte." }] }
      ],
      riesgos: ["Frío y viento fuerte en cota alta.", "Posible helada: es la zona más expuesta."],
      plan_b: false
    },
    {
      id: "sueve",
      nombre: "Sueve (plan B)",
      resumen: "Sierra litoral al noreste. Sin haya cerca en lo medido; solo sirve para trompeta negra.",
      altitud_m: [250, 570],
      dia_propuesto: { dia: "alternativa", motivo: "Plan B para trompeta negra, nunca para gula." },
      porque: "La gula marca 0% por falta de haya o pino cerca. La trompeta negra marca 45% en carbayedas y castañares.",
      especies_objetivo: [
        { id: "trompeta", prob_pct: 45.5, n_puntos: 3, nota: "Pico previsto el 10 nov, ya en descenso." },
        { id: "gula", prob_pct: 0, n_puntos: 2, nota: "Sin haya ni pino cerca." }
      ],
      puntos: [
        { id: "bodes-567", nombre: "Bodes (ladera norte)", lat: 43.4365, lon: -5.2164, alt_m: 567, orientacion: null, bosque: "carbayu", uso: "referencia",
          lecturas: [{ especie: "trompeta", prob_pct: 45.5, pico_pct: 69, pico_fecha: "2026-11-10", fecha_prevision: "2026-11-13", nota: null }] },
        { id: "bodes-248", nombre: "Bodes (solana baja)", lat: 43.4158, lon: -5.2137, alt_m: 248, orientacion: "solana", bosque: "castaño", uso: "referencia",
          lecturas: [{ especie: "trompeta", prob_pct: 45.5, pico_pct: 69, pico_fecha: "2026-11-10", fecha_prevision: "2026-11-13", nota: null }] },
        { id: "eslabayo", nombre: "Eslabayo", lat: 43.4257, lon: -5.2944, alt_m: 280, orientacion: "umbría", bosque: "castaño", uso: "referencia",
          lecturas: [{ especie: "trompeta", prob_pct: 45.5, pico_pct: 69, pico_fecha: "2026-11-10", fecha_prevision: "2026-11-13", nota: null }] },
        { id: "carrandi", nombre: "Carrandi", lat: 43.4469, lon: -5.2618, alt_m: 479, orientacion: "umbría", bosque: "eucalipto blanco", uso: "evitar",
          lecturas: [{ especie: "gula", prob_pct: 0, pico_pct: null, pico_fecha: null, fecha_prevision: "2026-11-13", nota: "Sin arbolado de la especie cerca." }] },
        { id: "loroñe", nombre: "Loroñe", lat: 43.4469, lon: -5.2240, alt_m: 507, orientacion: "umbría", bosque: "carbayu", uso: "evitar",
          lecturas: [{ especie: "gula", prob_pct: 0, pico_pct: null, pico_fecha: null, fecha_prevision: "2026-11-13", nota: "Sin arbolado de la especie cerca." }] }
      ],
      riesgos: ["No se midió ningún punto por encima de ~600 m: se desconoce qué hay en la cresta.", "Sierra expuesta al viento."],
      plan_b: true
    }
  ]
};