<?php
class Canje_MaterialesModel
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
			$vSql = "SELECT * FROM canje_materiales;";
			
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
			$vSql = "SELECT material.nombre, canje_materiales.cantidad, canje_materiales.subtotal
            FROM material, canje_materiales, canje
            where canje_materiales.id_material = material.id and canje.id = canje_materiales.id_canje and canje.id = $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
  
    
}
