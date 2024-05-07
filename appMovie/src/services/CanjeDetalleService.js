import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CanjeMaterialesService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCanjeMateriales(CanjeId){
    return axios.get(BASE_URL+"canjedetalle/" + CanjeId);
  }
 }
 export default new CanjeMaterialesService()