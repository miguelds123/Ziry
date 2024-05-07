import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class UsuarioService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getUsuarios(){
    return axios.get(BASE_URL+"usuario");
  }
  getUsuarioById(usuarioId){
    return axios.get(BASE_URL+"usuario/"+usuarioId)
  }
  loginUser(User){
    return axios.post(BASE_URL+"usuario" + '/login/', User);
  }
  createUser(User){
    return axios.post(BASE_URL+"usuario", User);
  }
  cambiarContra(Contra){
    return axios.put(BASE_URL+"usuario" + '/contra/', Contra);
  }
  updateUsuario(Usuario){
    return axios.put(BASE_URL+"usuario", Usuario);
  }
 }
 export default new UsuarioService()