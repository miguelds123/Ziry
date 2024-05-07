CREATE DATABASE bdziry;

USE bdziry;

CREATE TABLE tipoUsuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE usuario (
	id INT PRIMARY KEY auto_increment,
	correo VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE,
    telefono varchar(50) NOT NULL
);

ALTER TABLE usuario
	ADD cedula varchar(50) NOT NULL;
    
ALTER TABLE usuario
	ADD id_provincia int NOT NULL;
    
ALTER TABLE usuario
	ADD id_canton int NOT NULL;
    
ALTER TABLE usuario
	ADD id_distrito int NOT NULL;

ALTER TABLE usuario
	ADD activo tinyint NOT NULL;

ALTER TABLE usuario
	ADD tipo_usuario INT NOT NULL;
    
ALTER TABLE usuario
	ADD foreign key (tipo_usuario) references tipoUsuarios (id);
    
CREATE TABLE provincia (
	id INT primary KEY,
    descripcion varchar(50)
);

CREATE TABLE canton (
   id INT,
   id_provincia INT NOT NULL,
   descripcion varchar(50),
   Primary key (id, id_provincia)
);

CREATE TABLE distrito (
   id INT,
   id_canton INT NOT NULL,
   id_provincia INT NOT NULL,
   descripcion varchar(50),
   Primary key (id, id_canton, id_provincia)
);

ALTER TABLE canton
ADD FOREIGN KEY (id_provincia) REFERENCES provincia(id);

ALTER TABLE distrito
ADD FOREIGN KEY (id_canton, id_provincia) REFERENCES canton(id, id_provincia);

ALTER TABLE usuario
ADD foreign key (id_distrito, id_canton, id_provincia) references distrito (id, id_canton, id_provincia);

