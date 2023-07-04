    import express from 'express';
    import mysql from 'mysql';

    const app = express();
    const port = 3000;

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'formulario_db'
    });

    connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        process.exit(1);
    }
    console.log('Conexión exitosa a la base de datos');
    });

    // Configuración para analizar los datos enviados en el cuerpo de la solicitud POST
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.post('/api/formulario', (req, res) => {
    const { correo, contrasena } = req.body;

    const query = `SELECT COUNT(*) AS count FROM formulario WHERE correo = ? AND contrasena = ?`;
    const values = [correo, contrasena];

    console.log('Correo:', correo);
    console.log('Contraseña:', contrasena);

    connection.query(query, values, (err, result) => {
        if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        }

        const count = result[0].count;

        if (count > 0) {
        res.redirect('https://vallegrande.edu.pe/');
        console.log('Inicio de Sesion Exitoso');
        } else {
        console.log('La contraseña no es correcta. Inténtalo nuevamente.');
        }
    });
    });

    app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    });
