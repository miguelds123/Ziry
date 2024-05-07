import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CentroAcopioUsuarioAdminService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCentroAcopioUsuarioAdmin(){
    return axios.get(BASE_URL+"CentroAcopioUsuarioAdmin");
  }
  //localhost:81/api/movie/2
  getCentroAcopioUsuarioAdminById(UsuarioID){
    return axios.get(BASE_URL+"CentroAcopioUsuarioAdmin/"+UsuarioID)
  }
 }
 export default new CentroAcopioUsuarioAdminService()