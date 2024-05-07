import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class DistritoService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getDistrito(){
    return axios.get(BASE_URL+"distrito");
  }
 }
 export default new DistritoService()