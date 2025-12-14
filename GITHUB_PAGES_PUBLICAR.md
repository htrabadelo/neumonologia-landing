# Publicar la landing en GitHub Pages

Esta landing es un sitio estático (HTML/CSS/JS). Para publicarlo en GitHub Pages, lo más simple es crear un **repo nuevo** cuyo contenido sea el de esta carpeta `landing/`.

## 1) Verificá que el sitio funcione local

Abrí `index.html` con doble click, o usá el server local:

- En VS Code / terminal (opcional):
  - `python -m http.server 5173`
  - Abrí `http://localhost:5173/`

## 2) Crear el repositorio en GitHub

1. Entrá a GitHub y creá un repo nuevo, por ejemplo: `neumonologia-landing`.
2. Elegí **Public** (recomendado si querés que sea accesible para cualquiera).
3. No hace falta agregar README/License (podés hacerlo después).

Al final GitHub te va a mostrar una URL tipo:
- `https://github.com/<TU_USUARIO>/neumonologia-landing.git`

## 3) Subir los archivos (opción A: script automático)

En esta carpeta existe un script:
- `publicar_github_pages.ps1`

Pasos:
1. Abrí PowerShell.
2. Andá a esta carpeta.
3. Ejecutá el script indicando la URL del repo:

Ejemplo:
- `./publicar_github_pages.ps1 -RepoUrl "https://github.com/<TU_USUARIO>/neumonologia-landing.git"`

El script:
- inicializa git (si hace falta)
- agrega remote
- commitea
- pushea a `main`

## 3) Subir los archivos (opción B: manual)

En PowerShell:

1. `cd C:\neumonologia_app1\landing`
2. `git init`
3. `git add -A`
4. `git commit -m "Publish landing"`
5. `git branch -M main`
6. `git remote add origin https://github.com/<TU_USUARIO>/neumonologia-landing.git`
7. `git push -u origin main`

Si Git te pide login:
- Usá GitHub Desktop, o
- autenticá con navegador (según tu setup), o
- usá un token (PAT) si corresponde.

## 4) Activar GitHub Pages

En el repo (en GitHub web):

1. `Settings` → `Pages`
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` y carpeta `/ (root)`
4. `Save`

GitHub te va a mostrar la URL final del sitio.

## 5) Checklist rápido

- El archivo `index.html` está en la **raíz** del repo (no dentro de una subcarpeta extra)
- Las imágenes están en `assets/`
- Probaste los botones:
  - ARS abre Mercado Pago
  - USD abre WhatsApp
  - ES/EN cambia idioma

## Troubleshooting

- **404 en GitHub Pages**: casi siempre es porque `index.html` no quedó en la raíz del repo, o Pages está apuntando a otra branch/carpeta.
- **Imágenes no cargan**: verificar que `assets/tapa_es.jpg` y `assets/tapa_en.jpg` existan en el repo.
- **Botón MP no abre**: revisar `landing/app.js` → `CONFIG.mpArsAliasOrLink`.
