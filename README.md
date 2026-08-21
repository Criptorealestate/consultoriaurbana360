# Consultoría Urbana 360 — proyecto estático para Vercel

Este `index.html` es una copia autocontenida (verificada completa, todas las
secciones) del sitio real, lista para editar y desplegar en Vercel como
sitio estático. No necesita build ni dependencias — un solo archivo HTML
con todo el CSS, fuentes e imágenes embebidos.

## Editar

Ábrelo con tu editor de código (VS Code, etc.) y busca (Cmd+F) el texto
exacto que quieras cambiar. Por ejemplo:
- `Tú construyes` → título del hero
- `Guillermo Delgado` → nombre del fundador
- `Proyectos gestionados` → sección de números/trayectoria
- `+52 984 323 56 35` → teléfono/WhatsApp

Guarda y refresca el navegador (`open index.html` o arrastra el archivo a
Chrome) para ver el cambio.

## Ver localmente antes de desplegar (opcional)

```bash
npx serve .
```
Abre `http://localhost:3000`.

## Desplegar en Vercel

### Opción rápida — arrastrar y soltar (sin terminal)
1. Ve a https://vercel.com/new
2. Arrastra esta carpeta completa (o solo `index.html`) al área de "Deploy".
3. Vercel te da una URL en segundos.

### Opción CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```
Sigue las preguntas (nombre del proyecto, scope/equipo) y al final te da la
URL de producción.

### Opción GitHub (recomendada si vas a seguir iterando)
1. Sube esta carpeta a un repo de GitHub.
2. En https://vercel.com/new, importa ese repo.
3. Cada `git push` vuelve a desplegar automáticamente.

## Nota sobre el dominio actual

El HTML trae algunas referencias que siguen apuntando al dominio real
(`consultoriaurbana360.com`) en metadatos (og:image, canonical) — no afectan
la visualización, pero si vas a usar este proyecto como el sitio oficial
nuevo, actualiza esas referencias a tu dominio final antes de publicar.

<!-- test: verificando auto-deploy Vercel -->