CREATE TABLE tipo_material (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE material (
	id INT primary KEY AUTO_INCREMENT,
    tipo_material INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    valor INT NOT NULL,
    imagen varchar(500) not null
);

ALTER TABLE material
ADD foreign key (tipo_material) references tipo_material (id);

ALTER TABLE material
	ADD unidad_medida varchar(50) NOT NULL;
    
ALTER TABLE material
	ADD color varchar(50) NOT NULL;

ALTER TABLE material
	ADD activo tinyint NOT NULL;

CREATE TABLE centro_acopio (
	id INT primary Key AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    id_provincia INT NOT NULL,
    id_canton INT NOT NULL,
    direccion varchar(150) NOT NULL,
    telefono varchar(50) NOT NULL,
    horario varchar(100) NOT NULL,
    id_usuario_admin int NOT NULL
);

ALTER TABLE centro_acopio
ADD foreign key (id_canton, id_provincia) references canton (id, id_provincia);

ALTER TABLE centro_acopio
	ADD activo tinyint NOT NULL;

ALTER TABLE centro_acopio
ADD CONSTRAINT solo_un_admin UNIQUE (id_usuario_admin);

ALTER TABLE centro_acopio
	ADD foreign key (id_usuario_admin) references usuario (id);

CREATE TABLE centro_acopio_materiales (
	id_centro_acopio INT NOT NULL,
    id_material INT NOT NULL,
    PRIMARY KEY (id_centro_acopio, id_material)
);

ALTER TABLE centro_acopio_materiales
ADD foreign key (id_centro_acopio) references centro_acopio (id);

ALTER TABLE centro_acopio_materiales
ADD foreign key (id_material) references material (id);

CREATE TABLE canje (
	id INT primary KEY auto_increment,
    id_usuario int not null,
    id_centro_acopio INT NOT NULL,
    fecha datetime NOT NULL,
    total_economonedas int NOT NULL
);

ALTER table canje
ADD foreign key (id_centro_acopio) references centro_acopio (id);

ALTER table canje
ADD foreign key (id_usuario) references usuario (id);

CREATE TABLE canje_materiales (
	id_canje INT NOT NULL,
    id_material INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal int NOT NULL,
    primary key (id_canje, id_material)
);

ALTER table canje_materiales
ADD foreign key (id_canje) references canje (id);

ALTER table canje_materiales
ADD foreign key (id_material) references material (id);

CREATE TABLE tipo_cupones (
	id INT Primary KEY,
    descripcion varchar(50)
);

CREATE TABLE cupones (
	id INT primary key auto_increment,
	nombre varchar(50) NOT NULL,
    descripcion varchar(50) NOT NULL,
    imagen varchar(150) NOT NULL,
    id_tipo_cupon INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL,
    precio INT NOT NULL
);

ALTER table cupones
ADD foreign key (id_tipo_cupon) references tipo_cupones (id);

CREATE TABLE billetera (
	id_usuario int primary key,
    ecomonedas_disponibles int NOT NULL,
    ecomonedas_cajeadas int NOT NULL,
    ecomonedas_recibidas int NOT NULL
);

ALTER table billetera
ADD foreign key (id_usuario) references usuario (id);

CREATE TABLE cupon_canjeado (
	id_cupon_canjeado int not null auto_increment,
    id_usuario int not null,
    id_cupon int,
    primary key (id_cupon_canjeado, id_usuario, id_cupon)
);

ALTER table cupon_canjeado
ADD foreign key (id_usuario) references usuario (id);

ALTER table cupon_canjeado
ADD foreign key (id_cupon) references cupones (id);

CREATE TABLE color (
	id INT primary key auto_increment,
    descripcion varchar(50),
    color varchar(50)
);

INSERT INTO color (descripcion, color) values ("Rojo", "red");

INSERT INTO color (descripcion, color) values ("Azul", "blue");

INSERT INTO color (descripcion, color) values ("Café", "brown");

INSERT INTO color (descripcion, color) values ("Amarillo", "yellow");

INSERT INTO color (descripcion, color) values ("Morado", "purple");

INSERT INTO color (descripcion, color) values ("Gris", "grey");

INSERT INTO color (descripcion, color) values ("Verde", "green");

INSERT INTO color (descripcion, color) values ("Celeste", "lightblue");

INSERT INTO provincia (id, descripcion) values (1, "San Jose");

INSERT INTO provincia (id, descripcion) values (2, "Alajuela");

INSERT INTO provincia (id, descripcion) values (3, "Cartago");

INSERT INTO provincia (id, descripcion) values (4, "Heredia");

INSERT INTO provincia (id, descripcion) values (5, "Puntarenas");

INSERT INTO provincia (id, descripcion) values (6, "Guanacaste");

INSERT INTO provincia (id, descripcion) values (7, "Limon");

INSERT INTO canton (id, id_provincia, descripcion) values (1, 1, "SJ Canton Central");

INSERT INTO canton (id, id_provincia, descripcion) values (1, 2, "Alajuela Canton Central");

INSERT INTO canton (id, id_provincia, descripcion) values (1, 3, "Cartago Canton Central");

INSERT INTO canton (id, id_provincia, descripcion) values (1, 4, "Heredia Canton Central");

INSERT INTO canton (id, id_provincia, descripcion) values (1, 5, "Puntarenas Canton Central");

INSERT INTO canton (id, id_provincia, descripcion) values (1, 6, "Liberia");

INSERT INTO canton (id, id_provincia, descripcion) values (1, 7, "Limon Canton Central");

INSERT INTO distrito (id, id_canton, id_provincia, descripcion) values (1, 1, 1, "Distrito San Jose");

INSERT INTO distrito (id, id_canton, id_provincia, descripcion) values (1, 1, 2, "Distrito Alajuela");

INSERT INTO distrito (id, id_canton, id_provincia, descripcion) values (1, 1, 4, "Distrito Heredia");

INSERT INTO distrito (id, id_canton, id_provincia, descripcion) values (1, 1, 3, "Distrito Cartago");

INSERT INTO distrito (id, id_canton, id_provincia, descripcion) values (1, 1, 5, "Distrito Puntarenas");

INSERT INTO distrito (id, id_canton, id_provincia, descripcion) values (1, 1, 6, "Distrito Guanacaste");

INSERT INTO distrito (id, id_canton, id_provincia, descripcion) values (1, 1, 7, "Distrito Limon");

INSERT INTO tipousuarios (descripcion) values ("admin");

INSERT INTO tipousuarios (descripcion) values ("adminCentroAcopio");

INSERT INTO tipousuarios (descripcion) values ("cliente");

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoMichi", "1234", "Miguel", "Santamaria", '2023-10-16', "86447111", "208480511", 1, 1, 1, 1, 1);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoKate", "1234", "Kate", "Campos", '2023-10-16', "71927551", "12345678", 4, 1, 1, 1, 2);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoKenneth", "1234", "Kenneth", "Santamaria", '2023-10-16', "12345678", "87654321", 2, 1, 1, 1, 2);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoArman", "1234", "Armando", "Solano", '2023-10-16', "12345678", "1378478278", 1, 1, 1, 1, 2);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoMessi", "1234", "Lionel", "Messi", '2023-10-16', "12345678", "1378478278", 1, 1, 1, 1, 2);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoCristiano", "1234", "Cristiano", "Ronaldo", '2023-10-16', "12345678", "1378478278", 1, 1, 1, 1, 2);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoPonchis", "1234", "Rodolfo", "De la O", '2023-10-16', "12345678", "1378478278", 1, 1, 1, 1, 2);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoAdri", "1234", "Adrian", "Rodriguez", '2023-10-16', "12345678", "1378478278", 1, 1, 1, 1, 2);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoMaria", "1234", "Maria", "Fernandez", '2023-10-16', "12345678", "200000000", 2, 1, 1, 1, 3);

INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) VALUES 
("correoMario", "1234", "Mario", "Mendoza", '2023-10-16', "12345678", "2005345345", 2, 1, 1, 1, 3);

INSERT INTO tipo_material (descripcion) values ("Papel");

INSERT INTO tipo_material (descripcion) values ("Carton");

INSERT INTO tipo_material (descripcion) values ("Plastico");

INSERT INTO material (tipo_material, nombre, descripcion, valor, imagen, unidad_medida, color, activo) 
values (1, "Hoja de Papel", "Hoja de papel usada",1000, "https://graficaigc.com.ar/wp-content/uploads/2022/04/opalinaobra-1.jpg", "GSM", "lightblue", 1);

INSERT INTO material (tipo_material, nombre, descripcion, valor, imagen, unidad_medida, color, activo) 
values (2, "Caja de carton", "Caja de carton vieja", 800, "https://www.lapizlopez.cl/media/catalog/product/cache/bc959f0e4eaab18479332046e9efb53d/9/1/91940.jpg", "cm3", "grey", 1);

INSERT INTO material (tipo_material, nombre, descripcion, valor, imagen, unidad_medida, color, activo) 
values (3, "Botella de Vidrio", "Botella de vidrio usada", 1200, "https://www.graficaletrilandia.cl/wp-content/uploads/2022/02/AD-RE-0011.jpg", "cm2", "green", 1);

INSERT INTO centro_acopio (nombre, id_provincia, id_canton, direccion, telefono, horario, id_usuario_admin, activo)
values ("Plaza Real", 2, 1, "250m E de McDonald′s de la Tropicana, Av. 10 Jesús Ocaña Rojas, Provincia de Alajuela, Alajuela, 20101", "12345678", "Desde 8 am hasta 4 pm", 3, 1);

INSERT INTO centro_acopio (nombre, id_provincia, id_canton, direccion, telefono, horario, id_usuario_admin, activo)
values ("Oxigeno", 4, 1, "Heredia", "12345678", "Desde 8 am hasta 4 pm", 2, 1);

