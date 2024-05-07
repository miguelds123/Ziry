<?php
class CantidadCanjesCuponesModel
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
			$vSql = "SELECT COUNT(cupon_canjeado.id_cupon_canjeado) as cantidad_cupones
            FROM cupon_canjeado
            where YEAR(cupon_canjeado.fecha) = YEAR(CURDATE());";
			
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
			$vSql = "SELECT COUNT(cupon_canjeado.id_cupon_canjeado) as cantidad_cupones
            FROM cupon_canjeado
            where YEAR(cupon_canjeado.fecha) = YEAR(CURDATE())";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
