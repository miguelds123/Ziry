import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class billeteraService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  //localhost:81/api/movie/2
  getBilleteraById(UsuarioID){
    return axios.get(BASE_URL+"billeterausuario/"+UsuarioID)
  }
  createBilletera(Billetera){
    console.log(Billetera)
    return axios.post(BASE_URL+"billeterausuario", Billetera);
  }
  updateBilletera(Billetera){
    return axios.put(BASE_URL+"billeterausuario", Billetera);
}
 }
 export default new billeteraService()