INSERT INTO centro_acopio (nombre, id_provincia, id_canton, direccion, telefono, horario, id_usuario_admin, activo)
values ("Multiplaza Escazu", 1, 1, "Escazu", "12345678", "Desde 8 am hasta 4 pm", 4, 1);

INSERT INTO centro_acopio_materiales (id_centro_acopio, id_material) values (1, 1);

INSERT INTO centro_acopio_materiales (id_centro_acopio, id_material) values (2, 1);

INSERT INTO centro_acopio_materiales (id_centro_acopio, id_material) values (2, 2);

INSERT INTO centro_acopio_materiales (id_centro_acopio, id_material) values (3, 3);

INSERT INTO canje (id_usuario, id_centro_acopio, fecha, total_economonedas) 
values (9, 1, '2023-10-16', 3000);

INSERT INTO canje_materiales (id_canje, id_material, cantidad, subtotal)
values (1, 1, 3, 3000);

INSERT INTO canje (id_usuario, id_centro_acopio, fecha, total_economonedas) 
values (9, 2, '2023-10-16', 1800);

INSERT INTO canje_materiales (id_canje, id_material, cantidad, subtotal)
values (2, 1, 1, 1000);

INSERT INTO canje_materiales (id_canje, id_material, cantidad, subtotal)
values (2, 2, 1, 800);

INSERT INTO canje (id_usuario, id_centro_acopio, fecha, total_economonedas) 
values (9, 3, '2023-10-16', 1200);

INSERT INTO canje_materiales (id_canje, id_material, cantidad, subtotal)
values (3, 3, 1, 1200);

INSERT INTO canje (id_usuario, id_centro_acopio, fecha, total_economonedas) 
values (10, 3, '2023-10-16', 5000);

INSERT INTO canje_materiales (id_canje, id_material, cantidad, subtotal)
values (4, 3, 1, 1200);

INSERT INTO canje_materiales (id_canje, id_material, cantidad, subtotal)
values (4, 2, 1, 800);

INSERT INTO canje_materiales (id_canje, id_material, cantidad, subtotal)
values (4, 1, 3, 3000);

INSERT INTO tipo_cupones (id, descripcion) values (1, "entrada cine");

INSERT INTO tipo_cupones (id, descripcion) values (2, "alimentos");

INSERT INTO tipo_cupones (id, descripcion) values (3, "pase especial parque diversiones");

INSERT INTO cupones (nombre, descripcion, imagen, id_tipo_cupon, fecha_inicio, fecha_final, precio) 
values ("Monja 2", "Entrada para el cine pelicula Monja 2", "https://palomaynacho-1f321.kxcdn.com/wp-content/uploads/2023/07/la_monja_2_poster_oficial-jpeg.webp", 1, '2023-09-08', '2023-10-08', 2000);

INSERT INTO cupones (nombre, descripcion, imagen, id_tipo_cupon, fecha_inicio, fecha_final, precio) 
values ("Combo de Quesoburguesas", "Combo de Quesoburguesas McDonalds", "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kLXwGFDx/200/200/original?country=cr", 2, '2023-10-08', '2023-11-08', 1500);

INSERT INTO cupones (nombre, descripcion, imagen, id_tipo_cupon, fecha_inicio, fecha_final, precio) 
values ("Pase especial parque diversiones", "Pase especial parque diversiones", "https://www.larepublica.net/storage/images/2019/04/10/20190410143408.parque.x2.jpg", 3, '2023-09-20', '2023-10-10', 3000);    
    
Select id, nombre, valor, imagen from material;

Select nombre, descripcion, imagen, unidad_medida, valor from material;

Select nombre, direccion, telefono, horario from centro_acopio;

