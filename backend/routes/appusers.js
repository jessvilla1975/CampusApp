const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/newUser', (req, res) => {
  const { nombre, apellido, correo, telefono, direccion, fecha_nacimiento, contraseña } = req.body;

  // Validar que se reciban todos los campos necesarios
  if (!nombre || !apellido || !correo || !contraseña) {
      return res.status(400).json({ error: 'Por favor, complete todos los campos obligatorios.' });
  }

  // Consulta SQL para insertar un nuevo usuario
  const query = `
      INSERT INTO usuarios (nombre, apellido, correo, telefono, direccion, fecha_nacimiento, contraseña)
      VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // Ejecutar la consulta
  connection.query(query, [nombre, apellido, correo, telefono, direccion, fecha_nacimiento, contraseña], (err, result) => {
      if (err) {
          console.error('Error al insertar el usuario:', err);
          return res.status(500).json({ error: 'Error al crear el usuario' });
      }

      // Devolver una respuesta de éxito
      res.status(201).json({ message: 'Usuario creado exitosamente', userId: result.insertId });
  });
});

router.get('/allUsers', (req, res) => {
  // Consulta SQL para obtener todos los usuarios
  const query = 'SELECT * FROM usuarios';

  // Ejecutar la consulta
  connection.query(query, (err, result) => {
      if (err) {
          console.error('Error al obtener los usuarios:', err);
          return res.status(500).json({ error: 'Error al obtener los usuarios' });
      }

      // Devolver los resultados
      res.json(result);
  }); // Cierre del callback de connection.query
}); // Cierre de la ruta router.get



module.exports = router;
