<?php
//class Actor
class centro_acopio{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new CentroAcopioModel();
        $response=$genero->all();
        //Si hay respuesta
        if(isset($response) && !empty($response)){
            //Armar el json
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }
    public function get($param){
        
        $genero=new CentroAcopioModel();
        $response=$genero->get($param);
        $json=array(
            'status'=>200,
            'results'=>$response
        );
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el centro de acopio"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
        
    }

    public function create()
    {
        //Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        //Decodificar json
        $object = json_decode($inputJSON);
        //Instancia del modelo
        $centroAcopio = new CentroAcopioModel();
        //Acción del modelo a ejecutar
        $response = $centroAcopio->create($object);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => 'Centro de Acopio creado'
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No se creo el recurso"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );

    }

    public function update()
    {
        //Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        //Decodificar json
        $object = json_decode($inputJSON);
        //Instancia del modelo
        $movie = new CentroAcopioModel();
        //Acción del modelo a ejecutar
        $response = $movie->update($object);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Pelicula actualizada"
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No se actualizo el recurso"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
}