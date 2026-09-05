DROP DATABASE IF EXISTS cero_fraude;
CREATE DATABASE cero_fraude;
USE cero_fraude;

DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS estado;
DROP TABLE IF EXISTS reaccion;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS tipo;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS publicacion;
DROP TABLE IF EXISTS reporte;
DROP TABLE IF EXISTS evidencia;
DROP TABLE IF EXISTS comentario;
DROP TABLE IF EXISTS reaccion_publicacion;
DROP TABLE IF EXISTS suscripcion;
DROP TABLE IF EXISTS publicacion_tipo;

CREATE TABLE rol  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (20) NOT NULL UNIQUE,
    acronimo VARCHAR (10) NOT NULL UNIQUE
);

CREATE TABLE estado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (20)
);

CREATE TABLE reaccion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    simbolo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE categoria (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nombre VARCHAR (20) UNIQUE NOT NULL,
   acronimo VARCHAR (10) UNIQUE NOT NULL
);

CREATE TABLE tipo (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nombre varchar (35) UNIQUE NOT NULL,
   acronimo varchar (10) UNIQUE NOT NULL
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (100) NOT NULL,
    hash_contrasena VARCHAR (64) NOT NULL,
    sal VARCHAR (16) NOT NULL UNIQUE,
    correo VARCHAR (320) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    rol_id INT NOT NULL,
    CONSTRAINT FK_rol_usuario
    FOREIGN KEY (rol_id) REFERENCES rol(id)
);

CREATE TABLE publicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR (100) NOT NULL,
    descripcion TEXT NOT NULL,
    vendedor VARCHAR (100),
    producto VARCHAR (100),
    telefono VARCHAR (25),
    url VARCHAR (255),
    plataforma VARCHAR (100),
    correo VARCHAR (255),
    estado_id INT NOT NULL,
    es_fraude BOOLEAN NOT NULL,
    anonimo BOOLEAN NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT NULL,
    fecha_validacion TIMESTAMP DEFAULT NULL,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    CONSTRAINT fk_estado_publicacion
    FOREIGN KEY (estado_id) REFERENCES estado(id),
    CONSTRAINT FK_usuario_publicacion
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_categoria_publicacion
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE reporte (
	id INT AUTO_INCREMENT PRIMARY KEY,
	informacion TEXT NOT NULL,
	tipo VARCHAR(50),
	usuario_id INTEGER NOT NULL,
	publicacion_id INTEGER NOT NULL,
	FOREIGN KEY (usuario_id) REFERENCES usuario(id),
	FOREIGN KEY (publicacion_id) REFERENCES publicacion(id)
);

CREATE TABLE evidencia (
	id INT AUTO_INCREMENT PRIMARY KEY,
	url VARCHAR(100),
	tipo VARCHAR(50),
	publicacion_id INT NOT NULL,
	FOREIGN KEY (publicacion_id) REFERENCES publicacion(id)
);

CREATE TABLE comentario (
	id INT AUTO_INCREMENT PRIMARY KEY,
	texto TEXT NOT NULL,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	usuario_id INT NOT NULL,
	publicacion_id INT NOT NULL,
	FOREIGN KEY (usuario_id) REFERENCES usuario(id),
	FOREIGN KEY (publicacion_id) REFERENCES publicacion(id)
);

CREATE TABLE reaccion_publicacion (
    usuario_id INT NOT NULL,
    publicacion_id INT NOT NULL,
    reaccion_id INT NOT NULL,
    PRIMARY KEY (usuario_id, publicacion_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (publicacion_id) REFERENCES publicacion(id),
    FOREIGN KEY (reaccion_id) REFERENCES reaccion(id)
);

CREATE TABLE suscripcion (
    usuario_id INT NOT NULL,
    tipo_id INT NOT NULL,
    fecha_suscripcion TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (usuario_id, tipo_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (tipo_id) REFERENCES tipo(id)
);

CREATE TABLE publicacion_tipo (
    publicacion_id INT NOT NULL,
    tipo_id INT NOT NULL,
    FOREIGN KEY (publicacion_id) REFERENCES publicacion(id),
    FOREIGN KEY (tipo_id) REFERENCES tipo(id),
    PRIMARY KEY (publicacion_id, tipo_id)
);

INSERT INTO rol (nombre, acronimo) VALUES
("usuario", "us"),
("admin", "ad");

INSERT INTO estado (nombre) VALUES
("BORRADOR"),
("SUBIDO"),
("PUBLICADO"),
("VALIDADO");

INSERT INTO categoria (nombre, acronimo) VALUES
("Correo", "co"),
("Redes Sociales", "rs"),
("Mensaje", "me"),
("Otros", "ot"),
("Anuncios", "an");

INSERT INTO tipo (nombre, acronimo) VALUES
("Oferta engañosa", "oe"),
("Producto falso", "pf"),
("Anuncio falso", "af");
