import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class DashboardAdminService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCantidadCanjesCupones(){
    return axios.get(BASE_URL+"CantidadCanjesCupones");
  }
  getCantidadEcomonedasXCentroAcopio(){
    return axios.get(BASE_URL+"CantidadEcomonedasXCentroAcopio");
  }
  getCantidadSumatoriaEcomonedas(){
    return axios.get(BASE_URL+"CantidadSumatoriaEcomonedas");
  }
  getCantidadTotalCanjesAdmin(){
    return axios.get(BASE_URL+"CantidadTotalCanjesAdmin");
  }
  getCantidadTotalEcomonedasCupones(){
    return axios.get(BASE_URL+"CantidadTotalEcomonedasCupones");
  }
 }
 export default new DashboardAdminService()