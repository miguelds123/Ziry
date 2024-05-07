import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CentroAcopioMaterialesService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getAll(){
    return axios.get(BASE_URL+"centroacopiomateriales");
  }
  //localhost:81/api/movie/2
  getMaterialByCentroAcopioId(CentroAcopioId){
    return axios.get(BASE_URL+"centroacopiomateriales/"+CentroAcopioId)
  }
 }
 export default new CentroAcopioMaterialesService()