Select centro_acopio.nombre, provincia.descripcion as provincia, canton.descripcion as canton,
centro_acopio.direccion, centro_acopio.telefono, centro_acopio.horario, concat(usuario.nombre, " ", usuario.apellido) as nombreUsuario, centro_acopio.id
from centro_acopio, provincia, canton, usuario
where centro_acopio.id_provincia = provincia.id and centro_acopio.id_canton = canton.id and 
canton.id_provincia = provincia.id and centro_acopio.id_usuario_admin = usuario.id

SELECT canje.id, centro_acopio.nombre, canje.fecha, canje.total_economonedas, concat(usuario.nombre, " ", usuario.apellido) as nombreUsuario
FROM canje, centro_acopio, usuario
where canje.id_centro_acopio = centro_acopio.id and canje.id_usuario = usuario.id and canje.id = 4;

SELECT canje.id, centro_acopio.nombre, canje.fecha, canje.total_economonedas, canje.id_usuario
FROM canje, centro_acopio, usuario
where canje.id_centro_acopio = centro_acopio.id and centro_acopio.id_usuario_admin = usuario.id and usuario.id = 4

SELECT canje.id, centro_acopio.nombre, canje.fecha, canje.total_economonedas, concat(usuario.nombre, " ", usuario.apellido) as nombreUsuario
FROM canje, centro_acopio, usuario
where canje.id_centro_acopio = centro_acopio.id and usuario.id = 5 and canje.id_usuario = usuario.id and canje.id = 1

Select concat(usuario.nombre, " ", usuario.apellido) as nombreUsuario, material.nombre, 
canje_materiales.cantidad, canje_materiales.subtotal
from usuario, canje_materiales, canje, material, centro_acopio
where canje_materiales.id_canje = canje.id and canje.id_usuario = usuario.id
and canje_materiales.id_material = material.id and canje.id_centro_acopio = centro_acopio.id and
centro_acopio.id = 2;

Select canje.fecha, concat(usuario.nombre, " ", usuario.apellido) as nombreUsuario, 
centro_acopio.nombre, material.nombre, canje_materiales.cantidad, material.valor, 
canje_materiales.subtotal, canje.total_economonedas
from canje, usuario, centro_acopio, canje_materiales, material
where canje.id = 2 and canje.id_usuario = usuario.id and canje.id_centro_acopio = centro_acopio.id
and canje_materiales.id_canje = canje.id and canje_materiales.id_material = material.id

SELECT centro_acopio.nombre, provincia.descripcion as provincia, canton.descripcion as canton,
centro_acopio.direccion, centro_acopio.telefono, centro_acopio.horario, concat(usuario.nombre, ' ', usuario.apellido) as nombreUsuario
from centro_acopio, provincia, canton, usuario
where centro_acopio.id_provincia = provincia.id and centro_acopio.id_canton = canton.id and 
canton.id_provincia = provincia.id and centro_acopio.id_usuario_admin = usuario.id

Select * from material

Select * from centro_acopio

SELECT usuario.id, usuario.nombre, usuario.apellido
FROM usuario
WHERE usuario.tipo_usuario = 2
AND NOT EXISTS (
    SELECT 1
    FROM centro_acopio
    WHERE centro_acopio.id_usuario_admin = usuario.id
);

SELECT MAX(id) as ultimo_id
FROM centro_acopio;

Select * from centro_acopio

Select * from centro_acopio_materiales

Select * from usuario

SELECT usuario.id, usuario.nombre, usuario.apellido
            FROM usuario
            WHERE usuario.tipo_usuario = 2 
            AND NOT EXISTS (
                SELECT 1
                FROM centro_acopio
                WHERE centro_acopio.id_usuario_admin = usuario.id and centro_acopio.id != 3
            )
            
SELECT canje.id, centro_acopio.nombre as name, canje.fecha, canje.total_economonedas
FROM canje, centro_acopio, usuario
where canje.id_centro_acopio = centro_acopio.id and usuario.id = 9 and canje.id_usuario = usuario.id

SELECT * from canje
