<?php
class Usuario_AdminLibreModel
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
			$vSql = "SELECT usuario.id, usuario.nombre, usuario.apellido
            FROM usuario
            WHERE usuario.tipo_usuario = 2
            AND NOT EXISTS (
                SELECT 1
                FROM centro_acopio
                WHERE centro_acopio.id_usuario_admin = usuario.id
            );";
			
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
			$vSql = "SELECT usuario.id, usuario.nombre, usuario.apellido
            FROM usuario
            WHERE usuario.tipo_usuario = 2 
            AND NOT EXISTS (
                SELECT 1
                FROM centro_acopio
                WHERE centro_acopio.id_usuario_admin = usuario.id and centro_acopio.id != $id
            )";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
  
    
}
