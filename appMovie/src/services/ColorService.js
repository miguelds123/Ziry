import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class ColorService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getColores(){
    return axios.get(BASE_URL+"color");
  }
 }
 export default new ColorService()