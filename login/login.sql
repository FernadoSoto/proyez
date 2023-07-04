drop database if exists formulario_db;
CREATE DATABASE formulario_db;

USE formulario_db;

CREATE TABLE formulario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(255),
  contrasena VARCHAR(255)
);

INSERT INTO formulario (correo, contrasena) 
VALUES ('yofernanxd@gmail.com', 'ferna');

use formulario_db;
select*from formulario;