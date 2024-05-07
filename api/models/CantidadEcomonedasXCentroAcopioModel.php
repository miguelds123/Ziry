<?php
class CantidadEcomonedasXCentroAcopioModel
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
			$vSql = "SELECT centro_acopio.nombre, SUM(canje.total_economonedas) as total
            FROM centro_acopio, canje
            where centro_acopio.id = canje.id_centro_acopio AND YEAR(canje.fecha) = YEAR(CURDATE())
            group by centro_acopio.nombre;";
			
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
            FROM centro_acopio, canje
            where centro_acopio.id = canje.id_centro_acopio AND YEAR(canje.fecha) = YEAR(CURDATE())
            group by centro_acopio.nombre";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
