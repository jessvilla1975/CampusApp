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
('Juan', 'Pérez', 'juan.perez@example.com', '+573137895048', 'Calle Falsa 123', '1990-05-15', '123456'),
('María', 'Gómez', 'maria.gomez@example.com', '+573137895049', 'Avenida Siempre Viva 456', '1985-10-20', '123456');
