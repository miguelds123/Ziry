import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CanjeDetalleService from "../../services/CanjeDetalleService";
import { Grid } from "@mui/material";

export function DetailCanje() {
  const routeParams = useParams();
  const displayFlex = {
    display: "flex",
    flexDirection: "row",
    paddingBottom: '10px'
  };
  const padding = {
    paddingLeft: '40px'
  }

  const tablaStyle = {
    border: '1px solid #000',
    borderCollapse: 'collapse',
  };

  const celdaStyle = {
    border: '1px solid #000',
    paddingLeft: '60px',
    paddingRight: '60px',
    textAlign: 'center'
  };

  console.log(routeParams);

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    CanjeDetalleService.getCanjeMateriales(routeParams.id)
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
  }, [routeParams.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Grid container spacing={2}>
          <Grid item={true} xs={7}>
            <Typography variant="h4" component="h1" gutterBottom>
              {"Factura No" + data.id}
            </Typography>

            <br />

            <Grid style={displayFlex}>
              <Grid>
                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box display="inline" fontWeight="bold">
                    Cedula del Cliente:
                  </Box>{" "}
                  {data.cedula}
                </Typography>

                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box display="inline" fontWeight="bold">
                    Nombre Completo:
                  </Box>{" "}
                  {data.nombreUsuario}
                </Typography>

                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box display="inline" fontWeight="bold">
                    Correo del Cliente:
                  </Box>{" "}
                  {data.correo}
                </Typography>
              </Grid>

              <Grid style={padding}>
                <Typography
                  variant="subtitle1"
                  component="subtitle1"
                  gutterBottom
                >
                  <Box display="inline" fontWeight="bold">
                    Fecha:
                  </Box>{" "}
                  {data.fecha}
                </Typography>

                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box fontWeight="bold" display="inline">
                    Centro Acopio:
                  </Box>{" "}
                  {data.nombre}
                </Typography>

                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box fontWeight="bold" display="inline">
                    Compañia:
                  </Box>{" "}
                  {"Ziry"}
                </Typography>
              </Grid>
            </Grid>

            <Typography component="span" variant="subtitle1">
              <Box fontWeight="bold">Detalle:</Box>

              <table style={tablaStyle}>
                <thead>
                  <tr>
                    <th style={celdaStyle}>Material</th>
                    <th style={celdaStyle}>Cantidad</th>
                    <th style={celdaStyle}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {data.detalle.map((item) => (
                    <tr key={item.id}>
                      <td style={celdaStyle}>{item.nombre}</td>
                      <td style={celdaStyle}>{item.cantidad}</td>
                      <td style={celdaStyle}>{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Typography>
            
            <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                  paddingTop={"10px"}
                >
                  <Box fontWeight="bold" display="inline">
                    Total:
                  </Box>{" "}
                  {data.total_economonedas}
                </Typography>

          </Grid>
        </Grid>
      )}
    </Container>
  );
}
