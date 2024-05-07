import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CentroAcopioService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCentroAcopio(){
    return axios.get(BASE_URL+"centro_acopio");
  }
  //localhost:81/api/movie/2
  getCentroAcopioById(CentroAcopioId){
    return axios.get(BASE_URL+"centro_acopio/"+CentroAcopioId)
  }
  CreateCentroAcopio(CentroAcopio){
    return axios.post(BASE_URL+"centro_acopio", CentroAcopio);
  }
  UpdateCentroAcopio(CentroAcopio){
    return axios.put(BASE_URL+"centro_acopio", CentroAcopio);
  }
 }
 export default new CentroAcopioService()