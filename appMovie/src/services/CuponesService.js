import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class CuponesService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCupones(){
    return axios.get(BASE_URL+"cupones");
  }
  //localhost:81/api/movie/2
  getCuponById(CuponId){
    return axios.get(BASE_URL+"cupones/"+CuponId)
  }
  createCupon(Cupon){
    console.log(Cupon)
    return axios.post(BASE_URL+"cupones", Cupon);
  }
  updateCupon(Cupon){
    return axios.put(BASE_URL+"cupones", Cupon);
}
 }
 export default new CuponesService()