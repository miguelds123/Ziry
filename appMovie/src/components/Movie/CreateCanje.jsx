import React, { useContext, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Box,
  Container,
  FormHelperText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Button from "@mui/material/Button";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import CanjeService from "../../services/CanjeService";
import { toast } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";

import { MaterialesForm } from "./Form/MaterialesForm";
import UsuarioService from "../../services/UsuarioService";
import { SelectCliente } from "./Form/SelectCliente";
import CentroAcopioMateriales from "../../services/CentroAcopioMateriales";
import billeteraService from "../../services/billeteraService";
import { UserContext } from "../../context/UserContext";
import CentroAcopioUsuarioAdminService from "../../services/CentroAcopioUsuarioAdminService";

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCanje() {
  const navigate = useNavigate();

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

  const fechaActual = new Date();

  var año = fechaActual.getFullYear();
  var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2); // Agregar cero al principio si es necesario
  var dia = ("0" + fechaActual.getDate()).slice(-2); // Agregar cero al principio si es necesario

  var fechaFormateada = dia + "-" + mes + "-" + año;

  const data = "xd";

  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  // Esquema de validación
  const Canje = yup.object({
    usuario: yup
      .number()
      .typeError("El administrador es requerido")
      .required("El administrador es requerido"),
    materiales: yup.array().of(
      yup.object().shape({
        id_material: yup.string().required("El ID del material es requerido"),
        cantidad: yup.number()
        // Agrega otras validaciones según sea necesario
      })
    ),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usuario: "",
      materiales: [
        {
          id_material: "",
          cantidad: ""
        },
      ],
    },
    // Asignación de validaciones
    resolver: yupResolver(Canje),
  });

  const handleInputChange = (index, name, value) => {
    //asignar valor en el formulario al control indicado
    setValue(name, value);
    //Obtienes todos los valores del formulario
    const valores = getValues();
    console.log(valores.materiales[index]);
    /* let total = "Materiales: ";
    valores.materiales.map((item) => {
      //Acordarse castear o convertir a número
      total += `${item.role} `;
    });
    setValue("total", total); */
  };

  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materiales",
  });
  // Eliminar material de listado
  const removeMaterial = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };
  // Agregar un nuevo material
  const addNewMaterial = () => {
    append({
      id_material: "",
      cantidad: ""
    });
    console.log(materiales);
  };

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (Canje.isValid()) {
        DataForm.total_economonedas = total
        DataForm.arrayInfoMaterial = nuevosMateriales
        DataForm.id_usuario = Number(idUsuario);
        DataForm.ecomonedas_disponibles = Number(dataBilletera.ecomonedas_disponibles) + Number(total)
        DataForm.ecomonedas_cajeadas = Number(dataBilletera.ecomonedas_cajeadas)
        DataForm.ecomonedas_recibidas = Number(dataBilletera.ecomonedas_recibidas) + Number(total)
        DataForm.id_centro_acopio = dataCentroAcopio.id
        //Crear pelicula
        CanjeService.CreateCanje(DataForm)
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
                      toast.success("El canje a sido realizado", {
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
          
      }
    } catch (e) {
      //Capturar error
      console.log(e);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  const [dataUsuario, setDataUsuario] = useState({});
  const [loadedUsuario, setLoadedUsuario] = useState(false);
  useEffect(() => {
    UsuarioService.getUsuarios()
      .then((response) => {
        console.log(response);
        setDataUsuario(response.data.results);
        setLoadedUsuario(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedUsuario(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const [dataCentroAcopio, setDataCentroAcopio] = useState({});
  const [loadedCentroAcopio, setLoadedCentroAcopio] = useState(false);
  useEffect(() => {
    CentroAcopioUsuarioAdminService.getCentroAcopioUsuarioAdminById(userData.id)
      .then((response) => {
        console.log(response);
        setDataCentroAcopio(response.data.results);
        setLoadedCentroAcopio(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedUsuario(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [userData.id]);

  const [dataMateriales, setDataMateriales] = useState([]);
  const [loadedMateriales, setLoadedMateriales] = useState(false);
  useEffect(() => {
    CentroAcopioMateriales.getMaterialByCentroAcopioId(2)
      .then((response) => {
        console.log(response);
        setDataMateriales(response.data.results);
        setLoadedMateriales(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedMateriales(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const idUsuario = watch("usuario");
  const materiales = watch("materiales");
  let total = 0;

  const nuevosMateriales = [];

  // Recorrer el array 'materiales'
  materiales.forEach((material) => {
    dataMateriales.forEach((infoMaterial) => {
      if (material.id_material === infoMaterial.id_material) {

        const nuevoMaterialConCantidad = {
          ...infoMaterial,
          cantidad: material.cantidad,
        };
        // Agregar el material al nuevo array
        nuevosMateriales.push(nuevoMaterialConCantidad);
        total += Number(infoMaterial.valor) * Number(nuevoMaterialConCantidad.cantidad);
      }
    });
  });

  console.log(materiales);

  console.log(nuevosMateriales)

  const [dataInfoUsuario, setDataInfoUsuario] = useState({});
  const [loadedInfoUsuario, setLoadedInfoUsuario] = useState(false);
  useEffect(() => {
    UsuarioService.getUsuarioById(idUsuario)
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
  }, [idUsuario]);

  const [dataBilletera, setDataBilletera] = useState({});
  const [loadedBilletera, setLoadedBilletera] = useState(false);
  useEffect(() => {
    billeteraService
      .getBilleteraById(idUsuario)
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
  }, [idUsuario]);

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
                        Centro Acopio:
                      </Box>{" "}
                      {dataCentroAcopio.nombre}
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
                        <th style={celdaStyle}>Precio</th>
                        <th style={celdaStyle}>Cantidad</th>
                        <th style={celdaStyle}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nuevosMateriales.map((nuevosMateriales) => (
                        <tr key={nuevosMateriales.id}>
                          <td style={celdaStyle}>{nuevosMateriales.nombre}</td>
                          <td style={celdaStyle}>{nuevosMateriales.valor}</td>
                          <td style={celdaStyle}>{nuevosMateriales.cantidad}</td>
                          <td style={celdaStyle}>{Number(nuevosMateriales.valor) * Number(nuevosMateriales.cantidad)}</td>
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
                  {total}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Container>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de generos */}
              {loadedUsuario && (
                <Controller
                  name="usuario"
                  control={control}
                  render={({ field }) => (
                    <SelectCliente
                      field={field}
                      data={dataUsuario}
                      error={Boolean(errors.usuario)}
                      onChange={(e) =>
                        setValue("usuario", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.usuario ? errors.usuario.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} al>
            <br />
            <br />
            <br />
            <br />
            <Typography variant="h6" gutterBottom>
              Materiales
              <Tooltip title="Agregar Material">
                <span>
                  <IconButton color="secondary" onClick={addNewMaterial}>
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Typography>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Array de controles de actor */}
              {loadedMateriales &&
                fields.map((field, index) => (
                  <div key={index}>
                    <MaterialesForm
                      name="id_material"
                      field={field}
                      data={dataMateriales}
                      key={field.id}
                      index={index}
                      onRemove={removeMaterial}
                      control={control}
                      onInputChange={handleInputChange}
                      disableRemoveButton={fields.length === 1}
                      onChange={(e) =>
                        setValue("id_material", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {errors.id_material && (
                      <FormHelperText
                        component={"span"}
                        sx={{ color: "#d32f2f" }}
                      >
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          {errors?.id_material[index]?.id_material && (
                            <Grid item xs={6}>
                              {errors?.id_material[index]?.id_material
                                ? errors?.id_material[index]?.id_material
                                    ?.message
                                : " "}
                            </Grid>
                          )}
                        </Grid>
                      </FormHelperText>
                    )}
                  </div>
                ))}
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
