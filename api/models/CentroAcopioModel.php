<?php
class CentroAcopioModel
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
			$vSql = "SELECT centro_acopio.id, centro_acopio.nombre, provincia.descripcion as provincia, canton.descripcion as canton,
            centro_acopio.direccion, centro_acopio.telefono, centro_acopio.horario, concat(usuario.nombre, ' ', usuario.apellido) as nombreUsuario
            from centro_acopio, provincia, canton, usuario
            where centro_acopio.id_provincia = provincia.id and centro_acopio.id_canton = canton.id and 
            canton.id_provincia = provincia.id and centro_acopio.id_usuario_admin = usuario.id;";
			
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
			$vSql = "SELECT centro_acopio.id, centro_acopio.nombre, provincia.descripcion as provincia, canton.descripcion as canton, provincia.id as id_provincia, canton.id as id_canton,
            centro_acopio.direccion, centro_acopio.telefono, centro_acopio.horario, concat(usuario.nombre, ' ', usuario.apellido) as nombreUsuario, usuario.id as id_usuario_admin
            from centro_acopio, provincia, canton, usuario
            where centro_acopio.id_provincia = provincia.id and centro_acopio.id_canton = canton.id and 
            canton.id_provincia = provincia.id and centro_acopio.id_usuario_admin = usuario.id and centro_acopio.id= $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

            $vResultado = $vResultado[0];

            $materiales = new CentroAcopioMaterialesModel();

            $listaMateriales = $materiales -> get($id);

            $vResultado -> materiales = $listaMateriales;

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
            FROM centro_acopio;";
            
			$sql = "INSERT into centro_acopio (nombre, id_provincia, id_canton, direccion, telefono, horario, id_usuario_admin, activo)
                     VALUES ('$objeto->nombre','$objeto->id_provincia','$objeto->id_canton','$objeto->direccion', '$objeto->telefono', '$objeto->horario', '$objeto->id_usuario_admin', 1);";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idCentroAcopio = $this->enlace->executeSQL_DML_last( $sql);

            $vResultadoUltimoID = $this->enlace->ExecuteSQL ( $consultaUltimoID);

            $vResultadoUltimoID = $vResultadoUltimoID[0];

            $siguienteID = intval($vResultadoUltimoID->ultimo_id);

            //--- Materiales ---
            //Crear elementos a insertar en materiales
            foreach ($objeto->materiales as $material) {
                $sql = "INSERT INTO centro_acopio_materiales(id_centro_acopio,id_material) VALUES($siguienteID, $material->id_material)";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            } 
            
            //Retornar pelicula
            return $this->get($idCentroAcopio);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function update($objeto) {
        try {
            //Consulta sql
            
			$sql = "UPDATE centro_acopio SET nombre ='$objeto->nombre',
            id_provincia ='$objeto->id_provincia', id_canton ='$objeto->id_canton', direccion ='$objeto->direccion',
            telefono = '$objeto->telefono', horario = '$objeto->horario', id_usuario_admin = '$objeto->id_usuario_admin',
            activo = 1
            Where id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //--- Actores ---
            
			$sql = "DELETE from centro_acopio_materiales Where id_centro_acopio=$objeto->id";
			$cResults = $this->enlace->executeSQL_DML( $sql);
            //Crear elementos a insertar en actores
            foreach( $objeto->materiales as $row){
                $dataMateriales[]=array($objeto->id,$row->id_material);
            }
            foreach($dataMateriales as $row){
                
                $sql = "INSERT INTO centro_acopio_materiales(id_centro_acopio,id_material) VALUES($row[0],$row[1]);";
                $vResultado = $this->enlace->executeSQL_DML($sql);
                    
            }
            //Retornar pelicula
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }    
    
}
