import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class DashboardCentroAcopioService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCantidadMes(usuarioID){
    return axios.get(BASE_URL+"CantidadCanjesCentroAcopioMes/"+usuarioID);
  }
  getCantidadAno(usuarioID){
    return axios.get(BASE_URL+"CantidadCanjesCentroAcopioAno/"+usuarioID);
  }
  getTotal(usuarioID){
    return axios.get(BASE_URL+"CantidadCanjesCentroAcopioTotal/"+usuarioID);
  }
 }
 export default new DashboardCentroAcopioService()