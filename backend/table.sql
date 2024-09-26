CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(15),
    direccion VARCHAR(255),
    fecha_nacimiento DATE,
    contraseña VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (nombre, apellido, correo, telefono, direccion, fecha_nacimiento, contraseña)
VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '555-1234', 'Calle Falsa 123', '1990-05-15', 'contraseñaSegura123'),
('María', 'Gómez', 'maria.gomez@example.com', '555-5678', 'Avenida Siempre Viva 456', '1985-10-20', 'otraContraseñaSegura456');
