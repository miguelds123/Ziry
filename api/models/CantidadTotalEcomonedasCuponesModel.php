<?php
class CantidadTotalEcomonedasCuponesModel
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
			$vSql = "SELECT SUM(cupones.precio) as total
            FROM cupon_canjeado, cupones
            where cupon_canjeado.id_cupon = cupones.id and YEAR(cupon_canjeado.fecha) = YEAR(CURDATE());";
			
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
			$vSql = "SELECT SUM(cupones.precio) as total
            FROM cupon_canjeado, cupones
            where cupon_canjeado.id_cupon = cupones.id and YEAR(cupon_canjeado.fecha) = YEAR(CURDATE())";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
