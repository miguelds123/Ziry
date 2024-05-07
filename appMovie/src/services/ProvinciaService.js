import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class ProvinciaService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getProvincia(){
    return axios.get(BASE_URL+"provincia");
  }
  //localhost:81/api/movie/2
  getProvinciaById(provinciaId){
    return axios.get(BASE_URL+"provincia/"+provinciaId)
  }
  createProvincia(provincia){
    return axios.post(BASE_URL+"provincia", provincia);
}
 }
 export default new ProvinciaService()