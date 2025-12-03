const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Ruta raíz para que no salga "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Microservicio funcionando 👍");
});

// Ruta health
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Ruta hello opcional
app.get("/hello", (req, res) => {
  const name = req.query.name || "mundo";
  res.json({ message: `Hola, ${name}!`, uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`Microservicio escuchando en puerto ${port}`);
});
