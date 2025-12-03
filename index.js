const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/hello', (req, res) => {
  const name = req.query.name || 'mundo';
  res.json({ message: `Hola, ${name}!`, uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`Microservicio escuchando en puerto ${port}`);
});
