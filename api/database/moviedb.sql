-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-09-2023 a las 16:24:58
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `moviedb`
--
CREATE DATABASE IF NOT EXISTS `moviedb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `moviedb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actor`
--

CREATE TABLE `actor` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `actor`
--

INSERT INTO `actor` (`id`, `fname`, `lname`) VALUES
(1, 'Sam', 'Worthington'),
(2, 'Zoe', 'Saldana'),
(3, 'Sigourney', 'Weaver'),
(4, 'Tom', 'Cruise'),
(5, 'Miles', 'Teller'),
(6, 'Jennifer', 'Connelly'),
(7, 'Jon', 'Hamm'),
(8, 'Letitia', 'Wright'),
(9, 'Lupita', 'Nyongo'),
(10, 'Danai', 'Gurira'),
(11, 'Tim', 'Robbins'),
(12, 'Morgan', 'Freeman'),
(13, 'Bob\r\n\r\n', 'Gunton'),
(14, 'Chris', 'Pratt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `director`
--

CREATE TABLE `director` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `director`
--

INSERT INTO `director` (`id`, `fname`, `lname`, `bio`) VALUES
(1, 'Joseph', 'Kosinski', 'Joseph Kosinski nació el 3 de mayo de 1974 en Iowa, Estados Unidos.'),
(2, 'James', 'Cameron', 'James Cameron nació el 16 de agosto de 1954 en Ontario, Canadá.'),
(3, 'Ryan', 'Coogler', 'Ryan Coogler nació el 23 de mayo de 1986 en Oakland, California, Estados Unidos.'),
(4, 'Frank', 'Darabont', 'Frank Darabont nació el 28 de enero de 1959 en Francia.'),
(5, 'James', 'Gunn', 'James Gunn nació el 5 de agosto de 1966 en St. Louis, Missouri, Estados Unidos.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `genre`
--

INSERT INTO `genre` (`id`, `title`) VALUES
(1, 'Aventura'),
(2, 'Acción'),
(3, 'Ciencia Ficción'),
(4, 'Comedia'),
(5, 'Drama'),
(6, 'Fantasía'),
(7, 'Musical'),
(8, 'Terror');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `year` smallint(4) UNSIGNED NOT NULL,
  `time` tinyint(4) UNSIGNED NOT NULL,
  `director_id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `movie`
--

INSERT INTO `movie` (`id`, `title`, `year`, `time`, `director_id`, `lang`) VALUES
(1, 'Top Gun: Maverick', 2022, 130, 1, 'Inglés'),
(2, 'Avatar', 2009, 162, 2, 'Inglés'),
(3, 'Black Panther: Wakanda Forever', 2022, 161, 3, 'Inglés'),
(4, 'Cadena perpetua', 1994, 142, 4, 'Inglés'),
(5, 'Guardianes de la Galaxia', 2014, 121, 5, 'Inglés'),
(6, 'Prueba Pelicula 1.1', 2023, 160, 1, 'Español');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie_cast`
--

CREATE TABLE `movie_cast` (
  `actor_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `movie_cast`
--

INSERT INTO `movie_cast` (`actor_id`, `movie_id`, `role`) VALUES
(1, 2, 'Jake Sully'),
(2, 2, 'Neytiri Sully'),
(2, 5, 'Gamora'),
(3, 2, 'Doctora Grace Augustine'),
(4, 1, 'Pete Mitchell'),
(5, 1, 'Bradley Bradshaw'),
(5, 6, 'actor 1.1'),
(6, 1, 'Penny Benjamin'),
(6, 6, 'actor 1.2'),
(7, 1, 'Beau Simpson'),
(8, 3, 'Shuri'),
(9, 3, 'Nakia'),
(10, 3, 'Okoye'),
(11, 4, 'Andy Dufresne'),
(12, 4, 'Ellis Boyd, Red'),
(13, 4, 'Warden Notron'),
(14, 5, 'Peter Quill');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie_genre`
--

CREATE TABLE `movie_genre` (
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `movie_genre`
--

INSERT INTO `movie_genre` (`movie_id`, `genre_id`) VALUES
(1, 2),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 6),
(3, 1),
(3, 2),
(3, 5),
(4, 5),
(5, 1),
(5, 2),
(5, 4),
(6, 5),
(6, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rating`
--

CREATE TABLE `rating` (
  `movie_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `stars` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rating`
--

INSERT INTO `rating` (`movie_id`, `user_id`, `stars`) VALUES
(1, 1, 4),
(1, 2, 4),
(2, 1, 3),
(2, 2, 4),
(3, 1, 5),
(3, 2, 4),
(4, 1, 3),
(4, 2, 4),
(5, 1, 4),
(5, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `name` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `name`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `rol_id` int(11) NOT NULL DEFAULT 2,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `rol_id`, `date_created`, `date_updated`) VALUES
(1, 'Prueba Usuario1', 'prueba-usuario1@prueba.com', '$2y$10$1ueeLDj8HL5ghcusBD/byOYhlcDBSiailMADfTkQ76dgU4IevRmNK', 1, '2023-01-04 17:54:45', '2023-01-04 17:54:45'),
(2, 'Prueba Usuario2', 'prueba-usuario2@prueba.com', '$2y$10$1ueeLDj8HL5ghcusBD/byOYhlcDBSiailMADfTkQ76dgU4IevRmNK', 2, '2023-01-23 15:54:45', '2023-01-23 15:54:45');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movie_director_idx` (`director_id`);

--
-- Indices de la tabla `movie_cast`
--
ALTER TABLE `movie_cast`
  ADD PRIMARY KEY (`actor_id`,`movie_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indices de la tabla `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indices de la tabla `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`movie_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email` (`email`),
  ADD KEY `fk_user_rol_idx` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actor`
--
ALTER TABLE `actor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `director`
--
ALTER TABLE `director`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `fk_movie_director` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `movie_cast`
--
ALTER TABLE `movie_cast`
  ADD CONSTRAINT `movie_cast_ibfk_1` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`),
  ADD CONSTRAINT `movie_cast_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

--
-- Filtros para la tabla `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `movie_genre_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
  ADD CONSTRAINT `movie_genre_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

--
-- Filtros para la tabla `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
