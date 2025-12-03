# Reporte técnico: Despliegue de microservicio simple (Node.js)

## Resumen ejecutivo
Se implementó un microservicio en Node.js con Express que expone dos endpoints: `/health` y `/hello`.
El objetivo es demostrar despliegue en plataformas cloud gratuitas (Render, Railway, Vercel).

## Arquitectura
- Microservicio monolítico pequeño (1 proceso)
- Exposición HTTP REST con endpoints sanos (health) y funcionales (hello)
- Opcional: contenerización con Docker para portabilidad
- Opciones de despliegue: Render (git-based), Railway (git/CLI), Vercel (serverless), Google Cloud Shell (manual)

## Código y estructura
- index.js: servidor Express
- package.json: dependencias y script start
- Dockerfile: imagen ligera Node 18-alpine
- render.yaml: plantilla (opcional)

## Comandos usados (ejemplos)
- Local:
  - `npm install`
  - `npm start`
- Docker:
  - `docker build -t simple-microservice-nodejs .`
  - `docker run -p 3000:3000 simple-microservice-nodejs`
- Git + Render:
  - `git init && git add . && git commit -m "init"`
  - `git remote add origin git@github.com:<user>/simple-microservice-nodejs.git`
  - `git push -u origin main`

## Problemas encontrados y soluciones comunes
- Error: puerto en uso -> cambiar PORT o matar proceso que usa puerto.
- Render build fails -> asegurar package.json válido y Node engine correcto.
- Railway timeout -> añadir `/health` y configurar readiness probe.
- CORS -> instalar `cors` si frontend lo requiere.

## Enlace funcional
- Aquí debe ir la URL pública proporcionada por la plataforma (ej: https://your-service.onrender.com).
