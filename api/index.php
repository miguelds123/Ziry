<?php
/* Mostrar errores */
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', "C:/xampp/htdocs/peliculas/php_error_log");
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

/*--- Requerimientos Clases o librerías*/
require_once "models/MySqlConnect.php";

/***--- Agregar todos los modelos*/
require_once "models/UsuarioModel.php";
require_once "models/MaterialModel.php";
require_once "models/CentroAcopioModel.php";
require_once "models/CanjeModel.php";
require_once "models/CuponesModel.php";
require_once "models/distritoModel.php";
require_once "models/canje_MaterialesModel.php";
require_once "models/CentroAcopioMaterialesModel.php";
require_once "models/cupon_canjeadoModel.php";
require_once "models/cantonModel.php";
require_once "models/provinciaModel.php";
require_once "models/usuario_AdminModel.php";
require_once "models/CanjeAdminModel.php";
require_once "models/canjeDetalleModel.php";
require_once "models/coloresModel.php";
require_once "models/tipoMaterialModel.php";
require_once "models/usuario_AdminLibreModel.php";
require_once "models/CentroAcopioUpdateModel.php";
require_once "models/RolModel.php";
require_once "models/clienteListModel.php";
require_once "models/adminListModel.php";
require_once "models/tipoCuponesModel.php";
require_once "models/BilleteraUsuarioModel.php";
require_once "models/CantidadCanjesCentroAcopioMesModel.php";
require_once "models/CantidadCanjesCentroAcopioAnoModel.php";
require_once "models/CantidadCanjesCentroAcopioTotalModel.php";
require_once "models/tipoUsuariosModel.php";
require_once "models/CentroAcopioUsuarioAdminModel.php";
require_once "models/CantidadTotalCanjesAdminModel.php";
require_once "models/CantidadEcomonedasXCentroAcopioModel.php";
require_once "models/CantidadSumatoriaEcomonedasModel.php";
require_once "models/CantidadCanjesCuponesModel.php";
require_once "models/CantidadTotalEcomonedasCuponesModel.php";
/***--- Agregar todos los controladores*/
require_once "controllers/UsuarioController.php";
require_once "controllers/MaterialController.php";
require_once "controllers/CentroAcopioController.php";
require_once "controllers/CanjeController.php";
require_once "controllers/distritoController.php";
require_once "controllers/CuponesController.php";
require_once "controllers/canje_MaterialesController.php";
require_once "controllers/CentroAcopioMaterialesController.php";
require_once "controllers/cupon_canjeadoController.php";
require_once "controllers/cantonController.php";
require_once "controllers/provinciaController.php";
require_once "controllers/Usuario_AdminController.php";
require_once "controllers/CanjeAdminController.php";
require_once "controllers/canjeDetalleController.php";
require_once "controllers/coloresController.php";
require_once "controllers/tipoMaterialController.php";
require_once "controllers/Usuario_AdminLibreController.php";
require_once "controllers/CentroAcopioUpdateController.php";
require_once "controllers/clienteListController.php";
require_once "controllers/adminListController.php";
require_once "controllers/tipoCuponesController.php";
require_once "controllers/BilleteraUsuarioController.php";
require_once "controllers/CantidadCanjesCentroAcopioMesController.php";
require_once "controllers/CantidadCanjesCentroAcopioAnoController.php";
require_once "controllers/CantidadCanjesCentroAcopioTotalController.php";
require_once "controllers/tipoUsuariosController.php";
require_once "controllers/CentroAcopioUsuarioAdminController.php";
require_once "controllers/CantidadTotalCanjesAdminController.php";
require_once "controllers/CantidadEcomonedasXCentroAcopioController.php";
require_once "controllers/CantidadSumatoriaEcomonedasController.php";
require_once "controllers/CantidadCanjesCuponesController.php";
require_once "controllers/CantidadTotalEcomonedasCuponesController.php";
//Enrutador
//RoutesController.php
require_once "controllers/RoutesController.php";
$index = new RoutesController();
$index->index();
