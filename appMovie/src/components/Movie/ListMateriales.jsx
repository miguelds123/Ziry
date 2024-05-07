import { useEffect, useState } from "react";
import MaterialService from "../../services/MaterialService";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { Info } from '@mui/icons-material'
import { Box } from "@mui/material";

export function ListMateriales () {
  //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
  useEffect(()=>{
    //Llamar al API y obtener la lista de peliculas
    MaterialService.getMateriales()
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
  },[])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data &&
        data.map((item) => (
          <Grid item xs={4} key={item.id}>
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: String(item.color),
                  color: "black",
                }}
                style={{ textAlign: "center" }}
                title={item.nombre}
                subheader={item.descripcion}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                <Box display='inline' fontWeight='bold'>
               Unidad de medida:
               </Box>{' '}
                  {item.unidad_medida}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <Box display='inline' fontWeight='bold'>
               Valor:
               </Box>{' '}
                  {item.valor + " ecomonedas"}
                </Typography>

                <Grid item={true} xs={5}>
                  <Box
                    component="img"
                    sx={{
                      borderRadius: "4%",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    alt="Imagen Material"
                    src={item.imagen}
                  />
                </Grid>

              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white,
                }}
              >
                <IconButton
                  component={Link}
                  to={`/material/${item.id}`}
                  aria-label="Detalle"
                  sx={{ ml: "auto" }}
                >
                  <Info />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
