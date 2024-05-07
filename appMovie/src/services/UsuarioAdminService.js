import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class UsuarioAdminService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getUsuariosAdmin(){
    return axios.get(BASE_URL+"usuario_admin");
  }
  getUsuariosAdminLibre(){
    return axios.get(BASE_URL+"usuario_admin_libre");
  }
  getUsuarioAdminUpdate(IDCentroAcopio){
    return axios.get(BASE_URL+"usuario_admin_libre/"+IDCentroAcopio)
  }
 }
 export default new UsuarioAdminService()