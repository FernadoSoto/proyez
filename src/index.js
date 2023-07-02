// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// // Configuración de la conexión a la base de datos MySQL
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'admin',
//   database: 'formulario_db',
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     return;
//   }
//   console.log('Conexión exitosa a la base de datos!');
// });

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Ruta para insertar los datos del formulario en la base de datos
// app.post('/formulario', (req, res) => {
//   const { nombre, apellidos, telefono, email, msg } = req.body;

//   // Verificar que todos los campos estén llenos
//   if (!nombre || !apellidos || !telefono || !email || !msg) {
//     res.status(400).json({ error: 'Por favor, complete todos los campos del formulario.' });
//     return;
//   }

//   const mensaje = { nombre, apellidos, telefono, email, msg };

//   connection.query('INSERT INTO formulario SET ?', mensaje, (err, result) => {
//     if (err) {
//       console.error('Error al insertar los datos:', err);
//       res.sendStatus(500);
//       return;
//     }
//     console.log('Formulario enviado exitosamente');
//   });
// });

// app.listen(port, () => {
//   console.log(`Servidor en funcionamiento en el localhost`);
// });

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { dirname, join } = require('path');
const { fileURLToPath } = require('url');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'formulario_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos!');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para insertar los datos del formulario en la base de datos
app.post('/formulario', (req, res) => {
  const { nombre, apellidos, telefono, email, msg } = req.body;

  // Verificar que todos los campos estén llenos
  if (!nombre || !apellidos || !telefono || !email || !msg) {
    res.status(400).json({ error: 'Por favor, complete todos los campos del formulario.' });
    return;
  }

  const mensaje = { nombre, apellidos, telefono, email, msg };

  connection.query('INSERT INTO formulario SET ?', mensaje, (err, result) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.sendStatus(500);
      return;
    }
    console.log('Formulario enviado exitosamente');
  });
});

// Serve static files
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

// Set up views directory and view engine
app.set('views', join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Render index.ejs on root route
app.get('/', (req, res) => res.render('index.ejs'));

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el localhost:${port}`);
});
