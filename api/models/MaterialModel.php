<?php
class MaterialModel
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
			$vSql = "SELECT material.id, material.nombre, material.descripcion, material.valor, material.imagen, 
            material.unidad_medida, material.color, tipo_material.descripcion as nombre_tipo
            FROM material, tipo_material
            where material.tipo_material = tipo_material.id;";
			
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
			$vSql = "SELECT * FROM material where id=$id";
			
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
            
			$sql = "INSERT into material (nombre, tipo_material, descripcion, valor, imagen, unidad_medida, color, activo)
                     VALUES ('$objeto->nombre','$objeto->tipo_material','$objeto->descripcion','$objeto->valor', '$objeto->imagen', '$objeto->unidad_medida', '$objeto->color', 1);";
			
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
            
			$sql = "UPDATE material SET nombre ='$objeto->nombre',
            tipo_material ='$objeto->tipo_material', descripcion ='$objeto->descripcion', valor ='$objeto->valor',
            unidad_medida = '$objeto->unidad_medida', color = '$objeto->color', activo = '$objeto->activo'
            Where id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar pelicula
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }    
}
