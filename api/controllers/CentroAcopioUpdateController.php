<?php
//class Actor
class centro_acopio_update{
    //Listar en el API
    
    public function get($param){
        
        $genero=new CentroAcopioUpdateModel();
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