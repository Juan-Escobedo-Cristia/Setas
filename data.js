// Datos de la guía de setas de L'Infiestu. v4, lectura del 11 nov 2026.
// Fuente: lecturas manuales en https://sporas.io/visor (v1.5.3).
// Este es el ÚNICO archivo que cambia al actualizar la información.
// Regla: null = no medido o ilegible. Nunca rellenar con estimaciones.
// clima, especies y agua_estimacion_propia vienen de la lectura v1 (10 nov); clima.fecha_clima lo indica.
window.SETALES_DATA = {
 "meta": {
  "titulo": "Setas L'Infiestu",
  "base": "L'Infiestu (Piloña, Asturias)",
  "version_datos": 4,
  "fecha_lectura": "2026-11-11",
  "fuente_url": "https://sporas.io/visor",
  "visor": "1.5.3",
  "origen": {
   "nombre": "Villamayor (Piloña)",
   "lat": 43.3602,
   "lon": -5.3068
  },
  "puntos_por_zona": 10,
  "total_puntos_medidos": 50,
  "dia_base": "sáb 14 nov; vie y dom sacados de la gráfica de 15 días",
  "aviso_limites": [
   "Son lecturas de un modelo, no observaciones de campo.",
   "Puntos vecinos comparten valor: 10 puntos no son 10 muestras independientes.",
   "Un 0 % suele ser altitud, arbolado o frío, no falta de lluvia.",
   "La afluencia es una suposición (lejos del pueblo, sin datos reales).",
   "Tiempos de Google Maps hasta el camino más cercano al punto, no hasta el inicio de ruta.",
   "Boleto: bajando; en casi todos los sitios su máximo fue el 11 nov (31 %) y cae a ~0 el domingo. Solo Ríofabar alto y Nieves marcan pico hacia el 26 nov.",
   "Entrar en fincas privadas es decisión vuestra; Picos de Europa tiene normativa propia.",
   "La 'gula' del visor es Cantharellus lutescens (trompeta amarilla), no Craterellus tubaeformis.",
   "Lago y Montes de Sebares: gula alta en puntos donde el visor no ve bosque; no usar como sitios de gula sin comprobar.",
   "Límite de coche ampliado a 33 min por decisión del grupo. Sigue incumpliendo 1,2 km: Ríofabar alto–Nieves (1,15 km).",
   "Sur próximo y Sureste se han unido en una sola zona (Sur): eran el mismo hayedo con los mismos valores."
  ],
  "auditoria": {
   "fecha": "2026-11-11",
   "verificado": "30 lecturas de sábado en 6 sitios (cirieno, berones, tejedal-2, nieves, carrio, ques) y 7 tiempos de Google Maps; sin diferencias >=10 puntos.",
   "correcciones": [
    {
     "zona_id": "sur-proximo",
     "sitio_id": "tejedal-2",
     "especie": "trompeta",
     "campo": "pico_pct",
     "valor_actual": 59,
     "valor_verificado": 53
    },
    {
     "zona_id": "sureste",
     "sitio_id": "cirieno",
     "especie": null,
     "campo": "alt_m",
     "valor_actual": 664,
     "valor_verificado": 562
    },
    {
     "zona_id": "sur-proximo",
     "sitio_id": "la-canal",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 30
    },
    {
     "zona_id": "sur-proximo",
     "sitio_id": "la-matosa",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 28
    },
    {
     "zona_id": "sur-proximo",
     "sitio_id": "tejedal-1",
     "especie": "trompeta",
     "campo": "pico_pct",
     "valor_actual": 59,
     "valor_verificado": 58
    },
    {
     "zona_id": "sur-proximo",
     "sitio_id": "tejedal-1",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 26
    },
    {
     "zona_id": "sur-proximo",
     "sitio_id": "tejedal-2",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 24
    },
    {
     "zona_id": "sureste",
     "sitio_id": "cazo",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 25
    },
    {
     "zona_id": "sureste",
     "sitio_id": "ambingue",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 28
    },
    {
     "zona_id": "sureste",
     "sitio_id": "tejedal-3",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 27
    },
    {
     "zona_id": "este",
     "sitio_id": "sebares",
     "especie": "rebozuelo",
     "campo": "pico_pct",
     "valor_actual": 30,
     "valor_verificado": 29
    }
   ],
   "no_cambiado": "No se ha quitado ni sustituido ningún sitio; los que incumplen reglas están marcados en 'incumple'."
  },
  "limite_min_coche": 33,
  "cambios_v4": "Zonas sur-proximo y sureste unidas en sur (4 sitios: cirieno, cazo, ambingue, la-canal). Límite de coche a 33 min."
 },
 "especies_nombre": {
  "gula": "Gula de monte (C. lutescens)",
  "trompeta": "Trompeta negra",
  "niscalo": "Níscalo",
  "rebozuelo": "Rebozuelo",
  "boleto": "Boleto (B. edulis)"
 },
 "clima": {
  "punto_referencia": {
   "nombre": "Cuerrías (Piloña)",
   "lat": 43.3142,
   "lon": -5.3167,
   "alt_m": 508,
   "orientacion": "umbría",
   "bosque": "carbayu"
  },
  "lluvia_mm": {
   "d7": 5.8,
   "d15": 7.9,
   "d30": 41.4,
   "d60": 200.9
  },
  "lluvia_21d_estimada_mm": "10–20",
  "lluvia_21d_nota": "Estimación derivada de las lecturas de 15 y 30 días. El visor no da los 21 días exactos.",
  "temp_media_c": {
   "d7": 9.6,
   "d15": 10.8,
   "d30": 11.6,
   "d60": 14
  },
  "prevision": {
   "lluvia_mm": 12.6,
   "fecha": "2026-11-12",
   "nota": "Lluvia prevista el jueves, justo antes del viernes."
  },
  "notas": [
   "Octubre fue lluvioso (60 mm el 7 oct, 22 mm el 17 oct) y desde entonces ha llovido muy poco.",
   "El visor marca aire seco y viento fuerte estos días.",
   "El 9 nov fue cálido (media de 15 °C). Por encima de ~800 m el visor avisa de 'demasiado frío'."
  ],
  "fecha_clima": "2026-11-10"
 },
 "especies": {
  "gula": {
   "nombre": "Gula de monte",
   "cientifico": "Cantharellus lutescens",
   "temporada": "Oct–Dic (pico en noviembre)",
   "altitud_m": [
    400,
    1800
   ],
   "habitat": [
    "hayas",
    "castaños",
    "pinos",
    "abetos"
   ],
   "agua": "Humedad sostenida con musgo. Tolera bien el frío y el hielo.",
   "fuente": "catalogo_sporas"
  },
  "trompeta": {
   "nombre": "Trompeta negra",
   "cientifico": "Craterellus cornucopioides",
   "temporada": "Sep–Nov (muy tardía)",
   "altitud_m": null,
   "habitat": [
    "bosque caducifolio"
   ],
   "agua": "Humedad sostenida bajo hojarasca. Pasa fácilmente desapercibida.",
   "fuente": "catalogo_sporas"
  },
  "niscalo": {
   "nombre": "Níscalo",
   "cientifico": "Lactarius deliciosus",
   "temporada": "Sep–Dic",
   "altitud_m": [
    100,
    1800
   ],
   "habitat": [
    "pinos (exclusivo)"
   ],
   "agua": "Lluvia acumulada suficiente en las semanas previas más descenso térmico, sin heladas fuertes. Es la más fiable.",
   "fuente": "catalogo_sporas"
  },
  "rebozuelo": {
   "nombre": "Rebozuelo",
   "cientifico": "Cantharellus cibarius",
   "temporada": "Jun–Oct (casi acabada)",
   "altitud_m": [
    50,
    1700
   ],
   "habitat": [
    "castaños",
    "hayas",
    "robles",
    "encinas",
    "pinos"
   ],
   "agua": "No responde a un chaparrón puntual sino a un acumulado de humedad sostenido y generoso.",
   "fuente": "catalogo_sporas"
  },
  "boleto": {
   "nombre": "Boletos",
   "cientifico": "Boletus edulis / pinophilus / aereus",
   "temporada": "Sep–Nov (pinophilus: jun, sep–nov)",
   "altitud_m": [
    500,
    2000
   ],
   "habitat": [
    "hayas",
    "castaños",
    "robles",
    "pinos"
   ],
   "agua": "Lluvia más temperaturas suaves.",
   "fuente": "catalogo_sporas (parcial: solo se leyó la ficha de pinophilus)"
  }
 },
 "agua_estimacion_propia": "Como orden de magnitud, la mayoría de estas especies quiere unos 40–60 mm repartidos en 2–3 semanas. Es una estimación general de Claude, no un dato del visor.",
 "zonas": [
  {
   "id": "oeste",
   "nombre": "Oeste (Berones, Bierces, Ques, Beloncio)",
   "alt_rango": "255–735 m",
   "min_coche_rango": "16–20",
   "resumen": "Única zona con níscalo: dos pinares muy altos. En castañar solo trompeta y rebozuelo. Sin gula.",
   "media": {
    "gula": [
     0,
     0,
     0,
     0,
     0
    ],
    "trompeta": [
     31,
     26,
     20,
     26,
     7
    ],
    "niscalo": [
     30,
     30,
     27,
     29,
     3
    ],
    "rebozuelo": [
     19,
     18,
     21,
     19,
     7
    ],
    "boleto": [
     3,
     2,
     0,
     2,
     2
    ]
   },
   "mezcla_bosque": "3 pino, 3 roble, 3 castaño, 1 otro",
   "aviso": "Media del níscalo (29 %) engaña: solo 3 de 10 puntos son pinar y ahí vale 100 %. Busca pinar.",
   "sitios": [
    {
     "id": "berones",
     "nombre": "Berones (pinar)",
     "lat": 43.3354,
     "lon": -5.4365,
     "alt_m": 735,
     "orientacion": null,
     "bosque": "pino",
     "min_coche": 20,
     "km_villamayor": 10.8,
     "especies": [
      {
       "especie": "niscalo",
       "vie": 100,
       "sab": 100,
       "dom": 89,
       "media": 96,
       "pico_pct": 100,
       "pico_fecha": "12 nov"
      },
      {
       "especie": "boleto",
       "vie": 16,
       "sab": 9,
       "dom": 0,
       "media": 8,
       "pico_pct": 31,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "gula",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "trompeta",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "rebozuelo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Pinar. Níscalo 100 % vie/sáb, baja a 89 % domingo.",
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "bierces",
     "nombre": "Bierces (pinar)",
     "lat": 43.3434,
     "lon": -5.4104,
     "alt_m": 634,
     "orientacion": "umbría",
     "bosque": "pino",
     "min_coche": 18,
     "km_villamayor": 8.6,
     "especies": [
      {
       "especie": "niscalo",
       "vie": 100,
       "sab": 100,
       "dom": 89,
       "media": 96,
       "pico_pct": 100,
       "pico_fecha": "12 nov"
      },
      {
       "especie": "boleto",
       "vie": 16,
       "sab": 9,
       "dom": 0,
       "media": 8,
       "pico_pct": 31,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "gula",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "trompeta",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "rebozuelo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Pinar en umbría. Mismo valor que Berones: dos pinares cercanos, enlazables en una ruta.",
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "ques",
     "nombre": "Ques (castañar)",
     "lat": 43.3467,
     "lon": -5.3885,
     "alt_m": 378,
     "orientacion": "solana",
     "bosque": "castaño",
     "min_coche": 16,
     "km_villamayor": 6.8,
     "especies": [
      {
       "especie": "trompeta",
       "vie": 45,
       "sab": 37,
       "dom": 29,
       "media": 37,
       "pico_pct": 59,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 28,
       "sab": 29,
       "dom": 30,
       "media": 29,
       "pico_pct": 31,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "gula",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Solo trompeta/rebozuelo. Trompeta baja de 45 a 29 % hasta el domingo.",
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "beloncio",
     "nombre": "Beloncio (castañar)",
     "lat": 43.3294,
     "lon": -5.385,
     "alt_m": 255,
     "orientacion": "solana",
     "bosque": "castaño",
     "min_coche": 19,
     "km_villamayor": 7.2,
     "especies": [
      {
       "especie": "trompeta",
       "vie": 45,
       "sab": 37,
       "dom": 29,
       "media": 37,
       "pico_pct": 59,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 28,
       "sab": 29,
       "dom": 30,
       "media": 29,
       "pico_pct": 31,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "gula",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Igual que Ques.",
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "alta"
    }
   ]
  },
  {
   "id": "sur",
   "nombre": "Sur (hayedos de Cirieño, Cazo, Ambingue y La Canal)",
   "alt_rango": "441–853 m",
   "min_coche_rango": "24–33",
   "resumen": "Unión de las antiguas zonas Sur próximo y Sureste: mismo hayedo en umbría y mismos valores. La mejor zona para gula (76–87 %, pico 92–94 % el 17 nov) y trompeta. Media calculada con 20 puntos.",
   "media": {
    "gula": [
     62,
     59,
     67,
     63,
     16
    ],
    "trompeta": [
     46,
     38,
     31,
     38,
     20
    ],
    "niscalo": [
     0,
     0,
     0,
     0,
     0
    ],
    "rebozuelo": [
     24,
     25,
     25,
     25,
     20
    ],
    "boleto": [
     11,
     6,
     0,
     6,
     13
    ]
   },
   "n_puntos": 20,
   "mezcla_bosque": "17 haya, 3 roble",
   "aviso": "Los 20 puntos comparten casi los mismos valores: es una sola celda climática del visor, no 20 muestras distintas. Otros hayedos de la misma zona con valores iguales: La Matosa (43.3042, -5.292; 23 min), Tejedal bajo (43.2927, -5.2604; 26 min), Tejedal (43.2782, -5.2669; 31 min) y Tejedal alto (43.2757, -5.2834; 31 min).",
   "sitios": [
    {
     "id": "cirieno",
     "nombre": "Cirieño (hayedo)",
     "lat": 43.29,
     "lon": -5.1931,
     "alt_m": 562,
     "orientacion": "umbría",
     "bosque": "haya",
     "min_coche": 33,
     "km_villamayor": 12.1,
     "especies": [
      {
       "especie": "gula",
       "vie": 85,
       "sab": 87,
       "dom": 90,
       "media": 87,
       "pico_pct": 94,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 63,
       "sab": 57,
       "dom": 67,
       "media": 62,
       "pico_pct": 70,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 28,
       "sab": 30,
       "dom": 30,
       "media": 29,
       "pico_pct": 30,
       "pico_fecha": "15 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "33 min: aceptado por el grupo (límite ampliado a 33). Punto en borde de celda: 562 m al norte (estos valores), 664 m al sur (boleto ~9 % sáb). El mejor punto de la lectura.",
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "cazo",
     "nombre": "Cazo (hayedo)",
     "lat": 43.2732,
     "lon": -5.2099,
     "alt_m": 853,
     "orientacion": "umbría",
     "bosque": "haya",
     "min_coche": 29,
     "km_villamayor": 12.5,
     "especies": [
      {
       "especie": "gula",
       "vie": 83,
       "sab": 76,
       "dom": 89,
       "media": 83,
       "pico_pct": 92,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 45,
       "sab": 37,
       "dom": 29,
       "media": 37,
       "pico_pct": 55,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 24,
       "sab": 25,
       "dom": 25,
       "media": 25,
       "pico_pct": 25,
       "pico_fecha": "14 nov"
      },
      {
       "especie": "boleto",
       "vie": 17,
       "sab": 9,
       "dom": 0,
       "media": 9,
       "pico_pct": 31,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": null,
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "ambingue",
     "nombre": "Ambingue (hayedo)",
     "lat": 43.283,
     "lon": -5.2312,
     "alt_m": 644,
     "orientacion": "umbría",
     "bosque": "haya",
     "min_coche": 27,
     "km_villamayor": 10.5,
     "especies": [
      {
       "especie": "gula",
       "vie": 83,
       "sab": 76,
       "dom": 89,
       "media": 83,
       "pico_pct": 92,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 45,
       "sab": 37,
       "dom": 29,
       "media": 37,
       "pico_pct": 59,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 27,
       "sab": 28,
       "dom": 28,
       "media": 28,
       "pico_pct": 28,
       "pico_fecha": "14 nov"
      },
      {
       "especie": "boleto",
       "vie": 17,
       "sab": 9,
       "dom": 0,
       "media": 9,
       "pico_pct": 31,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": null,
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "la-canal",
     "nombre": "La Canal (hayedo)",
     "lat": 43.291,
     "lon": -5.2824,
     "alt_m": 441,
     "orientacion": "umbría",
     "bosque": "haya",
     "min_coche": 24,
     "km_villamayor": 7.9,
     "especies": [
      {
       "especie": "gula",
       "vie": 83,
       "sab": 76,
       "dom": 89,
       "media": 83,
       "pico_pct": 92,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 45,
       "sab": 37,
       "dom": 29,
       "media": 37,
       "pico_pct": 59,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 28,
       "sab": 29,
       "dom": 30,
       "media": 29,
       "pico_pct": 30,
       "pico_fecha": "15 nov"
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": null,
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "alta"
    }
   ]
  },
  {
   "id": "riofabar",
   "nombre": "Ríofabar / Nieves",
   "alt_rango": "592–968 m",
   "min_coche_rango": "22–28",
   "resumen": "Hayedo con gula 64 % (media 31 % porque la mitad de los puntos son robledal). Trompeta 30 %.",
   "media": {
    "gula": [
     26,
     32,
     36,
     31,
     5
    ],
    "trompeta": [
     36,
     30,
     22,
     29,
     10
    ],
    "niscalo": [
     0,
     0,
     0,
     0,
     0
    ],
    "rebozuelo": [
     16,
     19,
     21,
     19,
     10
    ],
    "boleto": [
     10,
     5,
     0,
     5,
     7
    ]
   },
   "mezcla_bosque": "5 haya, 5 roble",
   "aviso": "Menos probable que el sur próximo y el sureste; sirve como alternativa en otra dirección.",
   "sitios": [
    {
     "id": "riofabar-1",
     "nombre": "Ríofabar alto (hayedo)",
     "lat": 43.248,
     "lon": -5.3438,
     "alt_m": 842,
     "orientacion": "umbría",
     "bosque": "haya",
     "min_coche": 26,
     "km_villamayor": 12.8,
     "especies": [
      {
       "especie": "gula",
       "vie": 53,
       "sab": 64,
       "dom": 73,
       "media": 63,
       "pico_pct": 91,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 37,
       "sab": 30,
       "dom": 23,
       "media": 30,
       "pico_pct": 44,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 14,
       "sab": 17,
       "dom": 19,
       "media": 17,
       "pico_pct": 22,
       "pico_fecha": "16 nov"
      },
      {
       "especie": "boleto",
       "vie": 14,
       "sab": 7,
       "dom": 0,
       "media": 7,
       "pico_pct": 39,
       "pico_fecha": "26 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "A 1,15 km de Nieves: incumple la separación mínima de 1,2 km.",
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "alta",
     "incumple": [
      "distancia<1.2km"
     ]
    },
    {
     "id": "riofabar-2",
     "nombre": "Ríofabar bajo (hayedo)",
     "lat": 43.2587,
     "lon": -5.3476,
     "alt_m": 592,
     "orientacion": "umbría",
     "bosque": "haya",
     "min_coche": 23,
     "km_villamayor": 11.8,
     "especies": [
      {
       "especie": "gula",
       "vie": 53,
       "sab": 64,
       "dom": 73,
       "media": 63,
       "pico_pct": 91,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 37,
       "sab": 30,
       "dom": 23,
       "media": 30,
       "pico_pct": 47,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 17,
       "sab": 20,
       "dom": 24,
       "media": 20,
       "pico_pct": 30,
       "pico_fecha": "16 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": null,
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "nieves",
     "nombre": "Nieves (hayedo)",
     "lat": 43.2472,
     "lon": -5.3297,
     "alt_m": 968,
     "orientacion": "umbría",
     "bosque": "haya",
     "min_coche": 28,
     "km_villamayor": 12.7,
     "especies": [
      {
       "especie": "gula",
       "vie": 53,
       "sab": 64,
       "dom": 73,
       "media": 63,
       "pico_pct": 91,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 35,
       "sab": 29,
       "dom": 21,
       "media": 28,
       "pico_pct": 39,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 13,
       "sab": 16,
       "dom": 17,
       "media": 15,
       "pico_pct": 20,
       "pico_fecha": "16 nov"
      },
      {
       "especie": "boleto",
       "vie": 14,
       "sab": 7,
       "dom": 0,
       "media": 7,
       "pico_pct": 35,
       "pico_fecha": "26 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "A 1,15 km de Ríofabar alto: incumple la separación mínima de 1,2 km.",
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "alta",
     "incumple": [
      "distancia<1.2km"
     ]
    },
    {
     "id": "cuerrias-roble",
     "nombre": "Cuerrías (robledal)",
     "lat": 43.2757,
     "lon": -5.3318,
     "alt_m": 773,
     "orientacion": null,
     "bosque": "roble",
     "min_coche": 22,
     "km_villamayor": 9.6,
     "especies": [
      {
       "especie": "trompeta",
       "vie": 45,
       "sab": 37,
       "dom": 29,
       "media": 37,
       "pico_pct": 59,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 26,
       "sab": 28,
       "dom": 28,
       "media": 27,
       "pico_pct": 28,
       "pico_fecha": "14 nov"
      },
      {
       "especie": "boleto",
       "vie": 17,
       "sab": 9,
       "dom": 0,
       "media": 9,
       "pico_pct": 31,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "gula",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Robledal: sin gula.",
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "alta"
    }
   ]
  },
  {
   "id": "este",
   "nombre": "Este (Lago, Sebares, Carrio, Tospe)",
   "alt_rango": "255–734 m",
   "min_coche_rango": "22–29",
   "resumen": "Zona débil: solo 2 de 10 puntos son hayedo cartografiado. Dos sitios altos sin bosque cartografiado pero con gula 76–87 %.",
   "media": {
    "gula": [
     17,
     16,
     18,
     17,
     2
    ],
    "trompeta": [
     34,
     30,
     32,
     32,
     6
    ],
    "niscalo": [
     0,
     0,
     0,
     0,
     0
    ],
    "rebozuelo": [
     23,
     23,
     24,
     23,
     8
    ],
    "boleto": [
     2,
     1,
     0,
     1,
     1
    ]
   },
   "mezcla_bosque": "2 haya, 2 roble, 1 castaño, 2 otros, 3 sin arbolado cartografiado",
   "aviso": "Baja fiabilidad: en 2 de los 4 sitios el visor dice \"sin arbolado cartografiado en este punto\". Sirve de plan B más al este.",
   "sitios": [
    {
     "id": "lago",
     "nombre": "Lago (sin arbolado cartografiado)",
     "lat": 43.3254,
     "lon": -5.1759,
     "alt_m": 534,
     "orientacion": null,
     "bosque": "sin cartografiar",
     "min_coche": 29,
     "km_villamayor": 11.3,
     "especies": [
      {
       "especie": "gula",
       "vie": 85,
       "sab": 87,
       "dom": 90,
       "media": 87,
       "pico_pct": 94,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 63,
       "sab": 57,
       "dom": 67,
       "media": 62,
       "pico_pct": 70,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 29,
       "sab": 30,
       "dom": 30,
       "media": 30,
       "pico_pct": 31,
       "pico_fecha": "16 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Comprobado: 'sin arbolado cartografiado en este punto' y aun así gula 87 %. No fiable como sitio de gula. Punto cerca de borde de celda (534/612 m).",
     "afluencia_supuesta": "baja",
     "fiabilidad_punto": "baja"
    },
    {
     "id": "sebares",
     "nombre": "Montes de Sebares (sin arbolado cartografiado)",
     "lat": 43.3134,
     "lon": -5.2068,
     "alt_m": 734,
     "orientacion": null,
     "bosque": "sin cartografiar",
     "min_coche": 27,
     "km_villamayor": 9.6,
     "especies": [
      {
       "especie": "gula",
       "vie": 83,
       "sab": 76,
       "dom": 89,
       "media": 83,
       "pico_pct": 92,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "trompeta",
       "vie": 45,
       "sab": 37,
       "dom": 29,
       "media": 37,
       "pico_pct": 59,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 27,
       "sab": 29,
       "dom": 28,
       "media": 28,
       "pico_pct": 29,
       "pico_fecha": "14 nov"
      },
      {
       "especie": "boleto",
       "vie": 17,
       "sab": 9,
       "dom": 0,
       "media": 9,
       "pico_pct": 31,
       "pico_fecha": "11 nov"
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Comprobado: 'sin arbolado cartografiado en este punto' y aun así gula 76 %. No fiable como sitio de gula.",
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "baja"
    },
    {
     "id": "carrio",
     "nombre": "Carrio (castañar)",
     "lat": 43.3384,
     "lon": -5.1914,
     "alt_m": 287,
     "orientacion": null,
     "bosque": "castaño",
     "min_coche": 22,
     "km_villamayor": 9.6,
     "especies": [
      {
       "especie": "trompeta",
       "vie": 63,
       "sab": 57,
       "dom": 67,
       "media": 62,
       "pico_pct": 70,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 29,
       "sab": 30,
       "dom": 30,
       "media": 30,
       "pico_pct": 32,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "gula",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Altitud fuera de la de la gula.",
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "alta"
    },
    {
     "id": "tospe",
     "nombre": "Tospe (hayedo bajo)",
     "lat": 43.3279,
     "lon": -5.1965,
     "alt_m": 255,
     "orientacion": null,
     "bosque": "haya",
     "min_coche": 24,
     "km_villamayor": 9.6,
     "especies": [
      {
       "especie": "trompeta",
       "vie": 63,
       "sab": 57,
       "dom": 67,
       "media": 62,
       "pico_pct": 70,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "rebozuelo",
       "vie": 29,
       "sab": 30,
       "dom": 30,
       "media": 30,
       "pico_pct": 32,
       "pico_fecha": "17 nov"
      },
      {
       "especie": "gula",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "niscalo",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      },
      {
       "especie": "boleto",
       "vie": 0,
       "sab": 0,
       "dom": 0,
       "media": 0,
       "pico_pct": null,
       "pico_fecha": null
      }
     ],
     "nota": "Altitud fuera de la de la gula.",
     "afluencia_supuesta": "media",
     "fiabilidad_punto": "alta"
    }
   ]
  }
 ]
};
