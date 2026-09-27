# Cómo publicar y editar la web de Kallpa Greenz

Esta carpeta es la web completa de **kgreenzleaders.com**. Son archivos HTML, CSS y JavaScript comunes: no hay que instalar nada ni "compilar" nada. Se editan con cualquier editor de texto (recomendamos Visual Studio Code, que es gratuito) usando **Buscar y reemplazar**.

## 1. Qué hay en la carpeta

```
kallpa-web/
├── index.html                    → Inicio (kgreenzleaders.com)
├── invernaderos.html             → /invernaderos
├── consultoria.html              → /consultoria
├── tecnologia-e-insumos.html     → /tecnologia-e-insumos
├── nosotros.html                 → /nosotros
├── privacidad.html               → /privacidad
├── libro-de-reclamaciones.html   → /libro-de-reclamaciones
├── 404.html                      → página que aparece si un enlace no existe
├── assets/
│   ├── css/styles.css            → todos los estilos (colores, tipografía, diseño)
│   ├── js/main.js                → menú, galerías, formularios, copiar y analítica
│   └── fonts/                    → tipografía Raleway (500 y 700), alojada en el sitio
├── images/                       → fotos, logos y sus versiones optimizadas
├── vercel.json                   → configuración de Vercel (URLs limpias, sin ".html")
├── sitemap.xml                   → mapa del sitio para Google
├── robots.txt                    → permiso para que Google lea la web
└── COMO-PUBLICAR.md              → esta guía
```

Gracias a `vercel.json`, las direcciones se ven limpias: `kgreenzleaders.com/invernaderos` en lugar de `/invernaderos.html`.

## 2. Publicar en Vercel con GitHub

La web tiene unos 200 archivos y GitHub en el navegador acepta **hasta 100 archivos por vez**. Tienes dos caminos:

**Opción A, recomendada: GitHub Desktop** (gratis, sin límite de archivos).
1. Instala GitHub Desktop, inicia sesión y clona tu repositorio (por ejemplo `kallpa-greenz-web`).
2. Copia **todo el contenido** de esta carpeta dentro de la carpeta del repositorio (no la carpeta `kallpa-web`, sino lo que hay dentro).
3. En GitHub Desktop escribe un mensaje como "Nueva web 2026", toca **Commit to main** y luego **Push origin**.

**Opción B: desde el navegador, en tandas.**
1. En tu repositorio toca **Add file → Upload files** y arrastra todo **menos** la carpeta `images`. Toca **Commit changes**.
2. Abre `https://github.com/TU-USUARIO/kallpa-greenz-web/upload/main/images` (cambia TU-USUARIO). Lo que subas ahí queda dentro de `images/`.
3. Arrastra la mitad de los archivos de `images` y toca **Commit changes**. Repite con la otra mitad.

Después:

4. En Vercel: **Add New → Project**, elige el repositorio y toca **Deploy**. No cambies ninguna opción: el "Framework Preset" debe quedar en **Other** y sin comando de build.
5. Si tu cuenta de Vercel usa otra cuenta de GitHub, en la pantalla de importar toca **Add GitHub Account** y autoriza la cuenta dueña del repositorio.

Cada vez que subas un cambio al repositorio, Vercel vuelve a publicar la web solo, en uno o dos minutos.

### Conectar el dominio kgreenzleaders.com

1. Si el dominio está conectado al proyecto antiguo de Vercel (`web-kallpa`), primero quítalo de allí: proyecto antiguo → **Settings → Domains → Remove**. Revisa que esté bien escrito: `kgreenzleaders.com` (con "n").
2. En el proyecto nuevo: **Settings → Domains → Add** y escribe `kgreenzleaders.com`. Agrega también `www.kgreenzleaders.com` y elige que **redirija** a `kgreenzleaders.com` (la web usa la versión sin "www" como dirección oficial).
3. En Google (donde compraste el dominio), en la sección DNS, deja estos registros:
   - Tipo **A**, nombre `@`, valor `76.76.21.21`
   - Tipo **CNAME**, nombre `www`, valor `cname.vercel-dns.com`
4. **No toques los registros MX**: son los del correo `company@kgreenzleaders.com`. Si los borras, el correo deja de funcionar.
5. Vercel activa el candado de seguridad (HTTPS) solo. Puede tardar desde minutos hasta unas horas.

