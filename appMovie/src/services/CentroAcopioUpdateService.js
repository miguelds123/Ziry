import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CentroAcopioUpdateService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  //localhost:81/api/movie/2
  getCentroAcopioById(CentroAcopioId){
    return axios.get(BASE_URL+"centro_acopio_update/"+CentroAcopioId)
  }
 }
 export default new CentroAcopioUpdateService()