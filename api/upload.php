<?php
$uploadDir = 'fotos/'; // Directorio donde se guardarán las imágenes

// Verifica si se envió un archivo
if(isset($_FILES['imagen'])){
    $errors = array();
    $file_name = $_FILES['imagen']['name'];
    $file_size = $_FILES['imagen']['size'];
    $file_tmp = $_FILES['imagen']['tmp_name'];
    $file_type = $_FILES['imagen']['type'];
    $file_ext = strtolower(end(explode('.', $_FILES['imagen']['name'])));

    $extensions = array("jpeg", "jpg", "png");

    // Verifica la extensión del archivo
    if(!in_array($file_ext, $extensions)){
        $errors[] = "Extensión no permitida, elige una imagen JPEG o PNG.";
    }

    // Verifica el tamaño del archivo (20 MB en este ejemplo)
    if($file_size > 20971520){
        $errors[] = 'Tamaño del archivo demasiado grande';
    }

    if(empty($errors) == true){
        // Mueve el archivo al directorio de destino
        move_uploaded_file($file_tmp, $uploadDir . $file_name);
        echo json_encode(array('success' => true, 'message' => '¡Éxito!', 'filename' => $file_name));
    } else {
        // Informa sobre los errores
        echo json_encode(array('success' => false, 'errors' => $errors));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'No se recibió ningún archivo.'));
}
?>