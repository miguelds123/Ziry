import { useContext, useEffect, useState } from "react";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box } from "@mui/material";
import CuponCanjeadoService from "../../services/CuponCanjeadoService";
import { UserContext } from "../../context/UserContext";

export function ListCuponesCanjeados () {

  //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);

 const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  useEffect(()=>{
    //Llamar al API y obtener la lista de peliculas
    CuponCanjeadoService.getCuponCanjeadoById(userData.id)
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      setError(response.error)
      setLoaded(true)
    }
    ).catch( error=>{
      console.log(error)
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    }      
    )
  },[userData.id])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>     
     {data && data.map((item)=>(  
          <Grid item xs={4} key={item.id}   >
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white
                }}
                style={{ textAlign: 'center' }}
                title={item.fecha}
                subheader={item.nombre_cupon}
              />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                <Box display='inline' fontWeight='bold'>
               Descripción:
               </Box>{' '}
                 {item.descripcion}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                <Box display='inline' fontWeight='bold'>
               Precio:
               </Box>{' '}
                 {item.precio+" ecomonedas"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
       ))}
    </Grid>
  )
}
