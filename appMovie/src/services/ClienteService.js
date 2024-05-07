import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class ClienteService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getClientes(){
    return axios.get(BASE_URL+"clientelist");
  }
}
  export default new ClienteService()