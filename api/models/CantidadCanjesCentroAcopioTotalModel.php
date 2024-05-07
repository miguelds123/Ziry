<?php
class CantidadCanjesCentroAcopioTotalModel
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
			$vSql = "SELECT centro_acopio.id, centro_acopio.nombre, provincia.descripcion as provincia, canton.descripcion as canton,
            centro_acopio.direccion, centro_acopio.telefono, centro_acopio.horario, concat(usuario.nombre, ' ', usuario.apellido) as nombreUsuario
            from centro_acopio, provincia, canton, usuario
            where centro_acopio.id_provincia = provincia.id and centro_acopio.id_canton = canton.id and 
            canton.id_provincia = provincia.id and centro_acopio.id_usuario_admin = usuario.id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT centro_acopio.nombre, SUM(canje.total_economonedas) as total
            FROM centro_acopio, canje, usuario
            where canje.id_centro_acopio = centro_acopio.id and centro_acopio.id_usuario_admin = usuario.id and usuario.id = $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
