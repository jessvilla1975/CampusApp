CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `contraseña` varchar(255) NOT NULL,
  `codigo_verificacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
);
INSERT INTO `usuarios` (nombre, apellido, correo, telefono, direccion, fecha_nacimiento, contraseña, codigo_verificacion) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '1234567890', 'Calle Falsa 123, Ciudad', '2000-01-15', 'contraseña123', '123'),
('María', 'Gómez', 'maria.gomez@example.com', '0987654321', 'Avenida Siempre Viva 456, Ciudad', '1995-06-30', 'contraseña456', '132');

