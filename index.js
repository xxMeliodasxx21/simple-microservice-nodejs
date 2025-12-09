const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Carpeta para servir PDFs
app.use('/pdf', express.static(path.join(__dirname, 'uploads')));

// Configuración para subir PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Guardamos temporalmente el nombre del PDF subido
let nombrePDF = null;

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

// Subida del PDF
app.post('/subir-pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) return res.send("No subiste ningún archivo.");
  nombrePDF = req.file.filename;
  res.redirect('/proyecto');
});

// Página del proyecto
app.get('/proyecto', (req, res) => res.render('proyecto', { nombrePDF }));

// -------------------- NUEVA PARTE: DELIVERY --------------------

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

  let orders = [];
  if (fs.existsSync(ordersFile)) orders = JSON.parse(fs.readFileSync(ordersFile));
  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  res.send('Pedido recibido! 🚀');
});

// ---------------------------------------------------------------

app.listen(port, () => console.log("Servidor corriendo en el puerto " + port));
