import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CuponCanjeadoService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  //localhost:81/api/movie/2
  getCuponCanjeadoById(MaterialId){
    return axios.get(BASE_URL+"cupon_canjeado/"+MaterialId)
  }
  createCuponCanjeado(Cupon){
    console.log(Cupon)
    return axios.post(BASE_URL+"cupon_canjeado/", Cupon);
  }
 }
 export default new CuponCanjeadoService()