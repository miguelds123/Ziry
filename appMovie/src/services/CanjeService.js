import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CanjeService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCanje(UsuarioId){
    return axios.get(BASE_URL+"canje/" + UsuarioId);
  }
  CreateCanje(canje){
    console.log(canje);
    return axios.post(BASE_URL+"canje", canje);
  }
 }
 
 export default new CanjeService()