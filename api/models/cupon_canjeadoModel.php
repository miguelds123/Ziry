<?php
class Cupon_canjeadoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT cupon_canjeado.fecha, cupon_canjeado.id_usuario, cupon_canjeado.id_cupon, usuario.nombre, usuario.apellido, usuario.correo, usuario.telefono,
            cupones.nombre as nombre_cupon, cupones.descripcion, cupones.precio
            FROM cupon_canjeado, usuario, cupones
            where cupon_canjeado.id_usuario = usuario.id and cupon_canjeado.id_cupon = cupones.id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT cupon_canjeado.fecha, cupon_canjeado.id_usuario, cupon_canjeado.id_cupon, usuario.nombre, usuario.apellido, usuario.correo, usuario.telefono,
            cupones.nombre as nombre_cupon, cupones.descripcion, cupones.precio
            FROM cupon_canjeado, usuario, cupones
            where cupon_canjeado.id_usuario = usuario.id and cupon_canjeado.id_cupon = cupones.id and cupon_canjeado.id_usuario = $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $fecha_actual = date("Y-m-d H:i:s");
            
			$sql = "INSERT into cupon_canjeado (id_usuario, id_cupon, fecha)
                     VALUES ('$objeto->id_usuario','$objeto->id_cupon','$fecha_actual');";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idMaterial = $this->enlace->executeSQL_DML_last( $sql);
            
            //Retornar pelicula
            return $this->get($objeto->id_usuario);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}