## 3. Editar textos

1. Abre la página en el editor (por ejemplo `invernaderos.html`).
2. Busca el texto con **Ctrl + F** (en Mac, **Cmd + F**), cámbialo y guarda.
3. Sube el archivo a GitHub (paso 2 de arriba) y Vercel lo publica.

**Cabecera y pie de página.** Se repiten en las 8 páginas y deben quedar idénticos. Están marcados con comentarios:

```
<!-- ================= INICIO CABECERA · idéntica en todas las páginas ================= -->
<!-- ================= FIN CABECERA ================= -->
<!-- ================= INICIO PIE DE PÁGINA · idéntico en todas las páginas ================= -->
<!-- ================= FIN PIE DE PÁGINA ================= -->
```

Para cambiarlos en todas las páginas a la vez, usa **Buscar y reemplazar en archivos**: en VS Code, **Ctrl + Shift + H** (Mac: **Cmd + Shift + H**).

**Cifras.** Cada cifra de la web tiene su fuente visible y un comentario `<!-- fuente: … -->` al lado. Si cambias una cifra, cambia también su fuente. No publiques cifras sin fuente.

**Precios.** Por decisión del equipo, solo se publica el precio de la Sesión de Orientación Técnica (S/59). Los invernaderos dicen "Cotización a medida según área, altura y cultivo".

## 4. Cambiar el número de WhatsApp en todo el sitio

El número de ventas aparece en tres formatos. Usa **Buscar y reemplazar en archivos** (Ctrl + Shift + H) en toda la carpeta, en este orden:

| Buscar | Reemplazar por (ejemplo) | Dónde aparece |
|---|---|---|
| `51953782042` | `51999888777` | Todos los botones de WhatsApp, `assets/js/main.js` y los datos para Google |
| `+51 953 782 042` | `+51 999 888 777` | El número que se ve escrito en la web |

Revisa al final que no quede ningún `953782042` ni `953 782 042` buscando cada uno.

## 5. Códigos de origen (Ref)

Cada botón de WhatsApp abre un mensaje ya escrito que termina con un código `Ref`. Anótalo en la planilla de leads para saber qué botón trajo la conversación.

