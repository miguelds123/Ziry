import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CanjeDetalleService from '../../services/CanjeDetalleService';
import { Grid } from '@mui/material';

export function DetailCanjeAdmin() {
  const routeParams= useParams();
  console.log(routeParams)

   //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
  useEffect(()=>{
    //Llamar al API y obtener una pelicula
    CanjeDetalleService.getCanjeMateriales(routeParams.id)
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
  },[routeParams.id])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <Container component='main' sx={{ mt: 8, mb: 2 }} >
    {data && ( 
        <Grid container spacing={2}>
          
       
          <Grid item={true} xs={7}>
                Factura
              <Typography variant='h4' component='h1' gutterBottom>
               {data.nombre}
              </Typography>
              <Typography variant='subtitle1' component='h1' gutterBottom >
               <Box display='inline' fontWeight='bold'>
               Descripción:
               </Box>{' '}
               {data.descripcion}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box  display='inline' fontWeight='bold'>
                Unidad Medida: 
                </Box>{' '}
                {data.unidad_medida}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Valor: 
                </Box>{' '}
                {data.valor + " ecomonedas"}
              </Typography>
              
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
