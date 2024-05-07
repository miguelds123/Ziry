<?php
class CentroAcopioUpdateModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    
    /*Obtener */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT centro_acopio.id, centro_acopio.nombre, provincia.descripcion as provincia, canton.descripcion as canton, provincia.id as id_provincia, canton.id as id_canton,
            centro_acopio.direccion, centro_acopio.telefono, centro_acopio.horario, concat(usuario.nombre, ' ', usuario.apellido) as nombreUsuario, usuario.id as id_usuario_admin
            from centro_acopio, provincia, canton, usuario
            where centro_acopio.id_provincia = provincia.id and centro_acopio.id_canton = canton.id and 
            canton.id_provincia = provincia.id and centro_acopio.id_usuario_admin = usuario.id and centro_acopio.id= $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

            $vResultado = $vResultado[0];

			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
