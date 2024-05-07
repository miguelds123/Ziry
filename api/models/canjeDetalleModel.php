<?php
class CanjeDetalleModel
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
			$vSql = "SELECT canje.id, centro_acopio.nombre, DATE_FORMAT(canje.fecha, '%d-%m-%Y') as fecha, canje.total_economonedas, concat(usuario.nombre, ' ', usuario.apellido) as nombreUsuario, usuario.correo, usuario.cedula
            FROM canje, centro_acopio, usuario
            where canje.id_centro_acopio = centro_acopio.id and canje.id_usuario = usuario.id and canje.id = $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

            $vResultado = $vResultado[0];

            $detalle = new Canje_MaterialesModel();

            $listaDetalles = $detalle -> get($id);

            $vResultado -> detalle = $listaDetalles;
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
  
    
}
