/* ==========================================================================
   Kallpa Greenz · main.js (un solo archivo, se carga con defer, sin dependencias)
   1. Analítica (GA4 y píxel de Meta) + eventos con data-track
   2. Menú móvil
   3. Galería de fotos
   4. Formulario de cotización → WhatsApp
   5. Copiar datos de contacto
   6. Libro de Reclamaciones
   ========================================================================== */
(function () {
  'use strict';

  /* Número de WhatsApp de ventas (solo dígitos, con código de país).
     Si cambia, reemplázalo también en todas las páginas .html (ver COMO-PUBLICAR.md). */
  var WHATSAPP = '51953782042';
  var CORREO = 'company@kgreenzleaders.com';

  /* ------------------------------------------------------------------------
     1. ANALÍTICA
     Pega los IDs entre las comillas. Mientras estén vacíos no se carga nada.
     ------------------------------------------------------------------------ */
  var GA4_ID = '';        // [PENDIENTE: ID] de Google Analytics 4, por ejemplo 'G-ABC123XYZ9'
  var META_PIXEL_ID = ''; // [PENDIENTE: ID] del píxel de Meta, por ejemplo '123456789012345'

  function cargarAnalitica() {
    if (GA4_ID) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', GA4_ID);
    }
    if (META_PIXEL_ID) {
      /* Código oficial del píxel de Meta */
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }

  /* Envía un evento a GA4 y Meta (si están activos) y lo deja en dataLayer. */
  function registrar(nombre, datos) {
    datos = datos || {};
    datos.pagina = location.pathname;
    try { if (window.gtag) window.gtag('event', nombre, datos); } catch (e) { /* sin analítica */ }
    try { if (window.fbq) window.fbq('trackCustom', nombre, datos); } catch (e) { /* sin analítica */ }
    window.dataLayer = window.dataLayer || [];
    var copia = { event: nombre };
    for (var k in datos) { if (Object.prototype.hasOwnProperty.call(datos, k)) copia[k] = datos[k]; }
    window.dataLayer.push(copia);
  }

  /* Lee el código "Ref: WEB-..." del mensaje prellenado de un enlace wa.me */
  function refDeEnlace(href) {
    if (!href || href.indexOf('wa.me/') === -1) return '';
    try {
      var texto = decodeURIComponent((href.split('text=')[1] || '').replace(/\+/g, ' '));
      var m = texto.match(/Ref:\s*([A-Z0-9-]+)/);
      return m ? m[1] : '';
    } catch (e) { return ''; }
  }

  /* Cualquier elemento con data-track="nombre_evento" registra ese evento al hacer clic.
     Parámetros opcionales: data-ref (origen) y data-modelo.
     Los enlaces a wa.me sin data-track registran click_whatsapp automáticamente. */
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-track], a[href*="wa.me/"]');
    if (!el) return;
    var nombre = el.getAttribute('data-track') || 'click_whatsapp';
    var datos = {};
    var origen = el.getAttribute('data-ref') || refDeEnlace(el.getAttribute('href'));
    if (origen) datos.origen = origen;
    var modelo = el.getAttribute('data-modelo');
    if (modelo) datos.modelo = modelo;
    registrar(nombre, datos);
  });

  cargarAnalitica();

  /* Aviso accesible (lo leen los lectores de pantalla) */
  function avisar(texto) {
    var zona = document.getElementById('aviso');
    if (!zona) return;
    zona.textContent = '';
    window.setTimeout(function () { zona.textContent = texto; }, 60);
  }

  /* ------------------------------------------------------------------------
     2. MENÚ MÓVIL
     ------------------------------------------------------------------------ */
  var cabecera = document.querySelector('.site-header');
  var botonMenu = document.getElementById('menu-btn');
  if (cabecera && botonMenu) {
    var etiqueta = botonMenu.querySelector('.menu-label');
    var ponerMenu = function (abierto) {
      botonMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      cabecera.classList.toggle('is-open', abierto);
      if (etiqueta) etiqueta.textContent = abierto ? 'Cerrar' : 'Menú';
    };
    botonMenu.addEventListener('click', function () {
      ponerMenu(botonMenu.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && botonMenu.getAttribute('aria-expanded') === 'true') {
        ponerMenu(false);
        botonMenu.focus();
      }
    });
    cabecera.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () { ponerMenu(false); });
    });
  }

  /* Marca la página actual en el menú (la cabecera es idéntica en todas las páginas) */
  function normalizar(ruta) {
    return (ruta || '/').replace(/index(\.html)?$/, '').replace(/\.html$/, '').replace(/\/+$/, '').split('/').pop() || 'inicio';
  }
  var actual = normalizar(location.pathname);
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var destino = normalizar(new URL(a.getAttribute('href'), location.href).pathname);
    if (destino === actual) a.setAttribute('aria-current', 'page');
  });

  /* ------------------------------------------------------------------------
     3. GALERÍA (catálogo de invernaderos)
     Cada miniatura trae data-webp, data-jpg, data-alt, data-w y data-h.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-gallery]').forEach(function (galeria) {
    var principal = galeria.querySelector('.gallery-main img');
    var fuente = galeria.querySelector('.gallery-main source');
    var botones = galeria.querySelectorAll('.thumbs button');
    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        if (fuente) fuente.srcset = b.getAttribute('data-webp');
        principal.src = b.getAttribute('data-jpg');
        principal.alt = b.getAttribute('data-alt');
        principal.width = +b.getAttribute('data-w');
        principal.height = +b.getAttribute('data-h');
        botones.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      });
    });
  });

  /* ------------------------------------------------------------------------
     Utilidades de formularios: errores junto a cada campo
     ------------------------------------------------------------------------ */
  function marcarError(campo, mensaje) {
    var caja = document.getElementById('err-' + campo.id);
    if (!caja) return;
    if (mensaje) {
      campo.setAttribute('aria-invalid', 'true');
      caja.querySelector('span').textContent = mensaje;
      caja.hidden = false;
    } else {
      campo.removeAttribute('aria-invalid');
      caja.hidden = true;
    }
  }

  function validarFormulario(form, reglas) {
    var primero = null;
    reglas.forEach(function (r) {
      var campo = form.querySelector('#' + r.id);
      if (!campo) return;
      var error = r.prueba(campo) ? '' : r.mensaje;
      marcarError(campo, error);
      if (error && !primero) primero = campo;
    });
    if (primero) primero.focus();
    return !primero;
  }

  function limpiarAlEscribir(form, reglas) {
    reglas.forEach(function (r) {
      var campo = form.querySelector('#' + r.id);
      if (!campo) return;
      var evento = (campo.tagName === 'SELECT' || campo.type === 'checkbox') ? 'change' : 'input';
      campo.addEventListener(evento, function () {
        if (campo.getAttribute('aria-invalid') === 'true' && r.prueba(campo)) marcarError(campo, '');
      });
    });
  }

  var lleno = function (c) { return c.value.trim().length > 0; };
  var valorDe = function (form, id) { var c = form.querySelector('#' + id); return c ? c.value.trim() : ''; };
  var textoOpcion = function (form, id) { var c = form.querySelector('#' + id); return c && c.selectedIndex > 0 ? c.options[c.selectedIndex].text : ''; };

  /* ------------------------------------------------------------------------
     4. FORMULARIO DE COTIZACIÓN → WHATSAPP (Ref: WEB-FORM)
     ------------------------------------------------------------------------ */
  var formCotizar = document.getElementById('form-cotizar');
  if (formCotizar) {
    var reglasCotizar = [
      { id: 'c-nombre', prueba: lleno, mensaje: 'Escribe tu nombre.' },
      { id: 'c-interes', prueba: lleno, mensaje: 'Elige qué te interesa.' },
      { id: 'c-cultivo', prueba: lleno, mensaje: 'Cuéntanos qué cultivas o quieres cultivar.' },
      { id: 'c-region', prueba: lleno, mensaje: 'Elige tu región.' },
      { id: 'c-area', prueba: function (c) { return /\d/.test(c.value); }, mensaje: 'Escribe el área aproximada con números, por ejemplo 500 m² o 1 ha.' },
      { id: 'c-inicio', prueba: lleno, mensaje: 'Elige cuándo quieres empezar.' }
    ];
    limpiarAlEscribir(formCotizar, reglasCotizar);
    formCotizar.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!validarFormulario(formCotizar, reglasCotizar)) return;
      var zona = textoOpcion(formCotizar, 'c-region');
      var detalleZona = valorDe(formCotizar, 'c-zona');
      if (detalleZona) zona += ' (' + detalleZona + ')';
      var lineas = [
        'Hola Kallpa Greenz, quiero una propuesta.',
        'Nombre: ' + valorDe(formCotizar, 'c-nombre'),
        'Me interesa: ' + textoOpcion(formCotizar, 'c-interes'),
        'Cultivo: ' + valorDe(formCotizar, 'c-cultivo'),
        'Zona: ' + zona,
        'Área aproximada: ' + valorDe(formCotizar, 'c-area'),
        '¿Cuándo quiero empezar?: ' + textoOpcion(formCotizar, 'c-inicio')
      ];
      var comentario = valorDe(formCotizar, 'c-mensaje');
      if (comentario) lineas.push('Comentario: ' + comentario);
      lineas.push('Ref: WEB-FORM');
      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lineas.join('\n'));
      registrar('form_submit', { origen: 'WEB-FORM', interes: textoOpcion(formCotizar, 'c-interes') });
      var resultado = document.getElementById('form-cotizar-ok');
      var enlace = resultado.querySelector('a');
      enlace.href = url;
      resultado.hidden = false;
      enlace.click(); /* abre WhatsApp; si el navegador lo bloquea, queda el enlace visible */
      avisar('Tu mensaje está listo. Si WhatsApp no se abrió, usa el enlace "Abrir WhatsApp".');
    });
  }

  /* ------------------------------------------------------------------------
     5. COPIAR DATOS DE CONTACTO (botones con data-copy)
     ------------------------------------------------------------------------ */
  document.addEventListener('click', function (ev) {
    var boton = ev.target.closest('[data-copy]');
    if (!boton) return;
    var texto = boton.getAttribute('data-copy');
    var etiquetaBoton = boton.querySelector('.copy-label');
    var listo = function () {
      if (etiquetaBoton) {
        etiquetaBoton.textContent = 'Copiado';
        window.setTimeout(function () { etiquetaBoton.textContent = 'Copiar'; }, 2000);
      }
      avisar('Copiado: ' + texto);
    };
    var respaldo = function () {
      var objetivo = document.getElementById(boton.getAttribute('data-copy-target'));
      if (!objetivo) return;
      if (objetivo.select) {
        objetivo.select();
      } else {
        var rango = document.createRange();
        rango.selectNodeContents(objetivo);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(rango);
      }
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      if (ok) listo(); else avisar('Selecciona el texto y cópialo manualmente.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(listo, respaldo);
    } else {
      respaldo();
    }
  });

  /* ------------------------------------------------------------------------
     6. LIBRO DE RECLAMACIONES
     Genera la hoja, la muestra para copiarla y prepara el correo.
     [PENDIENTE: revisión legal] Conectar a un servicio de envío con numeración
     correlativa y copia automática al consumidor.
     ------------------------------------------------------------------------ */
  var formReclamo = document.getElementById('form-reclamo');
  if (formReclamo) {
    var menor = formReclamo.querySelector('#r-menor');
    var bloqueApoderado = document.getElementById('bloque-apoderado');
    var esCorreo = function (c) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value.trim()); };
    var reglasReclamo = [
      { id: 'r-nombre', prueba: lleno, mensaje: 'Escribe tu nombre completo.' },
      { id: 'r-doc-tipo', prueba: lleno, mensaje: 'Elige el tipo de documento.' },
      { id: 'r-doc-num', prueba: function (c) { return c.value.trim().length >= 6; }, mensaje: 'Escribe tu número de documento completo.' },
      { id: 'r-domicilio', prueba: lleno, mensaje: 'Escribe tu domicilio.' },
      { id: 'r-telefono', prueba: function (c) { return /\d{6,}/.test(c.value.replace(/\D/g, '')); }, mensaje: 'Escribe un teléfono de contacto.' },
      { id: 'r-correo', prueba: esCorreo, mensaje: 'Escribe un correo válido, por ejemplo nombre@correo.com.' },
      { id: 'r-apoderado', prueba: function (c) { return !menor.checked || lleno(c); }, mensaje: 'Escribe el nombre de tu padre, madre o apoderado.' },
      { id: 'r-bien', prueba: lleno, mensaje: 'Elige si es un producto o un servicio.' },
      { id: 'r-bien-desc', prueba: lleno, mensaje: 'Describe el producto o servicio.' },
      { id: 'r-tipo', prueba: lleno, mensaje: 'Elige si es un reclamo o una queja.' },
      { id: 'r-detalle', prueba: function (c) { return c.value.trim().length >= 10; }, mensaje: 'Cuéntanos qué pasó (al menos 10 caracteres).' },
      { id: 'r-pedido', prueba: lleno, mensaje: 'Escribe qué solución pides.' },
      { id: 'r-acepto', prueba: function (c) { return c.checked; }, mensaje: 'Marca la casilla para continuar.' }
    ];
    limpiarAlEscribir(formReclamo, reglasReclamo);
    menor.addEventListener('change', function () { bloqueApoderado.hidden = !menor.checked; });

    formReclamo.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!validarFormulario(formReclamo, reglasReclamo)) return;
      var ahora = new Date();
      var dos = function (n) { return (n < 10 ? '0' : '') + n; };
      var numero = 'LR-' + ahora.getFullYear() + dos(ahora.getMonth() + 1) + dos(ahora.getDate()) + '-' + dos(ahora.getHours()) + dos(ahora.getMinutes()) + dos(ahora.getSeconds());
      var fecha = dos(ahora.getDate()) + '/' + dos(ahora.getMonth() + 1) + '/' + ahora.getFullYear() + ' ' + dos(ahora.getHours()) + ':' + dos(ahora.getMinutes());
      var monto = valorDe(formReclamo, 'r-monto');
      var hoja = [
        'HOJA DE RECLAMACIÓN VIRTUAL N.° ' + numero,
        'Fecha: ' + fecha,
        '',
        'PROVEEDOR: Kallpa Greenz Leaders S.A. | RUC 20613758110',
        'Domicilio: Mz. C Lt. 1 AA.HH. Cerro El Pacífico, Los Olivos, Lima',
        '',
        '1. IDENTIFICACIÓN DEL CONSUMIDOR',
        'Nombre: ' + valorDe(formReclamo, 'r-nombre'),
        'Documento: ' + textoOpcion(formReclamo, 'r-doc-tipo') + ' ' + valorDe(formReclamo, 'r-doc-num'),
        'Domicilio: ' + valorDe(formReclamo, 'r-domicilio'),
        'Teléfono: ' + valorDe(formReclamo, 'r-telefono'),
        'Correo: ' + valorDe(formReclamo, 'r-correo')
      ];
      if (menor.checked) hoja.push('Menor de edad. Padre, madre o apoderado: ' + valorDe(formReclamo, 'r-apoderado'));
      hoja = hoja.concat([
        '',
        '2. IDENTIFICACIÓN DEL BIEN CONTRATADO',
        'Tipo: ' + textoOpcion(formReclamo, 'r-bien'),
        'Descripción: ' + valorDe(formReclamo, 'r-bien-desc'),
        'Monto reclamado: ' + (monto ? 'S/ ' + monto : 'No indica'),
        '',
        '3. DETALLE DE LA RECLAMACIÓN',
        'Tipo: ' + textoOpcion(formReclamo, 'r-tipo'),
        'Detalle: ' + valorDe(formReclamo, 'r-detalle'),
        'Pedido: ' + valorDe(formReclamo, 'r-pedido'),
        '',
        '4. ACCIONES ADOPTADAS POR EL PROVEEDOR: (las completa Kallpa Greenz en su respuesta)',
        '',
        'Kallpa Greenz responderá en un plazo no mayor a 15 días hábiles.'
      ]);
      var texto = hoja.join('\n');
      var resultado = document.getElementById('reclamo-ok');
      resultado.querySelector('.reclamo-numero').textContent = numero;
      resultado.querySelector('#reclamo-texto').value = texto;
      var boton = resultado.querySelector('[data-copy]');
      boton.setAttribute('data-copy', texto);
      var correo = resultado.querySelector('.reclamo-correo');
      correo.href = 'mailto:' + CORREO + '?subject=' + encodeURIComponent('Libro de Reclamaciones - Hoja ' + numero) + '&body=' + encodeURIComponent(texto);
      resultado.hidden = false;
      resultado.scrollIntoView({ block: 'start' });
      resultado.querySelector('h2').focus();
    });
  }
})();