| Código | Página | Botón | Primera línea del mensaje |
|---|---|---|---|
| `WEB-BASIC` | Inicio | Cotizar BASIC | Hola Kallpa Greenz, quiero cotizar el Macrotúnel BASIC. |
| `WEB-FORTE` | Inicio | Cotizar FORTE | Hola Kallpa Greenz, quiero cotizar el Macrotúnel FORTE. |
| `WEB-PLUS` | Inicio | Cotizar PLUS | Hola Kallpa Greenz, quiero cotizar el Macrotúnel PLUS. |
| `WEB-HERO` | Inicio | Cotizar por WhatsApp | Hola Kallpa Greenz, quiero cotizar un invernadero. |
| `WEB-PROCESO` | Inicio | Empezar por WhatsApp | Hola Kallpa Greenz, quiero cotizar un invernadero. |
| `WEB-CONSULTORIA` | Inicio | Agendar por WhatsApp | Hola Kallpa Greenz, quiero información sobre la consultoría agrícola y la reunión informativa sin costo. |
| `WEB-FAQ` | Inicio | Preguntar por WhatsApp | Hola Kallpa Greenz, tengo una consulta: |
| `WEB-FORM` | Inicio | Enviar por WhatsApp (formulario) | Mensaje armado con los datos del formulario |
| `WEB-CABECERA` | Todas (cabecera) | Cotizar por WhatsApp | Hola Kallpa Greenz, quiero cotizar un invernadero. |
| `WEB-PIE` | Todas (pie de página) | WhatsApp +51 953 782 042 | Hola Kallpa Greenz, quiero información. |
| `WEB-FLOTANTE` | Todas (barra fija en celular) | Cotizar por WhatsApp | Hola Kallpa Greenz, quiero cotizar un invernadero. |
| `WEB-CAT-BASIC` | Invernaderos | Cotizar BASIC | Hola Kallpa Greenz, quiero cotizar el Macrotúnel BASIC. |
| `WEB-CAT-FORTE` | Invernaderos | Cotizar FORTE | Hola Kallpa Greenz, quiero cotizar el Macrotúnel FORTE. |
| `WEB-CAT-PLUS` | Invernaderos | Cotizar PLUS | Hola Kallpa Greenz, quiero cotizar el Macrotúnel PLUS. |
| `WEB-INVERNADEROS` | Invernaderos | Cotizar por WhatsApp | Hola Kallpa Greenz, quiero cotizar un invernadero. |
| `WEB-CASA-MALLA` | Invernaderos | Cotizar casa malla | Hola Kallpa Greenz, quiero cotizar una casa malla. |
| `WEB-VIVERO` | Invernaderos | Cotizar vivero | Hola Kallpa Greenz, quiero cotizar un vivero. |
| `WEB-INV-CIERRE` | Invernaderos | Cotizar por WhatsApp | Hola Kallpa Greenz, quiero cotizar un invernadero. |
| `WEB-CONS-SESION` | Consultoría | Reservar mi sesión | Hola Kallpa Greenz, quiero reservar la Sesión de Orientación Técnica (S/59) con el Ing. Rebaza. |
| `WEB-CONS-REUNION` | Consultoría | Agenda la reunión informativa sin costo | Hola Kallpa Greenz, quiero agendar la reunión informativa sin costo sobre consultoría agrícola. |
| `WEB-CONS-PLANES` | Consultoría | Consultar planes por WhatsApp | Hola Kallpa Greenz, quiero conocer los planes mensuales de consultoría agrícola. |
| `WEB-EMPRESAS` | Consultoría | Hablar con el equipo | Hola Kallpa Greenz, escribo por una empresa. Nos interesa la consultoría ambiental y de sostenibilidad. |
| `WEB-CONS-CIERRE` | Consultoría | Agendar por WhatsApp | Hola Kallpa Greenz, quiero agendar la reunión informativa sin costo sobre consultoría agrícola. |
| `WEB-MODULAR` | Tecnología e insumos | Consultar por MODULAR | Hola Kallpa Greenz, quiero información sobre MODULAR para medir y controlar mi invernadero. |
| `WEB-YAKUSMART` | Tecnología e insumos | Consultar por YakuSmart | Hola Kallpa Greenz, quiero información sobre YakuSmart para programar mi riego. |
| `WEB-SENSORES` | Tecnología e insumos | Pedir instalación de sensores | Hola Kallpa Greenz, quiero que instalen y calibren sensores en mi invernadero. |
| `WEB-AMAZONCHIPS` | Tecnología e insumos | Cotizar sustrato | Hola Kallpa Greenz, quiero cotizar sustrato de coco Amazon Chips. |
| `WEB-BIOST` | Tecnología e insumos | Cotizar Biost | Hola Kallpa Greenz, quiero cotizar Biol Regenerador Biost. |
| `WEB-TEC-CIERRE` | Tecnología e insumos | Consultar por WhatsApp | Hola Kallpa Greenz, quiero una recomendación de tecnología e insumos para mi cultivo. |
| `WEB-DOMOS` | Nosotros | Llevar un domo a tu colegio | Hola Kallpa Greenz, me interesa Domos para Educar. |
| `WEB-NOSOTROS` | Nosotros | Escribir por WhatsApp | Hola Kallpa Greenz, quiero conversar con el equipo. |
| `WEB-404` | Página 404 | Escribir por WhatsApp | Hola Kallpa Greenz, llegué a una página que no existe y quiero información. |

Para crear un botón nuevo, copia uno existente y cambia el código `Ref` dentro del enlace (aparece como `Ref%3A%20WEB-...`) y en el atributo `data-ref="WEB-..."`.

## 6. Imágenes: qué foto aparece dónde

Cada foto existe en varias versiones:

- `nombre.jpg`: la foto de respaldo (máximo 1600 px de ancho). **Este es el archivo "maestro"**.
- `nombre-480.webp`, `nombre-800.webp`, `nombre-1200.webp`, `nombre-1600.webp`: versiones livianas. El navegador elige la que necesita según la pantalla.
- `nombre-thumb.webp`: miniatura de 160 × 100 px para las galerías del catálogo.

