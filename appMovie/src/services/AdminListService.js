import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class AdminListService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getAdmins(){
    return axios.get(BASE_URL+"adminlist");
  }
}
  export default new AdminListService()