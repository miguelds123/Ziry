<?php
class adminListModel
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
			$vSql = "SELECT usuario.id, usuario.correo, usuario.nombre, usuario.apellido, usuario.telefono, usuario.cedula,
            provincia.descripcion as provincia, canton.descripcion as canton, distrito.descripcion as distrito,
            usuario.activo
            from usuario, provincia, canton, distrito
            where usuario.id_provincia = provincia.id and usuario.id_canton = canton.id and usuario.id_distrito = distrito.id
            and distrito.id_provincia = provincia.id and distrito.id_canton = canton.id and canton.id_provincia = provincia.id and usuario.tipo_usuario = 2
            ";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
