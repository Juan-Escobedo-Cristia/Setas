# Setas L'Infiestu

Guía estática de zonas de setas. HTML + CSS + JS sin framework ni compilación. Diseño basado en el sistema de Airbnb (solo tema claro).

## Abrir
Doble clic en `index.html`. Necesita conexión para cargar la fuente Inter y el mapa (Leaflet y mapas de Esri); sin ella la fuente es la del sistema y el mapa pasa a un esquema sin relieve.

## Publicar
- **Netlify:** entra en app.netlify.com/drop y arrastra la carpeta del proyecto.
- **GitHub Pages:** sube los archivos a un repositorio, y en Settings → Pages elige la rama `main` y la carpeta `/ (root)`.

## Actualizar datos
Todo vive en `data.js`. No hay datos en el HTML ni en el JS. Estructura (v4):
- `meta`: versión, fecha de lectura (`fecha_lectura`), enlace al visor, `puntos_por_zona`, `aviso_limites`, `auditoria`.
- `especies_nombre`: nombres para mostrar. `especies`: fichas del catálogo (temporada, altitud, hábitat, agua). `clima` (con `fecha_clima`) y `agua_estimacion_propia`.
- `zonas[]`: `id`, `nombre`, `alt_rango`, `min_coche_rango`, `resumen`, `aviso`, `mezcla_bosque`, `media` por especie `[vie, sáb, dom, media, nº de puntos]` y `sitios[]` (siempre 4).
- `sitios[]`: coordenadas, altitud, orientación, bosque, `min_coche`, `km_villamayor`, `afluencia_supuesta`, `fiabilidad_punto`, `nota`, `incumple` y `especies[]` ya ordenadas de mayor a menor (`vie`, `sab`, `dom`, `media`, `pico_pct`, `pico_fecha`).

Para actualizar, pide a Claude Code que sustituya `data.js` con la nueva lectura. Enlaces directos a una zona: `#oeste`, `#sur`, `#riofabar`, `#este` (los antiguos `#sur-proximo`, `#sureste` y `#sur-alto` llevan a `#sur`).

## Imágenes
Cada tarjeta muestra un placeholder. Para poner foto, guarda un archivo `img/<id-de-zona>.jpg` (`oeste.jpg`, `sur.jpg`, `riofabar.jpg`, `este.jpg`). Si falta, se ve el placeholder. También puedes añadir `imagen: "ruta"` a una zona en `data.js`.

## Errores
Si `data.js` no tiene un campo obligatorio, la página muestra la lista de campos que faltan en vez de quedarse en blanco.
