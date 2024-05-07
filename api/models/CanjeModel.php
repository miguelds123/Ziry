<?php
class CanjeModel
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
			$vSql = "SELECT canje.id, centro_acopio.nombre as name, DATE_FORMAT(canje.fecha, '%d-%m-%Y') as fecha, canje.total_economonedas
            FROM canje, centro_acopio, usuario
            where canje.id_centro_acopio = centro_acopio.id and usuario.id = $id and canje.id_usuario = usuario.id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $consultaUltimoID = "SELECT MAX(id) as ultimo_id
            FROM canje;";

            $fecha_actual = date("Y-m-d H:i:s");
            
			$sql = "INSERT into canje (id_usuario, id_centro_acopio, fecha, total_economonedas)
                     VALUES ('$objeto->usuario', '$objeto->id_centro_acopio' ,'$fecha_actual', $objeto->total_economonedas );";

            $sqlBilletera = "UPDATE billetera SET id_usuario ='$objeto->id_usuario',
            ecomonedas_disponibles ='$objeto->ecomonedas_disponibles', ecomonedas_cajeadas ='$objeto->ecomonedas_cajeadas',
            ecomonedas_recibidas ='$objeto->ecomonedas_recibidas'
            Where id_usuario=$objeto->id_usuario";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idCentroAcopio = $this->enlace->executeSQL_DML_last( $sql);

            $BilleteraUsuario = $this->enlace->executeSQL_DML_last( $sqlBilletera);

            $vResultadoUltimoID = $this->enlace->ExecuteSQL ( $consultaUltimoID);

            $vResultadoUltimoID = $vResultadoUltimoID[0];

            $siguienteID = intval($vResultadoUltimoID->ultimo_id);

            $contador = 0;

            //--- Materiales ---
            //Crear elementos a insertar en materiales
            foreach ($objeto->materiales as $material) {
                $arrayInfoMaterial = $objeto->arrayInfoMaterial;
                $subtotal = intval($arrayInfoMaterial[$contador]->valor) * intval($material->cantidad);
                $sql = "INSERT INTO canje_materiales(id_canje, id_material, cantidad, subtotal) VALUES($siguienteID, $material->id_material, $material->cantidad, $subtotal)";
                $vResultado = $this->enlace->executeSQL_DML($sql);
                $contador++;
            } 
            
            //Retornar pelicula
            return $this->get($objeto->usuario);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
}
