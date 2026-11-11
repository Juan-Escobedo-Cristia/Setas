# Setas L'Infiestu

Guía estática de zonas de setas. HTML + CSS + JS sin framework ni compilación. Diseño basado en el sistema de Airbnb (solo tema claro).

## Abrir
Doble clic en `index.html`. Necesita conexión solo para cargar la fuente Inter; sin ella usa la fuente del sistema.

## Publicar
- **Netlify:** entra en app.netlify.com/drop y arrastra la carpeta del proyecto.
- **GitHub Pages:** sube los archivos a un repositorio, y en Settings → Pages elige la rama `main` y la carpeta `/ (root)`.

## Actualizar datos
Todo vive en `data.js`. No hay datos en el HTML ni en el JS. Para actualizar, pide a Claude Code que aplique el bloque JSON de la auditoría; solo cambia los campos que vengan en él.

## Imágenes
Cada tarjeta muestra un placeholder. Para poner foto, guarda un archivo `img/<id-de-zona>.jpg` (`oeste.jpg`, `sur-proximo.jpg`, `sur-alto.jpg`, `sueve.jpg`). Si falta, se ve el placeholder. También puedes añadir `imagen: "ruta"` a una zona en `data.js`.

## Errores
Si `data.js` no tiene un campo obligatorio, la página muestra la lista de campos que faltan en vez de quedarse en blanco.
