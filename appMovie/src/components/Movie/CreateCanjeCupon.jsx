import React, { useContext, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import UsuarioService from "../../services/UsuarioService";
import CuponCanjeadoService from "../../services/CuponCanjeadoService";
import billeteraService from "../../services/billeteraService";
import CuponesService from "../../services/CuponesService";
import { SelectCupon } from "./Form/SelectCupon";
import { UserContext } from "../../context/UserContext";

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCanjeCupon() {
  const navigate = useNavigate();

  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const fechaActual = new Date();

  var año = fechaActual.getFullYear();
  var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2); // Agregar cero al principio si es necesario
  var dia = ("0" + fechaActual.getDate()).slice(-2); // Agregar cero al principio si es necesario

  var fechaFormateada = dia + "-" + mes + "-" + año;

  const data = "xd";

  const displayFlex = {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "10px",
  };
  const padding = {
    paddingLeft: "40px",
  };

  const tablaStyle = {
    border: "1px solid #000",
    borderCollapse: "collapse",
  };

  const celdaStyle = {
    border: "1px solid #000",
    paddingLeft: "60px",
    paddingRight: "60px",
    textAlign: "center",
  };

  // Esquema de validación
  const Canje = yup.object({
    id_cupon: yup
      .number()
      .typeError("El cupon que se va a canjear es requerido")
      .required("El cupon que se va a canjear es requerido"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_cupon: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(Canje),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (Canje.isValid()) {
        console.log(dataBilletera.ecomonedas_disponibles)
        console.log(dataCuponesSelected.precio)
        if (
          Number(dataBilletera.ecomonedas_disponibles) > Number(dataCuponesSelected.precio)
        ) {
          DataForm.id_usuario = Number(userData.id);
          DataForm.ecomonedas_disponibles = Number(dataBilletera.ecomonedas_disponibles) - Number(dataCuponesSelected.precio)
          DataForm.ecomonedas_cajeadas = Number(dataBilletera.ecomonedas_cajeadas) + Number(dataCuponesSelected.precio)
          DataForm.ecomonedas_recibidas = Number(dataBilletera.ecomonedas_recibidas)
          //Crear pelicula
          CuponCanjeadoService.createCuponCanjeado(DataForm)
            .then((response) => {
              console.log(response);
              setError(response.error);
              //Respuesta al usuario de creación
              if (response.data.results != null) {
                billeteraService.updateBilletera(DataForm)
                  .then((response) => {
                    console.log(response);
                    setError(response.error);
                    //Respuesta al usuario de creación
                    if (response.data.results != null) {
                      toast.success("El cupón a sido canjeado", {
                        duration: 4000,
                        position: "top-center",
                      });
                      // Redireccion a la tabla
                      return navigate("/");
                    }
                  })
                  .catch((error) => {
                    console.error("Error en la solicitud:", error);
                    if (error.response) {
                      console.error(
                        "Respuesta del servidor:",
                        error.response.data
                      );
                    }
                    setError(error);
                    throw new Error("Respuesta no válida del servidor");
                  });
              }
            })
            .catch((error) => {
              console.error("Error en la solicitud:", error);
              if (error.response) {
                console.error("Respuesta del servidor:", error.response.data);
              }
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            });
        } else {
          toast.error(
            "No posee las suficientes ecomonedas para realizar esta transacción",
            {
              duration: 4000,
              position: "top-center",
            }
          );
        }
      }
    } catch (e) {
      //Capturar error
      console.log(e);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  const [dataCupones, setDataCupones] = useState([]);
  const [loadedCupones, setLoadedCupones] = useState(false);
  useEffect(() => {
    CuponesService.getCupones()
      .then((response) => {
        console.log(response);
        setDataCupones(response.data.results);
        setLoadedCupones(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedCupones(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const [dataInfoUsuario, setDataInfoUsuario] = useState({});
  const [loadedInfoUsuario, setLoadedInfoUsuario] = useState(false);
  useEffect(() => {
    UsuarioService.getUsuarioById(userData.id)
      .then((response) => {
        console.log(response);
        setDataInfoUsuario(response.data.results);
        setLoadedInfoUsuario(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedInfoUsuario(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [userData.id]);

  const [dataBilletera, setDataBilletera] = useState({});
  const [loadedBilletera, setLoadedBilletera] = useState(false);
  useEffect(() => {
    billeteraService
      .getBilleteraById(userData.id)
      .then((response) => {
        console.log(response);
        setDataBilletera(response.data.results);
        setLoadedBilletera(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedBilletera(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [userData.id]);

  const cupon_selected = watch("id_cupon");

  const [dataCuponesSelected, setDataCuponesSelected] = useState([]);
  const [loadedCuponesSelected, setLoadedCuponesSelected] = useState(false);
  useEffect(() => {
    CuponesService.getCuponById(cupon_selected)
      .then((response) => {
        console.log(response);
        setDataCuponesSelected(response.data.results);
        setLoadedCuponesSelected(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedCuponesSelected(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [cupon_selected]);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Container component="main" sx={{ mt: 8, mb: 2 }}>
          {data && (
            <Grid container spacing={2}>
              <Grid item={true} xs={7}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {"Realizar canje"}
                </Typography>

                <br />

                <Grid style={displayFlex}>
                  <div>
                    {loadedInfoUsuario && dataInfoUsuario.cedula ? (
                      <Grid>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          display="block"
                        >
                          <Box display="inline" fontWeight="bold">
                            Cedula del Cliente:
                          </Box>{" "}
                          {dataInfoUsuario.cedula}
                        </Typography>

                        <Typography
                          component="span"
                          variant="subtitle1"
                          display="block"
                        >
                          <Box display="inline" fontWeight="bold">
                            Nombre Completo:
                          </Box>{" "}
                          {dataInfoUsuario.nombre +
                            " " +
                            dataInfoUsuario.apellido}
                        </Typography>

                        <Typography
                          component="span"
                          variant="subtitle1"
                          display="block"
                        >
                          <Box display="inline" fontWeight="bold">
                            Correo del Cliente:
                          </Box>{" "}
                          {dataInfoUsuario.correo}
                        </Typography>

                        {loadedCuponesSelected && dataCuponesSelected.precio ? (
                          <Typography
                            component="span"
                            variant="subtitle1"
                            display="block"
                          >
                            <Box display="inline" fontWeight="bold">
                              Ecomonedas restantes
                            </Box>{" "}
                            {Number(dataBilletera.ecomonedas_disponibles) -
                              Number(dataCuponesSelected.precio)}
                          </Typography>
                        ) : (
                          <Typography
                            component="span"
                            variant="subtitle1"
                            display="block"
                          >
                            <Box display="inline" fontWeight="bold">
                              Ecomonedas en su billetera
                            </Box>{" "}
                            {dataBilletera.ecomonedas_disponibles}
                          </Typography>
                        )}
                      </Grid>
                    ) : (
                      // Mostrar mensaje de carga
                      <p>Cargando información del usuario...</p>
                    )}
                  </div>

                  <Grid style={padding}>
                    <Typography
                      variant="subtitle1"
                      component="subtitle1"
                      gutterBottom
                    >
                      <Box display="inline" fontWeight="bold">
                        Fecha:
                      </Box>{" "}
                      {fechaFormateada}
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
                        <th style={celdaStyle}>Cupón</th>
                        <th style={celdaStyle}>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={celdaStyle}>{dataCuponesSelected.nombre}</td>
                        <td style={celdaStyle}>{dataCuponesSelected.precio}</td>
                      </tr>
                    </tbody>
                  </table>
                </Typography>
              </Grid>
            </Grid>
          )}
        </Container>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de generos */}
              {loadedCupones && (
                <Controller
                  name="id_cupon"
                  control={control}
                  render={({ field }) => (
                    <SelectCupon
                      field={field}
                      data={dataCupones}
                      error={Boolean(errors.id_cupon)}
                      onChange={(e) =>
                        setValue("id_cupon", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.id_cupon ? errors.id_cupon.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
