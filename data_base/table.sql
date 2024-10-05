CREATE TABLE usuarios (
    id INT PRIMARY KEY NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    genero VARCHAR(10),
    fecha_nacimiento DATE,
    codigo_verificacion VARCHAR(100)
);

create table conductor (
  id_conductor INT PRIMARY KEY NOT NULL,
  calificacion_conductor INT,
  estado_disponibilidad BOOLEAN DEFAULT TRUE,
  numero_licencia VARCHAR(100) NOT NULL,
  fecha_vencimiento DATE,
  foto_perfil VARCHAR(100) NOT NULL,
  documento_verificacion VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_conductor) REFERENCES usuario (id)
);

create table pasajero (
  id_pasajero INT PRIMARY KEY NOT NULL,
  calificacion_pasajero INT,
  FOREIGN KEY (id_pasajero) REFERENCES usuario (id)
);

create table vehiculo (
  id_placa INT PRIMARY KEY NOT NULL,
  id_conductor INT NOT NULL,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  color VARCHAR(100) NOT NULL,
  capacidad_pasajeros INT NOT NULL,
  FOREIGN KEY (id_conductor) REFERENCES conductor (id_conductor)
);

create table ubicacion (
  id_ubicacion INT PRIMARY KEY NOT NULL,
  latitud FLOAT NOT NULL,
  longitud FLOAT NOT NULL,
  direccion_completa VARCHAR(100) NOT NULL
);

create table viaje (
  id_viaje INT PRIMARY KEY NOT NULL,
  id_conductor INT NOT NULL,
  id_pasajero INT NOT NULL,
  id_ubicacion_recogida INT NOT NULL,
  id_ubicacion_destino INT NOT NULL,
  fecha_hora_inicio TIMESTAMP NOT NULL,
  fecha_hora_fin TIMESTAMP,
  distancia_recorrido FLOAT,
  costo_viaje FLOAT,
  estado_viaje VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_conductor) REFERENCES conductor (id_conductor),
  FOREIGN KEY (id_pasajero) REFERENCES pasajero (id_pasajero),
  FOREIGN KEY (id_ubicacion_recogida) REFERENCES ubicacion (id_ubicacion),
  FOREIGN KEY (id_ubicacion_destino) REFERENCES ubicacion (id_ubicacion)
);

create table calificaciones (
  id_calificacion INT PRIMARY KEY AUTO_INCREMENT,
  id_viaje INT NOT NULL,
  puntuacion INT CHECK (puntuacion >= 1 AND puntuacion <= 5),
  comentario VARCHAR(100),
  FOREIGN KEY (id_viaje) REFERENCES viaje (id_viaje)
);

create table historial_viajes (
  registro_viaje INT PRIMARY KEY AUTO_INCREMENT,
  id_pasajero INT NOT NULL,
  id_viaje INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_pasajero) REFERENCES pasajero (id_pasajero),
  FOREIGN KEY (id_viaje) REFERENCES viaje (id_viaje)
);

INSERT INTO usuarios (id, nombre, apellido, correo, contraseña, telefono, genero, fecha_nacimiento, codigo_verificacion) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@mail.com', 'password123', '5551234567', 'Masculino', '1990-05-15', 'ABC123'),
(2, 'María', 'Gómez', 'maria.gomez@mail.com', 'password456', '5559876543', 'Femenino', '1988-07-22', 'XYZ789'),
(3, 'Carlos', 'Martínez', 'carlos.martinez@mail.com', 'password789', '5556543210', 'Masculino', '1995-03-10', 'QWE456'),
(4, 'Ana', 'López', 'ana.lopez@mail.com', 'password321', '5554321098', 'Femenino', '1992-01-30', 'TYU987'),
(5, 'Pedro', 'Sánchez', 'pedro.sanchez@mail.com', 'password654', '5553210987', 'Masculino', '1991-11-19', 'VBN654'),
(6, 'Laura', 'Ramírez', 'laura.ramirez@mail.com', 'password012', '5558765432', 'Femenino', '1993-09-25', 'MNB321'),
(7, 'Luis', 'Fernández', 'luis.fernandez@mail.com', 'password147', '5553456789', 'Masculino', '1996-04-18', 'ASD123'),
(8, 'Sofía', 'Castro', 'sofia.castro@mail.com', 'password258', '5556789012', 'Femenino', '1989-12-12', 'FGH456'),
(9, 'David', 'Ruiz', 'david.ruiz@mail.com', 'password369', '5557890123', 'Masculino', '1994-08-06', 'JKL789'),
(10, 'Lucía', 'Vega', 'lucia.vega@mail.com', 'password951', '5554567890', 'Femenino', '1990-02-17', 'QAZ963');

