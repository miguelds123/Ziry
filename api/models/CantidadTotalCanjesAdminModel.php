<?php
class CantidadTotalCanjesAdminModel
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
			$vSql = "SELECT COUNT(canje.id) as cantidad_canjes
            FROM canje
            where MONTH(canje.fecha) = MONTH(CURDATE()) 
            AND YEAR(canje.fecha) = YEAR(CURDATE());";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT COUNT(canje.id) as cantidad_canjes
            FROM canje
            where MONTH(canje.fecha) = MONTH(CURDATE()) 
            AND YEAR(canje.fecha) = YEAR(CURDATE())";
			
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
