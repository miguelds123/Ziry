import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import { Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import DashboardCentroAcopioService from "../../services/DashboardCentroAcopioService";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export function DashboardCentroAcopio() {
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const [dataMes, setDataMes] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardCentroAcopioService.getCantidadMes(userData.id)
      .then((response) => {
        setDataMes(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [userData.id]);

  const [dataAno, setDataAno] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardCentroAcopioService.getCantidadAno(userData.id)
      .then((response) => {
        setDataAno(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [userData.id]);

  const [dataTotal, setDataTotal] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardCentroAcopioService.getTotal(userData.id)
      .then((response) => {
        setDataTotal(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [userData.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
          spacing={2}
        >
          <Grid item={true} xs={5}>
            <Box
              component="img"
              sx={{
                borderRadius: "4%",
                maxWidth: "100%",
                height: "auto",
              }}
              alt="Imagen"
              src={
                "https://www.mees.com.mx/wp-content/uploads/2020/04/SPC-016.jpg"
              }
            />
          </Grid>

          <Grid item={true} xs={7}>
          {dataMes && (
            <Typography variant="h4" component="h1" gutterBottom>
              {"Dashboard del Centro de Acopio " + dataMes.nombre}
            </Typography>
          )}
            {dataMes && (
                <Typography variant="subtitle1" component="h1" gutterBottom>
                <Box display="inline" fontWeight="bold">
                  Cantidad de canjes realizados en el mes actual:
                </Box>{" "}
                {dataMes.cantidad_canjes}
              </Typography>
            )}
            {dataAno && (
                <Typography component='span' variant='subtitle1'>
                <Box fontWeight='bold'>Cantidad de canjes agrupados por material en el ultimo año:</Box>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                 {dataAno.map((item)=>(
                  <ListItemButton key={item.nombre}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.nombre + ": " + item.cantidad_canjes} />
                  </ListItemButton>
                 ))}
                </List>
              </Typography>
            )}
            {dataTotal && (
                <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Total de ecomonedas generadas en el Centro de Acopio:
                </Box>{" "}
                {dataTotal.total + " ecomonedas"}
              </Typography>
            )}
          </Grid>
        </Grid>
    </Container>
  );
}
