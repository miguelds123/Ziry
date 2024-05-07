<?php
class UsuarioModel
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
			$vSql = "SELECT * FROM usuario where tipo_usuario = 3;";
			
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
            $rolM=new RolModel();
            //Consulta sql
			$vSql = "SELECT * FROM usuario where id=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            if($vResultado){
				$vResultado=$vResultado[0];
				$rol=$rolM->getRolUser($id);
				$vResultado->rol=$rol;
				// Retornar el objeto
				return $vResultado;
			}else{
				return null;
			}
			// Retornar el objeto
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function login($objeto) {
        try {
            
			$vSql = "SELECT * from usuario where correo='$objeto->correo'";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			if(is_object($vResultado[0])){
				$user=$vResultado[0];
				if(password_verify($objeto->contrasena, $user->contrasena))  
                    {
						return $this->get($user->id);
					}

			}else{
				return false;
			}
           
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function create($objeto) {
        try {
			if(isset($objeto->contrasena)&& $objeto->contrasena!=null){
				$crypt=password_hash($objeto->contrasena, PASSWORD_BCRYPT);
				$objeto->contrasena=$crypt;
			}
            $fecha_actual = date("Y-m-d");
            //Consulta sql            
			$vSql = "INSERT into usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, cedula, id_provincia, id_canton, id_distrito, activo, tipo_usuario) 
            Values ('$objeto->correo','$objeto->contrasena','$objeto->nombre','$objeto->apellido', $fecha_actual, '$objeto->telefono', '$objeto->cedula', $objeto->id_provincia, $objeto->id_canton, $objeto->id_distrito, 1, $objeto->tipo_usuario)";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML_last( $vSql);

			$sqlBilletera = "INSERT into billetera (id_usuario, ecomonedas_disponibles, ecomonedas_cajeadas, ecomonedas_recibidas)
			VALUES ('$vResultado', 0, 0, 0);";

			$vResultadoBilletera = $this->enlace->executeSQL_DML_last( $sqlBilletera);
			// Retornar el objeto creado
            return $this->get($vResultado);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

	public function update($objeto) {
        try {
            //Consulta sql
            
			$sql = "UPDATE usuario SET correo ='$objeto->correo',
            nombre ='$objeto->nombre', apellido ='$objeto->apellido', telefono ='$objeto->telefono',
            cedula = '$objeto->cedula', id_provincia = '$objeto->id_provincia', id_canton = '$objeto->id_canton', id_distrito = '$objeto->id_distrito'
            Where id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar pelicula
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }    

	public function contra($objeto) {
        try {
			if(isset($objeto->contrasena)&& $objeto->contrasena!=null){
				$crypt=password_hash($objeto->contrasena, PASSWORD_BCRYPT);
				$objeto->contrasena=$crypt;
			}
            //Consulta sql
            
			$sql = "UPDATE usuario
            set contrasena = '$objeto->contrasena'
            where id = '$objeto->id'";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar pelicula
            return $cResults;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }    
    
}
