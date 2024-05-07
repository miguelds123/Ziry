import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class tipoMaterialService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getTipoMateriales(){
    return axios.get(BASE_URL+"tipomaterial");
  }
 }
 export default new tipoMaterialService()