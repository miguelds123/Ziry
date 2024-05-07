import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CantonService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCanton(){
    return axios.get(BASE_URL+"canton");
  }
  //localhost:81/api/movie/2
  getCantonById(CantonId){
    return axios.get(BASE_URL+"canton/"+CantonId)
  }
  createCanton(Canton){
    return axios.post(BASE_URL+"canton", Canton);
}
 }
 export default new CantonService()