| Archivo | Dónde aparece | Tamaño del JPG | Anchos WebP |
|---|---|---|---|
| `portada.jpg` | Inicio: foto de fondo de la portada. También es la imagen que se ve al compartir cualquier página en redes. | 1600 × 900 | 480, 800, 1200, 1600 |
| `basic-exterior.jpg` | Inicio: tarjeta BASIC. Invernaderos: galería BASIC (foto 1). | 1600 × 901 | 480, 800, 1200, 1600 + miniatura |
| `basic-interior.jpg` | Invernaderos: galería BASIC (foto 2). | 1600 × 903 | 480, 800, 1200, 1600 + miniatura |
| `forte-exterior.jpg` | Inicio: tarjeta FORTE. Invernaderos: galería FORTE (foto 1). | 1600 × 902 | 480, 800, 1200, 1600 + miniatura |
| `forte-interior.jpg` | Invernaderos: galería FORTE (foto 2). | 1600 × 903 | 480, 800, 1200, 1600 + miniatura |
| `forte-detalle.jpg` | Invernaderos: galería FORTE (foto 3). | 1600 × 903 | 480, 800, 1200, 1600 + miniatura |
| `plus-frente.jpg` | Inicio: tarjeta PLUS. Invernaderos: galería PLUS (foto 1). | 1600 × 903 | 480, 800, 1200, 1600 + miniatura |
| `plus-lateral.jpg` | Invernaderos: foto de la cabecera y galería PLUS (foto 2). | 1600 × 601 | 480, 800, 1200, 1600 + miniatura |
| `plus-interior.jpg` | Invernaderos: galería PLUS (foto 3). | 1600 × 903 | 480, 800, 1200, 1600 + miniatura |
| `plus-ventilacion.jpg` | Invernaderos: galería PLUS (foto 4). | 1600 × 903 | 480, 800, 1200, 1600 + miniatura |
| `casa-malla-exterior.jpg` | Invernaderos: bloque "Casa malla". | 1600 × 903 | 480, 800, 1200, 1600 |
| `vivero.jpg` | Invernaderos: bloque "Viveros". | 1600 × 903 | 480, 800, 1200, 1600 |
| `montaje-01.jpg` | Invernaderos: instalación, paso 1. | 1600 × 903 | 480, 800, 1200, 1600 |
| `montaje-02.jpg` | Invernaderos: instalación, paso 2. | 1600 × 903 | 480, 800, 1200, 1600 |
| `montaje-03.jpg` | Invernaderos: instalación, paso 3. | 1600 × 903 | 480, 800, 1200, 1600 |
| `montaje-04.jpg` | Invernaderos: instalación, paso 4. | 1600 × 903 | 480, 800, 1200, 1600 |
| `diseno-cad.jpg` | Invernaderos: "Antes de construir, diseñamos" (plano CAD). | 1600 × 903 | 480, 800, 1200, 1600 |
| `render-3d.jpg` | Invernaderos: "Antes de construir, diseñamos" (modelo 3D). | 1600 × 903 | 480, 800, 1200, 1600 |
| `modular-instalado.jpg` | Tecnología e insumos: MODULAR (foto grande). | 1536 × 1024 | 480, 800, 1200 |
| `modular-equipos.jpg` | Tecnología e insumos: MODULAR (los cuatro equipos). | 1600 × 900 | 480, 800, 1200, 1600 |
| `modular-app.jpg` | Tecnología e insumos: MODULAR (aplicación). | 1600 × 900 | 480, 800, 1200, 1600 |
| `yakusmart-sensor.jpg` | Tecnología e insumos: YakuSmart (estación en campo). | 1536 × 1024 | 480, 800, 1200 |
| `yakusmart-app.jpg` | Tecnología e insumos: YakuSmart (aplicación). | 1536 × 1024 | 480, 800, 1200 |
| `instalacion-sensores.jpg` | Tecnología e insumos: "Instalamos y calibramos los sensores". | 1600 × 900 | 480, 800, 1200, 1600 |
| `amazon-chips.jpg` | Tecnología e insumos: sustrato Amazon Chips. | 1600 × 900 | 480, 800, 1200, 1600 |
| `biost.jpg` | Tecnología e insumos: Biol Regenerador Biost. | 1254 × 1254 | 480, 800, 1200 |
| `visita-arica.jpg` | Consultoría: consultoría para empresas (visita en Arica). | 1600 × 1200 | 480, 800, 1200, 1600 |
| `domo-interior.jpg` | Nosotros: Domos para Educar (foto 1). | 1600 × 900 | 480, 800, 1200, 1600 |
| `domo-santa-anita.jpg` | Nosotros: Domos para Educar (foto 2). | 701 × 444 | 480 |
| `taller-ninos-ate.jpg` | Nosotros: Domos para Educar (foto 3). | 500 × 330 | 480 |
| `equipo-darwin-diaz.jpg` | Nosotros: equipo. | 560 × 700 | 480 |
| `equipo-fabricio-ferro.jpg` | Nosotros: equipo. | 560 × 700 | 480 |
| `equipo-godfrey-mancha.jpg` | Nosotros: equipo. | 560 × 700 | 480 |
| `equipo-lynn-mamani.jpg` | Nosotros: equipo. | 560 × 700 | 480 |
| `equipo-celestina-huerta.jpg` | Nosotros: equipo. | 560 × 700 | 480 |
| `equipo-enrique-rebaza.jpg` | Inicio: adelanto de consultoría. Consultoría: consultoría agrícola. | 560 × 700 | 480 |
| `equipo-patricia-fuentes.jpg` | Consultoría: equipo de Blue Oak. | 560 × 700 | 480 |

