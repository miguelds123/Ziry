import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect} from "react";
import { Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DashboardAdminService from "../../services/DashboardAdminService";

export function DashboardAdmin() {
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  const [dataCantidadTotalCanjesAdmin, setDataCantidadTotalCanjesAdmin] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardAdminService.getCantidadTotalCanjesAdmin()
      .then((response) => {
        setDataCantidadTotalCanjesAdmin(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const [dataCantidadEcomonedasXCentroAcopio, setDataCantidadEcomonedasXCentroAcopio] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardAdminService.getCantidadEcomonedasXCentroAcopio()
      .then((response) => {
        setDataCantidadEcomonedasXCentroAcopio(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const [dataCantidadSumatoriaEcomonedas, setDataCantidadSumatoriaEcomonedas] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardAdminService.getCantidadSumatoriaEcomonedas()
      .then((response) => {
        setDataCantidadSumatoriaEcomonedas(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const [dataCantidadCanjesCupones, setDataCantidadCanjesCupones] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardAdminService.getCantidadCanjesCupones()
      .then((response) => {
        setDataCantidadCanjesCupones(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const [dataCantidadTotalEcomonedasCupones, setDataCantidadTotalEcomonedasCupones] = useState(null);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    DashboardAdminService.getCantidadTotalEcomonedasCupones()
      .then((response) => {
        setDataCantidadTotalEcomonedasCupones(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

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
                "https://www.simlevante.com/wp-content/uploads/2022/10/waste-management-edited.png"
              }
            />
          </Grid>

          <Grid item={true} xs={7}>
            <Typography variant="h4" component="h1" gutterBottom>
              {"Dashboard del Administrador"}
            </Typography>
            {dataCantidadTotalCanjesAdmin && (
                <Typography variant="subtitle1" component="h1" gutterBottom>
                <Box display="inline" fontWeight="bold">
                  Cantidad Total de canjes realizados en el mes actual:
                </Box>{" "}
                {dataCantidadTotalCanjesAdmin.cantidad_canjes}
              </Typography>
            )}
            {dataCantidadEcomonedasXCentroAcopio && (
                <Typography component='span' variant='subtitle1'>
                <Box fontWeight='bold'>Cantidad de Ecomonedas producidas por Centro de Acopio en el años actual:</Box>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                 {dataCantidadEcomonedasXCentroAcopio.map((item)=>(
                  <ListItemButton key={item.nombre}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.nombre + ": " + item.total + " ecomonedas"} />
                  </ListItemButton>
                 ))}
                </List>
              </Typography>
            )}
            {dataCantidadSumatoriaEcomonedas && (
                <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Sumatoria de todas las ecomonedas generadas:
                </Box>{" "}
                {dataCantidadSumatoriaEcomonedas.total + " ecomonedas"}
              </Typography>
            )}
            {dataCantidadCanjesCupones && (
                <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Cantidad de cupones canjeados en el año actual: 
                </Box>{" "}
                {dataCantidadCanjesCupones.cantidad_cupones}
              </Typography>
            )}
            {dataCantidadTotalEcomonedasCupones && (
                <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Cantidad de ecomonedas utilizadas en el canje de cupones: 
                </Box>{" "}
                {dataCantidadTotalEcomonedasCupones.total}
              </Typography>
            )}
          </Grid>
        </Grid>
    </Container>
  );
}
