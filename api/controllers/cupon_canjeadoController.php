<?php
//class Actor
class Cupon_canjeado{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new Cupon_canjeadoModel();
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
        
        $genero=new Cupon_canjeadoModel();
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
                'results'=>"No existe el material"
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
        $material = new Cupon_canjeadoModel();
        //Acción del modelo a ejecutar
        $response = $material->create($object);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => 'El cupón a sido canjeado'
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
    


}