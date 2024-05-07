<?php
class CuponesModel
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
			$vSql = "SELECT cupones.id, cupones.nombre, cupones.descripcion, cupones.imagen,
            DATE_FORMAT(cupones.fecha_inicio, '%d-%m-%Y') as fecha_inicio,
            DATE_FORMAT(cupones.fecha_final, '%d-%m-%Y') as fecha_final,
            cupones.precio, tipo_cupones.descripcion as tipo_cupon, cupones.id_tipo_cupon
            from cupones, tipo_cupones
            where cupones.id_tipo_cupon = tipo_cupones.id and cupones.fecha_final > CURDATE()";
			
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
			$vSql = "SELECT * FROM cupones where id=$id";
			
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
            
			$sql = "INSERT into cupones (nombre, id_tipo_cupon, descripcion, precio, imagen, fecha_inicio, fecha_final)
                     VALUES ('$objeto->nombre','$objeto->id_tipo_cupon','$objeto->descripcion','$objeto->precio', '$objeto->imagen', '$objeto->fecha_inicio', '$objeto->fecha_final');";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idMaterial = $this->enlace->executeSQL_DML_last( $sql);
            
            //Retornar pelicula
            return $this->get($idMaterial);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function update($objeto) {
        try {
            //Consulta sql
            
			$sql = "UPDATE cupones SET nombre ='$objeto->nombre',
            id_tipo_cupon ='$objeto->id_tipo_cupon', descripcion ='$objeto->descripcion', precio ='$objeto->precio',
            imagen = '$objeto->imagen', fecha_inicio = '$objeto->fecha_inicio', fecha_final = '$objeto->fecha_final'
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
