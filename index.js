const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Para que Express lea formularios
app.use(express.urlencoded({ extended: true }));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Carpeta para servir PDFs
app.use('/pdf', express.static(path.join(__dirname, 'uploads')));

// Configuración para subir PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Guardamos temporalmente el nombre del PDF subido
let nombrePDF = null;

// Pantalla login
app.get('/', (req, res) => {
  res.render('login');
});

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
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Subida del PDF
app.post('/subir-pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.send("No subiste ningún archivo.");
  }

  nombrePDF = req.file.filename;
  res.redirect('/proyecto');
});

// Página del proyecto
app.get('/proyecto', (req, res) => {
  res.render('proyecto', { nombrePDF });
});

app.listen(port, () => {
  console.log("Servidor listo en http://localhost:" + port);
});
