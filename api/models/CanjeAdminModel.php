<?php
class CanjeAdminModel
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
			$vSql = "SELECT * FROM canje;";
			
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
			$vSql = "SELECT canje.id, centro_acopio.nombre as name, DATE_FORMAT(canje.fecha, '%d-%m-%Y') as fecha, canje.total_economonedas, canje.id_usuario
            FROM canje, centro_acopio, usuario
            where canje.id_centro_acopio = centro_acopio.id and centro_acopio.id_usuario_admin = usuario.id and usuario.id = $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
