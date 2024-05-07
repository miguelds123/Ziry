import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL
 //localhost:81/api/movie/
 class MaterialService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getMateriales(){
    return axios.get(BASE_URL+"material");
  }
  //localhost:81/api/movie/2
  getMaterialById(MaterialId){
    return axios.get(BASE_URL+"material/"+MaterialId)
  }
  createMaterial(Material){
    console.log(Material)
    return axios.post(BASE_URL+"material", Material);
  }
  updateMaterial(Material){
    return axios.put(BASE_URL+"material", Material);
}
 }
 export default new MaterialService()