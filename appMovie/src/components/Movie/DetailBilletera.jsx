import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import billeteraService from "../../services/billeteraService";

export function DetailBilletera() {
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  useEffect(() => {
    //Llamar al API y obtener una pelicula
    billeteraService
      .getBilleteraById(userData.id)
      .then((response) => {
        setData(response.data.results);
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
      {data && (
        <Grid container justifyContent="center" alignItems="center" height="100vh" spacing={2}>
          <Grid item={true} xs={5}>
            <Box
              component="img"
              sx={{
                borderRadius: "4%",
                maxWidth: "100%",
                height: "auto",
              }}
              alt="Imagen"
              src={"https://llllline.com/images/thumbs/0000044807_cartoon-wallet-vector-icon_800.jpeg"}
            />
          </Grid>

          <Grid item={true} xs={7}>
            <Typography variant="h4" component="h1" gutterBottom>
              {"Billetera de " + data.nombre + " " + data.apellido}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              <Box display="inline" fontWeight="bold">
                Ecomonedas Disponibles:
              </Box>{" "}
              {data.ecomonedas_disponibles + " ecomonedas"}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box display="inline" fontWeight="bold">
                Ecomonedas Cajeadas:
              </Box>{" "}
              {data.ecomonedas_cajeadas + " ecomonedas"}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Ecomonedas Recibidas:
              </Box>{" "}
              {data.ecomonedas_recibidas + " ecomonedas"}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
