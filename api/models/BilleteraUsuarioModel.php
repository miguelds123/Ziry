<?php
class BilleteraUsuarioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM billetera;";
			
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
			$vSql = "SELECT billetera.ecomonedas_disponibles, billetera.ecomonedas_cajeadas, 
            billetera.ecomonedas_recibidas, usuario.nombre, usuario.apellido
            FROM billetera, usuario
            where id_usuario=$id and billetera.id_usuario = usuario.id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable
            
			$sql = "INSERT into billetera (id_usuario, ecomonedas_disponibles, ecomonedas_cajeadas, ecomonedas_recibidas)
                     VALUES ('$objeto->id_usuario', 0, 0, 0);";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idMaterial = $this->enlace->executeSQL_DML_last( $sql);
            
            //Retornar pelicula
            return $this->get($idMaterial);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
     /**
	 * Actualizar pelicula
	 * @param $objeto pelicula a actualizar
	 * @return $this->get($idMaterial) - Objeto pelicula
	 */
	//

    public function update($objeto) {
        try {
            //Consulta sql
            
			$sql = "UPDATE billetera SET id_usuario ='$objeto->id_usuario',
            ecomonedas_disponibles ='$objeto->ecomonedas_disponibles', ecomonedas_cajeadas ='$objeto->ecomonedas_cajeadas',
            ecomonedas_recibidas ='$objeto->ecomonedas_recibidas'
            Where id_usuario=$objeto->id_usuario";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar pelicula
            return $this->get($objeto->id_usuario);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }    
}
