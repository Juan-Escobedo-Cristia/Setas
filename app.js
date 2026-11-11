(function () {
  'use strict';

  var D = window.SETALES_DATA;
  var app = document.getElementById('app');
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var NM = 'No medido';
  var MIN_SHOW = 10; // las setas con media por debajo de este % no se muestran en tarjetas ni en la media de la zona
  var HIGH = 50; // a partir de este % se resalta en Rausch

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function parseISO(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function fmtDate(s, long) {
    var d = parseISO(s);
    if (!d) return NM;
    return d.getDate() + ' ' + (long ? ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][d.getMonth()] + ' de ' + d.getFullYear() : MESES[d.getMonth()]);
  }
  function pct(v) { return isNum(v) ? Math.round(v) + '%' : NM; }
  // Tres niveles de énfasis: alto (acento), medio (tono suave), bajo (gris).
  function hi(v) { return !isNum(v) ? '' : v >= HIGH ? ' hi' : v >= 25 ? ' mid' : ' lo'; }
  function alt(a) { return Array.isArray(a) && isNum(a[0]) && isNum(a[1]) ? a[0].toLocaleString('es-ES') + '–' + a[1].toLocaleString('es-ES') + ' m' : NM; }
  function metros(v) { return isNum(v) ? v.toLocaleString('es-ES') + ' m' : NM; }
  function sp(id) { return (D.especies && D.especies[id]) || { nombre: id }; }
  function nombreEsp(id) { return (D.especies_nombre && D.especies_nombre[id]) || id; }
  function nPuntosZona(z) { return isNum(z.n_puntos) ? z.n_puntos : D.meta.puntos_por_zona; }
  function km(v) { return isNum(v) ? v.toLocaleString('es-ES') + ' km' : NM; }
  var DIAS = [['vie', 'Vie'], ['sab', 'Sáb'], ['dom', 'Dom']];
  // Especies de la zona de mayor a menor media (índice 3 de media: [vie, sáb, dom, media, nº de puntos con valor]).
  function zoneSpecies(z) {
    return Object.keys(z.media).map(function (k, i) { return { id: k, v: z.media[k], i: i }; })
      .filter(function (e) { return isNum(e.v[3]) && e.v[3] >= MIN_SHOW; })
      .sort(function (a, b) { return b.v[3] - a.v[3] || a.i - b.i; });
  }
  // "17 haya, 3 roble" -> "Bosque mixto de hayas y robles" (solo reformula mezcla_bosque).
  function forestText(m) {
    if (!m) return NM;
    var trees = [], sin = false;
    String(m).split(',').forEach(function (t) {
      var x = /^\s*\d+\s+(.+?)\s*$/.exec(t);
      if (!x) return;
      if (/^sin\b/i.test(x[1])) { sin = true; return; }
      trees.push(/s$/.test(x[1]) ? x[1] : x[1] + 's');
    });
    if (!trees.length) return String(m);
    var list = trees.length > 1 ? trees.slice(0, -1).join(', ') + ' y ' + trees[trees.length - 1] : trees[0];
    return (trees.length > 1 ? 'Bosque mixto de ' : 'Bosque de ') + list + (sin ? ', con puntos sin arbolado cartografiado' : '');
  }
  function lowFiab(z) { return z.sitios.some(function (p) { return p.fiabilidad_punto === 'baja'; }); }
  function val(v) { return v == null || v === '' ? NM : v; }
  function zIndex(z) { return D.zonas.indexOf(z); }
  function title(z) { return z.nombre.replace(/\s*\([^)]*\)\s*$/, '').trim(); }
  function subtitle(z) { var m = /\(([^)]*)\)\s*$/.exec(z.nombre); return m ? m[1] : ''; }

  /* ---------- validación ---------- */
  function validate() {
    var errs = [];
    if (!D || typeof D !== 'object') return ['No se encontró window.SETALES_DATA. Comprueba que data.js está junto a index.html.'];
    ['titulo', 'fuente_url', 'fecha_lectura', 'aviso_limites', 'puntos_por_zona'].forEach(function (k) {
      if (!D.meta || D.meta[k] == null) errs.push('Falta meta.' + k);
    });
    if (D.meta && D.meta.fecha_lectura && !parseISO(D.meta.fecha_lectura)) errs.push('meta.fecha_lectura debe tener formato AAAA-MM-DD');
    if (!D.clima || !D.clima.lluvia_mm || !D.clima.temp_media_c) errs.push('Falta clima.lluvia_mm o clima.temp_media_c');
    if (D.clima && D.clima.fecha_clima && !parseISO(D.clima.fecha_clima)) errs.push('clima.fecha_clima debe tener formato AAAA-MM-DD');
    if (!D.especies) errs.push('Falta especies');
    if (!D.especies_nombre) errs.push('Falta especies_nombre');
    if (!Array.isArray(D.zonas) || !D.zonas.length) { errs.push('Falta zonas (lista vacía)'); return errs; }
    D.zonas.forEach(function (z, i) {
      var w = 'zonas[' + i + ']' + (z && z.id ? ' (' + z.id + ')' : '');
      if (!z) { errs.push(w + ' vacía'); return; }
      ['id', 'nombre', 'alt_rango', 'min_coche_rango', 'resumen', 'aviso', 'mezcla_bosque', 'media', 'sitios'].forEach(function (k) {
        if (z[k] == null) errs.push(w + ': falta ' + k);
      });
      if (z.media) Object.keys(z.media).forEach(function (k) {
        if (!Array.isArray(z.media[k]) || z.media[k].length < 5) errs.push(w + '.media.' + k + ': debe ser [vie, sáb, dom, media, nº de puntos]');
        if (D.especies_nombre && !D.especies_nombre[k]) errs.push(w + ': la especie "' + k + '" no existe en especies_nombre');
      });
      if (z.sitios && (!Array.isArray(z.sitios) || !z.sitios.length)) errs.push(w + ': sitios está vacío');
      (z.sitios || []).forEach(function (p, j) {
        var ws = w + '.sitios[' + j + ']' + (p && p.id ? ' (' + p.id + ')' : '');
        ['id', 'nombre', 'lat', 'lon', 'alt_m', 'bosque', 'min_coche', 'km_villamayor', 'afluencia_supuesta', 'fiabilidad_punto', 'especies'].forEach(function (k) {
          if (p[k] === undefined) errs.push(ws + ': falta ' + k);
        });
        (p.especies || []).forEach(function (e, n) {
          ['especie', 'vie', 'sab', 'dom', 'media', 'pico_pct', 'pico_fecha'].forEach(function (k) {
            if (e[k] === undefined) errs.push(ws + '.especies[' + n + ']: falta ' + k);
          });
          if (e.especie && D.especies_nombre && !D.especies_nombre[e.especie]) errs.push(ws + ': la especie "' + e.especie + '" no existe en especies_nombre');
        });
      });
    });
    return errs;
  }

  /* ---------- piezas ---------- */
  var PH_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.7"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>';

  function photo(z) {
    return '<div class="ph">' + PH_SVG + '</div><img src="' + esc(z.imagen || 'img/' + z.id + '.jpg') + '" alt="" loading="lazy" onerror="this.remove()">';
  }
  // Etiqueta de zona: solo cuando algún sitio es de baja fiabilidad.
  function zoneBadge(z) {
    return lowFiab(z) ? '<span class="badge badge--alt">Baja fiabilidad</span>' : '';
  }

  function bar(name, v) {
    var t = pct(v);
    return '<div class="bar"><span class="bar__name">' + esc(name) + '</span>' +
      '<span class="bar__val' + hi(v) + (isNum(v) ? '' : ' nm') + '">' + t + '</span>' +
      '<div class="bar__track" role="img" aria-label="' + esc(name) + ': ' + (isNum(v) ? t + ' de probabilidad' : NM) + '"><div class="bar__fill' + hi(v) + '" style="width:' + (isNum(v) ? Math.max(0, Math.min(100, v)) : 0) + '%"></div></div></div>';
  }

  function cardHTML(z) {
    var objs = zoneSpecies(z).map(function (e) { return bar(nombreEsp(e.id), e.v[3]); }).join('');
    var sub = subtitle(z);
    return '<button type="button" class="card z' + zIndex(z) + '" data-zona="' + esc(z.id) + '" aria-expanded="false" aria-controls="panel">' +
      '<div class="card__photo">' + photo(z) + zoneBadge(z) + '</div>' +
      '<div class="card__meta"><div class="card__row"><h3 class="card__title">' + esc(title(z)) + '</h3>' +
      '<span class="card__alt"><i class="dot"></i>' + esc(val(z.alt_rango)) + '</span></div>' +
      (sub ? '<p class="card__sub">' + esc(sub) + '</p>' : '') +
      '<p class="card__sub">' + esc(val(z.min_coche_rango)) + ' min en coche</p>' +
      '<div class="card__species">' + objs + '</div></div></button>';
  }

  function coordText(p) { return p.lat.toFixed(4) + ', ' + p.lon.toFixed(4); }

  var CHEV = '<svg class="pt__chev" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>';

  function incumpleText(arr) {
    return 'Incumple: ' + arr.map(function (t) { return String(t).replace('<', ' < ').replace(/(\d)\.(\d)/g, '$1,$2').replace(/(\d)km/, '$1 km'); }).join(', ');
  }

  function siteHTML(p) {
    // Las especies con media 0 van al final (se mantiene el orden del array) y se atenúan.
    var esps = (p.especies || []).filter(function (e) { return !(isNum(e.media) && e.media === 0); })
      .concat((p.especies || []).filter(function (e) { return isNum(e.media) && e.media === 0; }));
    var reads = esps.map(function (e) {
      var zero = isNum(e.media) && e.media === 0;
      var dias = DIAS.map(function (d) { return d[1] + ' ' + pct(e[d[0]]); }).join(' · ');
      var pico = isNum(e.pico_pct) ? 'pico ' + pct(e.pico_pct) + (e.pico_fecha ? ' el ' + esc(e.pico_fecha) : '') : 'Sin pico';
      return '<div class="read' + (zero ? ' read--zero' : '') + '"><b>' + esc(nombreEsp(e.especie)) + '</b>' +
        '<span class="v' + hi(e.media) + (isNum(e.media) ? '' : ' nm') + '">' + pct(e.media) + '</span>' +
        '<span class="muted read__det">' + dias + ' · ' + pico + '</span></div>';
    }).join('');
    var c = coordText(p);
    var bosque = val(p.bosque);
    var resumen = metros(p.alt_m) + ' · ' + esc(bosque) + ' · Orientación: ' + esc(val(p.orientacion));
    var pid = 'pt-' + esc(p.id);
    var baja = p.fiabilidad_punto === 'baja';
    var inc = Array.isArray(p.incumple) && p.incumple.length;
    return '<li class="pt">' +
      '<button type="button" class="pt__head" data-acc aria-expanded="false" aria-controls="' + pid + '">' +
      '<span class="pt__main"><span class="pt__top"><span class="pt__name">' + esc(p.nombre) + '</span>' +
      (baja ? '<span class="pt__tag pt__tag--warn">Baja fiabilidad</span>' : '') +
      (inc ? '<span class="pt__tag">' + esc(incumpleText(p.incumple)) + '</span>' : '') + '</span>' +
      '<span class="pt__sum">' + resumen + '</span></span>' + CHEV + '</button>' +
      '<div class="pt__panel" id="' + pid + '"><div class="pt__inner">' +
      '<p class="pt__meta">' + (isNum(p.min_coche) ? p.min_coche + ' min en coche' : NM) + ' · ' + km(p.km_villamayor) + ' de Villamayor</p>' +
      '<p class="pt__meta">Afluencia: ' + esc(val(p.afluencia_supuesta)) + ' (suposición)</p>' +
      (p.nota ? '<p class="pt__note">' + esc(p.nota) + '</p>' : '') +
      '<div class="pt__reads">' + reads + '</div>' +
      '<div class="pt__coords">' + c + '</div>' +
      '<div class="pt__actions">' +
      '<a class="btn btn--soft btn--sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lon + '">Abrir Maps</a>' +
      '<button type="button" class="btn btn--text btn--sm" data-copy="' + c + '">Copiar coordenadas</button>' +
      '</div></div></div></li>';
  }

  function panelHTML(z) {
    var esp = zoneSpecies(z), N = nPuntosZona(z);

    var espHTML = esp.map(function (e) {
      var v = e.v, zero = isNum(v[3]) && v[3] === 0, n = v[4];
      return '<div class="sp' + (zero ? ' sp--zero' : '') + '"><div class="sp__top"><span class="sp__name">' + esc(nombreEsp(e.id)) + '</span>' +
        '<span class="sp__pct' + hi(v[3]) + (isNum(v[3]) ? '' : ' nm') + '">' + pct(v[3]) + '</span></div>' +
        '<div class="bar__track" role="img" aria-label="' + esc(nombreEsp(e.id)) + ': ' + pct(v[3]) + '"><div class="bar__fill' + hi(v[3]) + '" style="width:' + (isNum(v[3]) ? Math.min(100, v[3]) : 0) + '%"></div></div>' +
        (n === 1 ? '<span class="warn1">Dato de un solo punto</span>' : '') + '</div>';
    }).join('');

    // Qué necesita cada especie: las que tienen media por encima de 0 en la zona.
    var needs = esp.filter(function (e) { return isNum(e.v[3]) && e.v[3] > 0; }).map(function (e) {
      var s = sp(e.id), nid = 'need-' + esc(e.id);
      return '<div class="pt"><button type="button" class="pt__head" data-acc aria-expanded="false" aria-controls="' + nid + '">' +
        '<span class="pt__main"><span class="pt__top"><span class="pt__name">' + esc(s.nombre) + '</span>' + (s.cientifico ? '<i class="pt__sci">' + esc(s.cientifico) + '</i>' : '') + '</span>' +
        '<span class="pt__sum">Temporada: ' + esc(val(s.temporada)) + '</span></span>' + CHEV + '</button>' +
        '<div class="pt__panel" id="' + nid + '"><div class="pt__inner"><dl class="need__dl">' +
        '<dt>Altitud</dt><dd>' + alt(s.altitud_m) + '</dd>' +
        '<dt>Hábitat</dt><dd>' + esc(Array.isArray(s.habitat) ? s.habitat.join(', ') : val(s.habitat)) + '</dd>' +
        '<dt>Agua</dt><dd>' + esc(val(s.agua)) + '</dd></dl></div></div></div>';
    }).join('');

    var sub = subtitle(z);
    return '<span class="pbar__sentinel" aria-hidden="true"></span><div class="pbar">' +
      '<button type="button" class="btn--close" data-close aria-label="Cerrar panel"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg></button></div>' +
      '<div class="pcover z' + zIndex(z) + '">' + photo(z) + zoneBadge(z) + '</div>' +
      '<div class="pbody">' +
      '<div class="panel__head"><h2 id="panel-title">' + esc(title(z)) + '</h2>' + (sub ? '<p class="panel__places">' + esc(sub) + '</p>' : '') + '</div>' +
      '<p class="panel__sub">' + esc(forestText(z.mezcla_bosque)) + '</p>' +
      '<div class="panel__facts">' +
      '<div class="fact"><b>' + esc(val(z.alt_rango)) + '</b><span>Altitud</span></div>' +
      '<div class="fact"><b>' + esc(val(z.min_coche_rango)) + ' min</b><span>En coche</span></div>' +
      '<div class="fact"><b>' + N + '</b><span>Puntos medidos</span></div></div>' +
      '<p class="panel__aviso">' + esc(val(z.aviso)) + '</p>' +
      '<section class="psec"><h3>Media de la zona</h3><div class="sp-list">' + espHTML + '</div></section>' +
      '<section class="psec"><h3>Sitios</h3><ul class="pts">' + z.sitios.map(siteHTML).join('') + '</ul></section>' +
      '<section class="psec"><p class="wikiloc"><span class="wikiloc__ic" aria-hidden="true">↗</span>Para trazar la ruta en Wikiloc, marca estos sitios con las coordenadas.</p></section>' +
      '<section class="psec"><h3>Qué necesita cada especie</h3><div class="pts">' + needs + '</div></section></div>';
  }

  /* ---------- mapa SVG (sin tiles, proyección plana desde data.js) ---------- */
  function hull(pts) {
    pts = pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    if (pts.length < 3) return pts;
    function cross(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var lo = [], up = [], i;
    for (i = 0; i < pts.length; i++) { while (lo.length > 1 && cross(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 0) lo.pop(); lo.push(pts[i]); }
    for (i = pts.length - 1; i >= 0; i--) { while (up.length > 1 && cross(up[up.length - 2], up[up.length - 1], pts[i]) <= 0) up.pop(); up.push(pts[i]); }
    lo.pop(); up.pop();
    return lo.concat(up);
  }

  function mapHTML() {
    var K = 30, PAD = 4.5, BLOB = 2.4; // px/km, margen km, radio de mancha km
    var all = [];
    D.zonas.forEach(function (z) { z.sitios.forEach(function (p) { if (isNum(p.lat) && isNum(p.lon)) all.push(p); }); });
    if (!all.length) return '';
    var lat0 = Math.min.apply(null, all.map(function (p) { return p.lat; }));
    var lat1 = Math.max.apply(null, all.map(function (p) { return p.lat; }));
    var lon0 = Math.min.apply(null, all.map(function (p) { return p.lon; }));
    var lon1 = Math.max.apply(null, all.map(function (p) { return p.lon; }));
    var kx = 111.32 * Math.cos(((lat0 + lat1) / 2) * Math.PI / 180), ky = 110.57;
    function X(lon) { return ((lon - lon0) * kx + PAD) * K; }
    function Y(lat) { return ((lat1 - lat) * ky + PAD) * K; }
    var W = Math.round(((lon1 - lon0) * kx + 2 * PAD) * K), H = Math.round(((lat1 - lat0) * ky + 2 * PAD) * K);

    var g = '';
    // retícula tenue cada 0,05°
    var v, step = 0.05;
    for (v = Math.ceil(lon0 / step) * step; v <= lon1 + 1e-9; v += step) g += '<line x1="' + X(v).toFixed(1) + '" y1="0" x2="' + X(v).toFixed(1) + '" y2="' + H + '"/>';
    for (v = Math.ceil(lat0 / step) * step; v <= lat1 + 1e-9; v += step) g += '<line x1="0" y1="' + Y(v).toFixed(1) + '" x2="' + W + '" y2="' + Y(v).toFixed(1) + '"/>';
    var grid = '<g class="m-grid">' + g + '</g>';

    var zones = D.zonas.map(function (z) {
      var px = z.sitios.map(function (p) { return [X(p.lon), Y(p.lat)]; });
      var h = hull(px);
      var cx = px.reduce(function (s, p) { return s + p[0]; }, 0) / px.length;
      var cy = px.reduce(function (s, p) { return s + p[1]; }, 0) / px.length;
      var shape = h.length >= 3 ? '<polygon points="' + h.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"' :
        '<polyline points="' + h.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"';
      shape += ' class="blob" stroke-width="' + (BLOB * 2 * K) + '" stroke-linejoin="round" stroke-linecap="round"/>';
      var dots = z.sitios.map(function (p) {
        var x = X(p.lon).toFixed(1), y = Y(p.lat).toFixed(1);
        return '<circle class="m-pt" cx="' + x + '" cy="' + y + '" r="5.5"><title>' + esc(p.nombre) + '</title></circle>';
      }).join('');
      // La etiqueta va bajo la mancha para no tapar los puntos.
      var maxY = Math.max.apply(null, px.map(function (p) { return p[1]; }));
      var ly = Math.min(H - 16, maxY + BLOB * K + 22);
      return '<g class="mz z' + zIndex(z) + '" data-zona="' + esc(z.id) + '" role="button" tabindex="0" aria-expanded="false" aria-controls="panel" aria-label="Abrir zona ' + esc(title(z)) + '">' +
        '<g class="blobs">' + shape + '</g>' + dots +
        '<text x="' + cx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle">' + esc(title(z)) + '</text></g>';
    }).join('');

    var scale = '<g class="m-scale" transform="translate(' + (PAD * K * .5) + ' ' + (H - 26) + ')"><path d="M0 0v8h' + (5 * K) + 'v-8"/><text x="' + (5 * K / 2) + '" y="-5" text-anchor="middle">5 km</text></g>';
    var north = '<g class="m-north" transform="translate(' + (W - 30) + ' 34)"><path d="M0 -14l7 20l-7 -5l-7 5z"/><text y="26" text-anchor="middle">N</text></g>';

    return '<figure class="map"><svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Mapa esquemático de las zonas">' +
      grid + zones + scale + north + '</svg>' +
      '<figcaption>Esquema a partir de las coordenadas de los sitios. No muestra relieve ni caminos.</figcaption></figure>';
  }

  /* ---------- mapa real (Leaflet + teselas CARTO/OSM); si no carga, se usa el SVG ---------- */
  var ZCOL = ['#2f9e6f', '#e0873a', '#7a5fc4', '#d6577a'];
  var leaflet = { zones: {} };

  function bufferedZone(z) {
    var R = 2.4, N = 20, pts = [];
    var ref = z.sitios;
    ref.forEach(function (p) {
      var dlat = R / 110.57, dlon = R / (111.32 * Math.cos(p.lat * Math.PI / 180));
      for (var i = 0; i < N; i++) {
        var a = 2 * Math.PI * i / N;
        pts.push([p.lon + dlon * Math.cos(a), p.lat + dlat * Math.sin(a)]);
      }
    });
    var h = hull(pts).map(function (q) { return [q[1], q[0]]; });
    var c = ref.reduce(function (s, p) { return [s[0] + p.lat / ref.length, s[1] + p.lon / ref.length]; }, [0, 0]);
    return { ring: h, center: c };
  }

  function initLeaflet() {
    var el = document.getElementById('map');
    if (!el || !window.L) return false;
    var L = window.L;
    var map = L.map(el, { zoomControl: true, scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false, attributionControl: true });
    // Mapa gris claro con relieve suave (Esri, sin clave ni referer, así que funciona también abriendo index.html como archivo).
    // Los tiles ya vienen grises: sin filtros CSS ni mezclas, que hacen pesado el scroll en móvil.
    var ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
    function pane(name, z) { var p = map.createPane(name); p.style.zIndex = z; return p; }
    pane('tBase', 200); pane('tHill', 210); pane('tLabels', 230);
    L.tileLayer(ESRI + 'Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', { pane: 'tBase', maxNativeZoom: 16, maxZoom: 16 }).addTo(map);
    L.tileLayer(ESRI + 'Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}', { pane: 'tHill', maxNativeZoom: 15, maxZoom: 16, opacity: .3 }).addTo(map);
    L.tileLayer(ESRI + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      pane: 'tLabels', maxNativeZoom: 15, maxZoom: 16, opacity: .75,
      attribution: 'Tiles © Esri — Esri, HERE, Garmin, USGS, NGA, OpenStreetMap contributors'
    }).addTo(map);

    var all = [];
    D.zonas.forEach(function (z) {
      var col = ZCOL[zIndex(z) % ZCOL.length];
      var b = bufferedZone(z);
      var poly = L.polygon(b.ring, { color: col, weight: 2, opacity: .85, fillColor: col, fillOpacity: .22, lineJoin: 'round' }).addTo(map);
      poly.on('click', function () { toggle(z.id); });
      poly.on('mouseover', function () { if (current !== z.id) poly.setStyle({ fillOpacity: .36 }); });
      poly.on('mouseout', function () { styleZone(z.id); });
      all = all.concat(b.ring);
      var icon = L.divIcon({ className: 'zl', html: '<span>' + esc(title(z)) + '</span>', iconSize: [0, 0] });
      // La etiqueta se ancla al borde sur de la zona para no tapar los puntos.
      var south = Math.min.apply(null, b.ring.map(function (q) { return q[0]; }));
      var label = L.marker([south, b.center[1]], { icon: icon, keyboard: false }).addTo(map);
      label.on('click', function () { toggle(z.id); });
      z.sitios.forEach(function (p) {
        var m = L.circleMarker([p.lat, p.lon], { radius: 4, color: '#222', weight: 2, fillColor: '#fff', fillOpacity: 1 });
        m.bindTooltip(esc(p.nombre), { direction: 'top', offset: [0, -6] });
        m.on('click', function () { toggle(z.id); });
        m.addTo(map);
      });
      leaflet.zones[z.id] = { poly: poly, label: label, col: col };
    });
    map.fitBounds(all, { padding: [12, 12] });
    leaflet.map = map;
    return true;
  }

  function styleZone(id) {
    var o = leaflet.zones[id];
    if (!o) return;
    var on = id === current;
    o.poly.setStyle({ fillOpacity: on ? .5 : .22, weight: on ? 3 : 2, opacity: on ? 1 : .85 });
    var e = o.label.getElement();
    if (e) e.classList.toggle('on', on);
  }

  /* ---------- página ---------- */
  function statRow(label, o, unit) {
    return '<div class="clima__row-label">' + label + '</div>' +
      ['d7', 'd15', 'd30', 'd60'].map(function (k) {
        return '<div class="stat"><b>' + (isNum(o[k]) ? String(o[k]).replace('.', ',') : NM) + (isNum(o[k]) ? '<small>' + unit + '</small>' : '') + '</b><span>' + k.slice(1) + ' días</span></div>';
      }).join('');
  }

  // Entrada de la cabecera y aparición de tarjetas al llegar a ellas (solo transform y opacity).
  function motion() {
    Array.prototype.forEach.call(app.querySelectorAll('.hero__text > *, .hero__map, .clima'), function (el, i) {
      el.classList.add('rise');
      el.style.setProperty('--i', i);
    });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        el.classList.add('in');
        setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--i'); }, 1200);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(app.querySelectorAll('.card, .section__head'), function (el) {
      var sibs = el.parentNode.querySelectorAll('.card, .section__head');
      el.style.setProperty('--i', Array.prototype.indexOf.call(sibs, el) % 3);
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  function render() {
    var m = D.meta, c = D.clima;
    document.title = m.titulo;
    document.getElementById('wordmark').textContent = m.titulo;
    document.getElementById('visor-link').href = m.fuente_url;

    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    var dias = Math.round((hoy - parseISO(m.fecha_lectura)) / 86400000);
    var stale = dias > 2;
    var nSitios = D.zonas.reduce(function (s, z) { return s + z.sitios.length; }, 0);

    var html =
      '<div class="hero">' +
      '<div class="hero__text"><h1>Zonas para buscar setas en <em>' + esc((m.base || '').replace(/\s*\([^)]*\)/g, '')) + '</em></h1>' +
      '<p class="hero__lead">Toca una zona en el mapa o en las tarjetas para ver sus sitios, las especies y cómo montar la ruta.</p>' +
      '<div class="pill" role="group" aria-label="Resumen de la guía">' +
      '<div class="pill__seg"><b>' + fmtDate(m.fecha_lectura) + '</b><span>Lectura</span></div>' +
      '<div class="pill__seg"><b>' + D.zonas.length + '</b><span>Zonas</span></div>' +
      '<div class="pill__seg"><b>' + nSitios + '</b><span>Sitios</span></div>' +
      '</div>' +
      '<div class="notice' + (stale ? ' notice--stale' : '') + '" role="' + (stale ? 'alert' : 'note') + '"><span class="notice__dot"></span><div>' +
      (stale ? '<strong>Datos desactualizados: comprueba el visor.</strong> Lectura del ' + fmtDate(m.fecha_lectura, true) + ' (hace ' + dias + ' días). ' : '<strong>Lectura del ' + fmtDate(m.fecha_lectura, true) + '.</strong> ') +
      'Son datos de un modelo y cambian cada día. <a href="' + esc(m.fuente_url) + '" target="_blank" rel="noopener">Ver el visor</a></div></div></div>' +

      '<div class="hero__map">' + (window.L ?
        '<figure class="map map--live"><div id="map" role="region" aria-label="Mapa de las zonas. Las tarjetas de abajo hacen lo mismo con teclado."></div>' +
        '<figcaption>Las zonas son áreas orientativas alrededor de los sitios medidos, no límites reales de bosque.</figcaption></figure>' : mapHTML()) + '</div>' +

      '<section class="clima" aria-labelledby="clima-t"><div class="clima__head"><h2 id="clima-t">Clima de referencia</h2>' +
      '<span>' + esc(c.punto_referencia ? c.punto_referencia.nombre + (isNum(c.punto_referencia.alt_m) ? ', ' + c.punto_referencia.alt_m + ' m' : '') + (c.punto_referencia.orientacion ? ', ' + c.punto_referencia.orientacion : '') : '') + '</span>' +
      (c.fecha_clima ? '<span class="clima__date">Clima del ' + fmtDate(c.fecha_clima) + '</span>' : '') + '</div>' +
      '<div class="clima__grid">' + statRow('Lluvia acumulada', c.lluvia_mm, ' mm') + statRow('Temperatura media', c.temp_media_c, ' °C') + '</div>' +
      (c.prevision ? '<p class="clima__forecast"><strong>Previsión:</strong> ' + (isNum(c.prevision.lluvia_mm) ? String(c.prevision.lluvia_mm).replace('.', ',') + ' mm' : NM) + ' el ' + fmtDate(c.prevision.fecha) + (c.prevision.nota ? '. ' + esc(c.prevision.nota) : '') + '</p>' : '') +
      ((c.notas && c.notas.length) ? '<div class="clima__notes">' + c.notas.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('') + '</div>' : '') +
      '</section></div>' +

      '<section class="section" id="zonas"><div class="section__head"><h2>Zonas</h2></div>' +
      '<div class="grid" data-grid>' + D.zonas.map(cardHTML).join('') + '</div></section>';

    app.innerHTML = html.replace('</section></div><section class="section" id="zonas">', '</section></div><section class="section" id="zonas">');

    var f = '<div class="footer__cols"><div><h2>Límites de estos datos</h2><ul>' +
      m.aviso_limites.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' +
      (D.agua_estimacion_propia ? '<p style="margin-top:12px"><strong>Agua necesaria:</strong> ' + esc(D.agua_estimacion_propia) + '</p>' : '') + '</div>' +
      '<div><h2>Fuentes</h2><ul>' +
      '<li><a href="' + esc(m.fuente_url) + '" target="_blank" rel="noopener">Visor de predicción de sporas.io</a> (v' + esc(m.visor || '') + ')</li>' +
      '<li><a href="https://sporas.io/visor/catalogo" target="_blank" rel="noopener">Catálogo de especies de sporas.io</a></li></ul>' +
      '<p style="margin-top:12px">Datos versión ' + esc(m.version_datos) + '.' + (m.dia_base ? ' Día base: ' + esc(m.dia_base) + '.' : '') + '</p></div></div>';
    document.getElementById('footer').innerHTML = f;

    var panel = document.createElement('section');
    panel.id = 'panel'; panel.className = 'panel'; panel.hidden = true;
    panel.setAttribute('role', 'region'); panel.setAttribute('aria-labelledby', 'panel-title'); panel.tabIndex = -1;
    app._panel = panel;
    var t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
    app._toast = t;
    motion();
    if (window.L) { try { initLeaflet(); } catch (e) { var f2 = app.querySelector('.hero__map'); if (f2) f2.innerHTML = mapHTML(); } }
  }

  /* ---------- interacción ---------- */
  var current = null;

  function sync() {
    app.classList.toggle('has-open', !!current);
    Array.prototype.forEach.call(app.querySelectorAll('[data-zona]'), function (el) {
      var on = el.getAttribute('data-zona') === current;
      el.setAttribute('aria-expanded', on ? 'true' : 'false');
      el.classList.toggle('on', on);
    });
    Object.keys(leaflet.zones).forEach(styleZone);
  }

  // Cierre manual: el panel se desvanece un instante y después se pliega (con la posición de scroll conservada).
  var closingTok = 0;
  function closePanel(updateHash) {
    if (!current) return;
    var p = app._panel;
    if (p.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) { finishClose(updateHash); return; }
    if (p.classList.contains('closing')) return;
    var tok = ++closingTok, id = current;
    p.classList.add('closing');
    setTimeout(function () {
      if (tok !== closingTok || current !== id) return;
      p.classList.remove('closing');
      finishClose(updateHash);
    }, 190);
  }

  function reappear(card) {
    if (!card) return;
    card.classList.add('reappear');
    setTimeout(function () { card.classList.remove('reappear'); }, 450);
  }

  function finishClose(updateHash) {
    var card = current && app.querySelector('.card[data-zona="' + current + '"]'); app.querySelector('.card[data-zona="' + current + '"]');
    var p = app._panel, pr = p.getBoundingClientRect(), navH = document.querySelector('.top-nav').offsetHeight;
    // Al cerrar, la página se acorta: se conserva lo que el usuario estaba viendo en vez de dejarlo al final.
    var mode = 'card', anchor = null, before = 0;
    if (pr.top >= navH) mode = 'top';
    else if (pr.bottom > navH && pr.bottom < window.innerHeight * 1.5) {
      for (var n = p.nextElementSibling; n; n = n.nextElementSibling) { if (n.classList.contains('card') && n !== card) { anchor = n; break; } }
      if (anchor) { mode = 'anchor'; before = anchor.getBoundingClientRect().top; }
    }
    var topBefore = pr.top;
    if (stuckIO) stuckIO.disconnect();
    if (viewIO) viewIO.disconnect();
    p.hidden = true;
    current = null;
    reappear(card);
    sync();
    if (card) {
      var y = window.pageYOffset;
      if (mode === 'top') y += card.getBoundingClientRect().top - topBefore;
      else if (mode === 'anchor') y += anchor.getBoundingClientRect().top - before;
      else y += card.getBoundingClientRect().top - (navH + 16);
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
    if (updateHash !== false) {
      if (card) card.focus({ preventScroll: true });
      if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    }
  }

  // Se mide con todas las tarjetas visibles; la tarjeta abierta se oculta y su panel ocupa su lugar al inicio de la fila.
  function placePanel(id) {
    var card = app.querySelector('.card[data-zona="' + id + '"]');
    var p = app._panel, wasHidden = p.hidden;
    p.classList.add('static');
    p.hidden = true;
    current = null;
    sync();
    var cards = Array.prototype.slice.call(card.parentNode.querySelectorAll('.card'));
    var top = card.offsetTop, first = card;
    cards.slice().reverse().forEach(function (c) { if (Math.abs(c.offsetTop - top) < 4) first = c; });
    first.insertAdjacentElement('beforebegin', p);
    current = id;
    sync();
    p.hidden = wasHidden;
  }

  function openZone(id, scroll) {
    var z = D.zonas.filter(function (x) { return x.id === id; })[0];
    var card = app.querySelector('.card[data-zona="' + id + '"]');
    if (!z || !card) return false;
    closingTok++; pendingClose = false;
    app._panel.classList.remove('closing');
    var navH = document.querySelector('.top-nav').offsetHeight;
    var before = card.getBoundingClientRect();
    var visible = before.bottom > navH && before.top < window.innerHeight;
    placePanel(id);
    app._panel.innerHTML = panelHTML(z);
    app._panel.className = 'panel z' + zIndex(z);
    app._panel.hidden = false;
    watchStuck();
    watchVisible();

    if (scroll) {
      if (visible) {
        // La tarjeta ya se veía: el panel se abre en el mismo punto de la pantalla, sin mover la página.
        // (Se mide la posición de diseño, sin la animación de entrada.)
        var y = 0, el = app._panel;
        while (el) { y += el.offsetTop; el = el.offsetParent; }
        var d = (y - window.pageYOffset) - before.top;
        if (Math.abs(d) > 1) window.scrollBy({ top: d, behavior: 'instant' });
      } else {
        // Abierta desde el mapa o un enlace: la tarjeta no estaba a la vista, así que se baja hasta ella.
        var target = app._panel.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({ top: Math.max(0, target), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
    return true;
  }

  // La barra del panel (cerrar) se queda fija bajo la cabecera y cobra fondo al despegarse de la imagen.
  // Se vigila con un IntersectionObserver (más fiable que escuchar scroll durante el impulso del dedo en móvil).
  var stuckIO;
  function watchStuck() {
    if (stuckIO) stuckIO.disconnect();
    var p = app._panel, s = p.querySelector('.pbar__sentinel');
    if (!s || !('IntersectionObserver' in window)) return;
    var navH = document.querySelector('.top-nav').offsetHeight;
    stuckIO = new IntersectionObserver(function (es) {
      var e = es[es.length - 1];
      p.classList.toggle('is-stuck', !e.isIntersecting && e.boundingClientRect.top < navH);
    }, { rootMargin: '-' + navH + 'px 0px 0px 0px' });
    stuckIO.observe(s);
  }

  // Si la tarjeta abierta sale por completo de la pantalla (arriba o abajo), se cierra sola.
  // - Solo se activa después de haberla visto, para no cerrarla mientras el scroll suave aún la está acercando.
  // - Espera a que el scroll se asiente y el dedo se levante: en móvil, cambiar la altura de la página en pleno
  //   impulso hace que el navegador ignore la compensación y te lleve al final.
  var viewIO, pendingClose = false, settleT, touching = false;
  function watchVisible() {
    if (viewIO) viewIO.disconnect();
    pendingClose = false;
    var p = app._panel;
    if (!('IntersectionObserver' in window)) return;
    var navH = document.querySelector('.top-nav').offsetHeight, seen = false;
    viewIO = new IntersectionObserver(function (es) {
      if (p.hidden || !current) return;
      var e = es[es.length - 1];
      if (e.isIntersecting) { seen = true; pendingClose = false; return; }
      if (seen) { pendingClose = true; settle(); }
    }, { rootMargin: '-' + navH + 'px 0px 0px 0px' });
    viewIO.observe(p);
  }

  function settle() {
    clearTimeout(settleT);
    settleT = setTimeout(function () {
      if (!pendingClose || !current) return;
      if (touching) { settle(); return; }
      var p = app._panel, r = p.getBoundingClientRect(), navH = document.querySelector('.top-nav').offsetHeight;
      pendingClose = false;
      if (r.bottom > navH && r.top < window.innerHeight) return; // volvió a verse
      autoClose();
    }, 180);
  }
  window.addEventListener('scroll', function () { if (pendingClose) settle(); }, { passive: true });
  window.addEventListener('touchstart', function () { touching = true; }, { passive: true });
  window.addEventListener('touchend', function () { touching = false; }, { passive: true });
  window.addEventListener('touchcancel', function () { touching = false; }, { passive: true });

  function autoClose() {
    closingTok++;
    var p = app._panel, above = p.getBoundingClientRect().bottom <= 0, anchor = null, before = 0;
    var active = app.querySelector('.card.on');
    if (above) {
      // El panel queda por encima: al cerrarlo el contenido de debajo sube, así que se compensa el scroll.
      for (var n = p.nextElementSibling; n; n = n.nextElementSibling) { if (n.classList.contains('card') && n !== active) { anchor = n; break; } }
      anchor = anchor || document.querySelector('.footer');
      before = anchor.getBoundingClientRect().top;
    }
    if (stuckIO) stuckIO.disconnect();
    if (viewIO) viewIO.disconnect();
    p.hidden = true;
    current = null;
    reappear(active);
    sync();
    if (above && anchor) window.scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: 'instant' });
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  }

  function toggle(id) {
    if (current === id) { closePanel(); return; }
    history.replaceState(null, '', '#' + id);
    openZone(id, true);
  }

  var toastTimer;
  function toast(msg) {
    app._toast.textContent = msg;
    app._toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { app._toast.classList.remove('on'); }, 1800);
  }

  function copy(text, btn) {
    function ok() {
      var old = btn.textContent;
      btn.textContent = 'Copiado';
      btn.classList.add('pulse'); setTimeout(function () { btn.classList.remove('pulse'); }, 400);
      toast('Coordenadas copiadas: ' + text);
      setTimeout(function () { btn.textContent = old; }, 1500);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;opacity:0';
      document.body.appendChild(ta); ta.select();
      var done = false;
      try { done = document.execCommand('copy'); } catch (e) { done = false; }
      document.body.removeChild(ta);
      if (done) ok(); else window.prompt('Copia las coordenadas:', text);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
  }

  // Enlaces antiguos (#sur-proximo, #sureste, #sur-alto) llevan a #sur.
  var LEGACY = { 'sur-proximo': 'sur', 'sureste': 'sur', 'sur-alto': 'sur' };
  function hashId() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (LEGACY[id]) { id = LEGACY[id]; history.replaceState(null, '', location.pathname + location.search + '#' + id); }
    return id;
  }

  function bind() {
    app.addEventListener('click', function (e) {
      var z = e.target.closest('.card, .mz');
      if (z && app.contains(z)) { toggle(z.getAttribute('data-zona')); return; }
      var ac = e.target.closest('[data-acc]');
      if (ac) {
        var open = ac.getAttribute('aria-expanded') !== 'true';
        ac.setAttribute('aria-expanded', open ? 'true' : 'false');
        ac.parentNode.classList.toggle('open', open);
        return;
      }
      var cp = e.target.closest('[data-copy]');
      if (cp) { copy(cp.getAttribute('data-copy'), cp); return; }
      if (e.target.closest('[data-close]')) closePanel();
    });
    app.addEventListener('keydown', function (e) {
      var mz = e.target.closest && e.target.closest('.mz');
      if (mz && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(mz.getAttribute('data-zona')); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && current) closePanel(); });
    window.addEventListener('hashchange', function () {
      var id = hashId();
      if (!id) { if (current) closePanel(false); return; }
      if (id !== current) openZone(id, true);
    });
    // Solo si cambia el ancho (giro, ventana): en móvil, la barra del navegador al hacer scroll también dispara 'resize'
    // y no debe tocar el panel abierto. Se recoloca sin volver a pintarlo, para no cerrar sus desplegables.
    var rz, lastW = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(rz);
      rz = setTimeout(function () { if (current) placePanel(current); }, 150);
    });
    if (location.hash) openZone(hashId(), true);
  }

  /* ---------- arranque ---------- */
  var errs = validate();
  if (errs.length) {
    app.innerHTML = '<div class="error-box" role="alert"><strong>No se pueden mostrar los datos.</strong><ul>' +
      errs.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul><p style="margin-top:12px">Revisa data.js.</p></div>';
    return;
  }
  render();
  bind();
})();
