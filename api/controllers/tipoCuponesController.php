<?php
//class Actor
class tipoCupones{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new tipoCuponesModel();
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

}