import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class tipoUsuariosService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getTipoUsuario(){
    return axios.get(BASE_URL+"tipousuarios");
  }
  //localhost:81/api/movie/2
  getTipoUsuarioById(Correo){
    return axios.get(BASE_URL+"tipousuarios/"+Correo)
  }
 }
 export default new tipoUsuariosService()