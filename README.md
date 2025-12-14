# Neumonología — Landing de venta (ES/EN)

Landing page estática (HTML/CSS/JS) para generar interés y derivar a compra/consulta.

## Contenido
- `index.html`: página
- `styles.css`: estilos
- `app.js`: configuración + textos ES/EN
- `assets/`: imágenes (tapas)

## Configuración rápida
En `app.js`:
- `CONFIG.mpArsAliasOrLink`: alias o link de Mercado Pago (ARS)
- `CONFIG.whatsappNumberE164`: WhatsApp en formato E.164 (ej: `54911...`)

## Probar local
Opción simple: abrir `index.html` con doble click.

O con servidor local:
- `python -m http.server 5173`
- Abrir `http://localhost:5173/`

## Publicar en GitHub Pages
1) Crear repo en GitHub (ej: `neumonologia-landing`).

2) Subir el contenido de esta carpeta al repo (que `index.html` quede en la raíz del repo).

3) En GitHub (web):
- `Settings` → `Pages`
- `Source`: `Deploy from a branch`
- `Branch`: `main` y carpeta `/ (root)`

URL típica:
- `https://htrabadelo.github.io/neumonologia-landing/`

Guía paso a paso: ver `GITHUB_PAGES_PUBLICAR.md`.
