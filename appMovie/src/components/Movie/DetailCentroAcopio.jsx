import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CentroAcopioService from '../../services/CentroAcopioService';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export function DetailCentroAcopio() {
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
    CentroAcopioService.getCentroAcopioById(routeParams.id)
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
          
          <Grid item={true} xs={5} >  
          <Box component='img'
           sx={{
            borderRadius:'4%',
            maxWidth:'100%',
            height: 'auto',
          }}
          alt="Imagen Material"
          src={"https://ecoembesdudasreciclaje.es/web/app/uploads/2023/09/post-dudas-cubos-reciclaje-espacio-reducido.jpg"}/>  
            
          </Grid>
          <Grid item={true} xs={7}>
            
              <Typography variant='h4' component='h1' gutterBottom>
               {data.nombre}
              </Typography>
              <Typography variant='subtitle1' component='h1' gutterBottom >
               <Box display='inline' fontWeight='bold'>
               Provincia:
               </Box>{' '}
               {data.provincia}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box  display='inline' fontWeight='bold'>
                Canton:
                </Box>{' '}
                {data.canton}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Dirección: 
                </Box>{' '}
                {data.direccion}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Teléfono:  
                </Box>{' '}
                {data.telefono}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Horario: 
                </Box>{' '}
                {data.horario}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Administrador: 
                </Box>{' '}
                {data.nombreUsuario}
              </Typography>
              <Typography component='span' variant='subtitle1'>
                <Box fontWeight='bold'>Materiales:</Box>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                 {data.materiales.map((item)=>(
                  <ListItemButton key={item.id_material}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.nombre} />
                  </ListItemButton>
                 ))}
                </List>
              </Typography>
              
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