**Logos.** `logo-horizontal.png` (cabecera), `logo-blanco.png` (pie de página) e `icono.png` (ícono de la pestaña) son los archivos oficiales de Kallpa. Tienen versiones livianas `logo-horizontal-240.webp` y `logo-blanco-200.webp`. Si el equipo entrega el logo en SVG, reemplázalos. Los logos de aliados son `logo-cewas`, `logo-gacelas`, `logo-ancestral`, `logo-yakusmart`, `logo-amazon-chips` y `logo-biost`, cada uno en `.png` y `.webp`.

Las fotos de los modelos, del montaje y del diseño son imágenes referenciales y la web lo indica.

### Cambiar una foto

1. Prepara la foto nueva con **las mismas proporciones** que la anterior (por ejemplo, 16:9) y máximo 1600 px de ancho.
2. Guárdala con **el mismo nombre** (por ejemplo `plus-frente.jpg`) y reemplaza el archivo en `images/`.
3. Genera de nuevo sus versiones WebP con uno de los dos métodos de abajo, con los mismos anchos que indica la tabla.
4. Si la foto nueva tiene otras proporciones, busca su nombre en las páginas y cambia los atributos `width` y `height` de la etiqueta `<img>` por el ancho y alto reales del JPG. Así la página no "salta" al cargar.

### Regenerar las versiones WebP

**Opción A: con la herramienta `cwebp` (Mac o Linux).** Se instala con `brew install webp` (Mac) o `sudo apt install webp` (Linux). Desde la carpeta de la web, cambia `plus-frente` por el nombre de tu foto:

```bash
for w in 480 800 1200 1600; do cwebp -q 76 -resize $w 0 images/plus-frente.jpg -o images/plus-frente-$w.webp; done
cwebp -q 72 -resize 160 0 images/plus-frente.jpg -o images/plus-frente-thumb.webp   # solo si la foto tiene miniatura
```

Para las fotos del equipo (que solo tienen versión de 480 px):

```bash
cwebp -q 76 -resize 480 0 images/equipo-lynn-mamani.jpg -o images/equipo-lynn-mamani-480.webp
```

**Opción B: sin instalar nada, con squoosh.app.**

1. Abre https://squoosh.app y arrastra la foto JPG.
2. A la derecha elige **WebP** y calidad **76**.
3. Activa **Resize** y pon el ancho: 480. Descarga el archivo y renómbralo `nombre-480.webp`.
4. Repite con 800, 1200 y 1600 (solo los anchos que indica la tabla para esa foto).
5. Para la miniatura: ancho 160, calidad 72, y renómbrala `nombre-thumb.webp`.

## 7. Analítica: dónde pegar los IDs

Abre `assets/js/main.js`. Al inicio están estas dos líneas:

