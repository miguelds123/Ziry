<?php
//class Actor
class CantidadEcomonedasXCentroAcopio{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new CantidadEcomonedasXCentroAcopioModel();
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
        
        $genero=new CantidadEcomonedasXCentroAcopioModel();
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
}