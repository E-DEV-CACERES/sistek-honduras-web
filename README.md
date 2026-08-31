# Sistek Honduras — Sitio Web

Landing page de una sola página para captar clientes por WhatsApp y redes sociales. No necesita backend ni base de datos: es HTML + CSS + JavaScript puro, listo para publicar en cualquier hosting gratuito.

## Estructura

```
sistek-honduras-web/
├── index.html        # Toda la estructura y contenido del sitio
├── css/styles.css     # Estilos personalizados (además de Tailwind vía CDN)
├── js/script.js       # Menú móvil, animaciones, FAQ, formulario -> WhatsApp
└── README.md
```

## Antes de publicar: cosas que DEBES cambiar

1. **Número de WhatsApp** ✅ ya configurado con `+504 8897-1964` en todos los botones (`js/script.js` e `index.html`). Si cambia, busca `50488971964` en ambos archivos y reemplázalo.

2. **Correo de contacto**: retirado de la sección `#contacto` a propósito. El único canal publicado es WhatsApp, para no mostrar una dirección sin buzón detrás. Si más adelante quieres mostrar un correo, primero activa el reenvío en Namecheap (Domain List → Manage → Redirigir correo electrónico) hacia un Gmail real y después agrégalo al sitio.

3. **Precios**: la sección `#precios` usa valores de referencia (L. 6,000 / L. 15,000). Ajústalos a tus costos reales.

4. **Portafolio** (`#portafolio`): la sección está redactada como tipos de solución que ofreces, no como proyectos entregados, porque las imágenes son ilustrativas. Cuando tengas capturas de proyectos reales, cámbialas y ahí sí puedes titular la sección "Proyectos que hemos desarrollado".

5. **Compromisos** (`#compromisos`): sustituyó a la antigua sección de testimonios, que traía nueve clientes de ejemplo. No vuelvas a poner testimonios inventados: si consigues uno o dos reales con permiso del cliente, valen más que nueve genéricos.

6. **Redes sociales**: en la sección de contacto, los íconos `f`, `ig`, `tt` tienen `href="#"` — cámbialos por los links reales de Facebook/Instagram/TikTok.

## Cómo verlo en tu computadora

No necesitas instalar nada. Simplemente abre `index.html` con doble clic, o si quieres un servidor local:

```bash
# Con Python instalado
python -m http.server 8080
# Luego abre http://localhost:8080
```

## Cómo publicarlo gratis (elige una opción)

### Opción 1: Netlify (más fácil, arrastrar y soltar)
1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `sistek-honduras-web` completa.
3. Netlify te da una URL pública al instante (puedes conectar un dominio propio después).

### Opción 2: Vercel
1. Crea cuenta en https://vercel.com
2. `npx vercel` dentro de esta carpeta y sigue las instrucciones.

### Opción 3: GitHub Pages
1. Sube esta carpeta a un repositorio de GitHub.
2. Activa GitHub Pages en Settings → Pages → selecciona la rama y carpeta raíz.

## Conectar un dominio propio

Una vez publicado en Netlify/Vercel, compra un dominio (ej. `sistekhn.com` o `sistekhonduras.com`) en Namecheap, GoDaddy, o similar, y sigue las instrucciones del proveedor de hosting para apuntar el DNS.

## SEO

El sitio ya incluye: título y meta descripción optimizados, Open Graph y Twitter Cards para que se vea bien al compartir en redes, datos estructurados (Schema.org `ProfessionalService`) para que Google pueda mostrar tu negocio con más detalle, `robots.txt`, `sitemap.xml`, imágenes optimizadas en WebP/JPEG con dimensiones definidas (evita saltos de layout), y una sola etiqueta `<h1>` con jerarquía correcta de encabezados.

El dominio real `https://sistechonduras.online/` ✅ ya está aplicado en el `canonical`, las etiquetas `og:*` y `twitter:*`, los datos estructurados, `robots.txt` y `sitemap.xml`.

La imagen que se ve al compartir el enlace en WhatsApp, Facebook o Instagram es `img/og-sistek.jpg` (1200x630). Si cambias el eslogan o el número de WhatsApp, hay que regenerarla para que no quede desactualizada.

Una vez publicado con tu dominio real:
1. Regístralo en **Google Search Console** (gratis) y envía el `sitemap.xml` para que Google lo indexe más rápido.
2. Crea/reclama tu ficha de **Google Business Profile** con el mismo nombre y datos del sitio — ayuda muchísimo al SEO local en Honduras.
3. Cuando tengas más contenido (ej. un blog con artículos como "cuánto cuesta una app en Honduras"), agrega esas URLs al `sitemap.xml`.

## Ideas para usarlo con publicidad (Facebook/Instagram Ads)

- Usa el link de la página como destino de tus anuncios, o mejor aún, apunta los anuncios directo al link de WhatsApp: `https://wa.me/TU_NUMERO?text=Hola,%20vi%20su%20anuncio%20y%20quiero%20cotizar`
- El botón flotante de WhatsApp y el formulario de contacto ya están conectados para redirigir a WhatsApp con el mensaje pre-escrito, ideal para cerrar leads rápido.
- Agrega el **Meta Pixel** de Facebook en el `<head>` de `index.html` si vas a correr anuncios, para medir conversiones.
