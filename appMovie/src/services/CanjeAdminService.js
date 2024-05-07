import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CanjeAdminService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getUsuariosAdmin(CanjeAdminId){
    return axios.get(BASE_URL+"canjeadmin/" + CanjeAdminId);
  }
 }
 export default new CanjeAdminService()