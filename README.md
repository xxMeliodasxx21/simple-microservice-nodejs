# Simple Microservicio Node.js (Express)

Endpoints:
- GET /health -> devuelve {status: 'ok', time: ISOstring}
- GET /hello?name=TuNombre -> devuelve {message: 'Hola, TuNombre!'}

## Ejecutar localmente
```bash
git clone <tu-repo>
cd simple-microservice-nodejs
npm install
npm start
# o con Docker
docker build -t simple-microservice-nodejs .
docker run -p 3000:3000 simple-microservice-nodejs
```

## Despliegue rápido en Render (git-based)
1. Crea un repo en GitHub y sube este proyecto.
2. En Render: New -> Web Service -> Conecta GitHub -> selecciona el repo
3. Build command: `npm install`
   Start command: `npm start`
   Environment: Node
4. Deploy. Render asignará una URL pública.

## Despliegue en Railway (usa Git o CLI)
- Con Git: conecta repo y selecciona proyecto, define `npm start` como comando.
- Con CLI: `railway up` desde la carpeta (requiere instalar railway cli).

## Despliegue en Vercel (serverless)
- Vercel espera serverless handlers; para este demo recomendamos usar Render o Railway.
"# simple-microservice-nodejs" 