```js
var GA4_ID = '';        // [PENDIENTE: ID] de Google Analytics 4, por ejemplo 'G-ABC123XYZ9'
var META_PIXEL_ID = ''; // [PENDIENTE: ID] del píxel de Meta, por ejemplo '123456789012345'
```

Pega cada ID entre las comillas, guarda y publica. Mientras estén vacías no se carga nada de Google ni de Meta. Se cargan sin frenar la página porque `main.js` va con `defer`.

**Eventos que se registran:**

| Evento | Cuándo | Dato extra |
|---|---|---|
| `click_whatsapp` | Clic en cualquier botón de WhatsApp | `origen` = el código Ref (por ejemplo `WEB-HERO`) |
| `form_submit` | Envío correcto del formulario de Inicio | `origen` = `WEB-FORM` y `interes` |
| `click_modelo` | Clic en "Ver fotos y detalles" de un modelo | `modelo` = BASIC, FORTE o PLUS |
| `ver_catalogo` | Clic en "Ver modelos", en enlaces al catálogo o a Invernaderos | — |

**Agregar un evento sin tocar JavaScript:** pon el atributo `data-track` en cualquier enlace o botón. Por ejemplo:

```html
<a href="/nosotros" data-track="ver_nosotros">Conócenos</a>
```

Opcionalmente agrega `data-ref="..."` o `data-modelo="..."` para enviar un dato extra.

Antes de activar la analítica, revisa con el abogado si hace falta un aviso de cookies (ver Política de privacidad).

## 8. Formularios

- **Formulario de Inicio.** Valida cada campo, arma el mensaje con nombre, interés, cultivo, región, área y fecha de inicio, y abre WhatsApp con `Ref: WEB-FORM`. No guarda datos en ningún servidor.
- **Libro de Reclamaciones.** Arma la hoja con un número (`LR-fecha-hora`), la muestra para copiarla y abre el correo del usuario dirigido a `company@kgreenzleaders.com`. **Pendiente:** conectarlo a un servicio de envío que guarde cada hoja con numeración correlativa y mande copia automática al consumidor, y la revisión legal.

## 9. Pendientes

Busca `[PENDIENTE` en toda la carpeta para encontrarlos. Hoy son:

- Cargo de Sebastián Cruz Curse (`nosotros.html`). Su foto se agrega cuando esté lista: guárdala como `images/equipo-sebastian-cruz.jpg` (560 × 700 px) y genera su `-480.webp`.
- Logo de Blue Oak Corp. (`index.html`, sección "Nos respaldan").
- IDs de GA4 y del píxel de Meta (`assets/js/main.js`).
- Revisión legal de `privacidad.html` y `libro-de-reclamaciones.html`, incluido el código del banco de datos personales y el servicio de envío del Libro de Reclamaciones.

## 10. Plantilla para un caso real

La sección "Proyectos reales" está retirada por ahora. Cuando tengan un caso con permiso de publicación que se pueda usar con fines comerciales, pega este bloque en `index.html`, donde está el comentario `Sección "Proyectos reales" retirada`:

```html
<section class="section section--blanco" aria-labelledby="t-casos">
  <div class="wrap">
    <div class="section-head"><h2 id="t-casos">Proyectos reales</h2></div>
    <article class="product" aria-labelledby="t-caso-1">
      <div class="product-media">
        <picture class="foto"><img src="/images/caso-01.jpg" alt="Describe la foto" width="1600" height="900" loading="lazy" decoding="async"></picture>
      </div>
      <div class="stack">
        <h3 id="t-caso-1">Nombre del caso</h3>
        <dl class="datos">
          <div><dt>Ubicación</dt><dd>Provincia, región</dd></div>
          <div><dt>Cultivo</dt><dd>Cultivo</dd></div>
          <div><dt>Modelo</dt><dd>Modelo</dd></div>
          <div><dt>Área</dt><dd>000 m²</dd></div>
        </dl>
        <!-- fuente: documento que respalda el resultado -->
        <p><strong>Resultado:</strong> resultado medido. <span class="source">Fuente: …</span></p>
        <blockquote><p>"Testimonio de la persona."</p><p class="note">Nombre Apellido, cargo o comunidad</p></blockquote>
      </div>
    </article>
  </div>
</section>
```
