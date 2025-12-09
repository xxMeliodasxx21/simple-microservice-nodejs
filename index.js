const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')));

// -------------------- RUTAS PRINCIPALES --------------------

// Pantalla login
app.get('/', (req, res) => res.render('login'));

// Procesamos login
app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === "profe" && pass === "1234") {
    res.redirect('/dashboard');
  } else {
    res.send("Credenciales incorrectas");
  }
});

// Dashboard del profe
app.get('/dashboard', (req, res) => res.render('dashboard'));

// -------------------- DELIVERY --------------------

// Ruta de delivery
app.get('/delivery', (req, res) => {
  const menu = [
    { id: 1, name: 'Pizza', price: 120, img: '/img/pizza.png' },
    { id: 2, name: 'Hamburguesa', price: 80, img: '/img/hamburguesa.png' },
    { id: 3, name: 'Soda', price: 20, img: '/img/soda.png' }
  ];
  res.render('delivery', { menu });
});

// Recibir pedidos
app.post('/delivery/order', (req, res) => {
  const order = req.body;
  const ordersFile = path.join(__dirname, 'data', 'orders.json');

  // Asegurarse de que exista la carpeta y el archivo
  if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
  if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, "[]");

  // Leer los pedidos existentes y agregar el nuevo
  const orders = JSON.parse(fs.readFileSync(ordersFile));
  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  res.send('Pedido recibido! 🚀');
});

// ---------------------------------------------------------------

app.listen(port, () => console.log("Servidor corriendo en el puerto " + port));