INSERT INTO conductor (id_conductor, calificacion_conductor, estado_disponibilidad, numero_licencia, fecha_vencimiento, foto_perfil, documento_verificacion) VALUES
(1, 5, TRUE, 'L12345678', '2025-12-31', 'foto1.jpg', 'DOC123'),
(3, 4, TRUE, 'L87654321', '2026-08-15', 'foto2.jpg', 'DOC456'),
(5, 5, TRUE, 'L11223344', '2024-10-05', 'foto3.jpg', 'DOC789'),
(7, 3, FALSE, 'L55667788', '2027-03-22', 'foto4.jpg', 'DOC012'),
(9, 4, TRUE, 'L99887766', '2023-11-13', 'foto5.jpg', 'DOC345');

INSERT INTO pasajero (id_pasajero, calificacion_pasajero) VALUES
(2, 5),
(4, 4),
(6, 3),
(8, 5),
(10, 4);

INSERT INTO vehiculo (id_placa, id_conductor, marca, modelo, ano, color, capacidad_pasajeros) VALUES
(1, 1, 'Toyota', 'Corolla', 2020, 'Rojo', 4),
(2, 3, 'Honda', 'Civic', 2019, 'Negro', 4),
(3, 5, 'Ford', 'Focus', 2021, 'Blanco', 5),
(4, 7, 'Chevrolet', 'Spark', 2018, 'Azul', 4),
(5, 9, 'Nissan', 'Sentra', 2022, 'Gris', 5);

INSERT INTO ubicacion (id_ubicacion, latitud, longitud, direccion_completa) VALUES
(1, 19.432608, -99.133209, 'Av. Reforma, CDMX'),
(2, 40.712776, -74.005974, 'Times Square, NY'),
(3, 48.856613, 2.352222, 'Torre Eiffel, París'),
(4, -33.868820, 151.209296, 'Opera House, Sídney'),
(5, 35.689487, 139.691711, 'Torre de Tokio, Japón');

INSERT INTO viaje (id_viaje, id_conductor, id_pasajero, id_ubicacion_recogida, id_ubicacion_destino, fecha_hora_inicio, fecha_hora_fin, distancia_recorrido, costo_viaje, estado_viaje) VALUES
(1, 1, 2, 1, 2, '2024-10-01 08:00:00', '2024-10-01 08:30:00', 10.5, 100.0, 'Completado'),
(2, 3, 4, 2, 3, '2024-10-01 09:00:00', NULL, NULL, NULL, 'En curso'),
(3, 5, 6, 3, 4, '2024-10-02 10:00:00', '2024-10-02 10:45:00', 15.0, 150.0, 'Completado'),
(4, 7, 8, 4, 5, '2024-10-02 11:00:00', '2024-10-02 11:30:00', 8.0, 80.0, 'Cancelado'),
(5, 9, 10, 5, 1, '2024-10-03 12:00:00', '2024-10-03 12:40:00', 12.0, 120.0, 'Completado');

INSERT INTO calificaciones (id_calificacion, id_viaje, puntuacion, comentario) VALUES
(1, 1, 5, 'Excelente servicio'),
(2, 3, 4, 'Buen viaje'),
(3, 5, 5, 'Conductor muy amable'),
(4, 1, 3, 'Normal'),
(5, 4, 2, 'No fue lo esperado');

INSERT INTO historial_viajes (registro_viaje, id_pasajero, id_viaje, fecha) VALUES
(1, 2, 1, '2024-10-01 08:30:00'),
(2, 4, 2, '2024-10-01 09:00:00'),
(3, 6, 3, '2024-10-02 10:45:00'),
(4, 8, 4, '2024-10-02 11:30:00'),
(5, 10, 5, '2024-10-03 12:40:00');
