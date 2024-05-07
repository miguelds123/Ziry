// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import UsuarioService from "../../services/UsuarioService";
import { useEffect } from "react";
import tipoUsuariosService from "../../services/tipoUsuariosService";

export function Login() {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);
  // Esquema de validación
  const loginSchema = yup.object({
    correo: yup
      .string()
      .required("El email es requerido")
      .email("Formato email"),
    contrasena: yup.string().required("El password es requerido"),
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      correo: "",
      contrasena: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario

  const [error, setError] = useState("");

  const correo = watch("correo");
  console.log(correo);

  const [dataTipoUsuario, setDataTipoUsuario] = useState(null);
  const [dataLoadedTipoUsuario, setDataLoadedTipoUsuario] = useState(null);
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm);

      UsuarioService.loginUser(DataForm)
        .then((response) => {
          console.log(response);
          if (
            response.data.results != null &&
            response.data.results != undefined &&
            response.data.results != "Usuario no valido"
          ) {
            //Usuario es correcto
            saveUser(response.data.results);
            toast.success("Bienvenido, ", {
              duration: 4000,
              position: "bottom-right",
            });
            tipoUsuariosService
              .getTipoUsuarioById(correo)
              .then((response) => {
                let id = (response.data.results.id);
                console.log("Hola: " + id)
                console.log(response.data);
                setError(response.error);
                setDataLoadedTipoUsuario(true);
                if (id === "1") {
                  return navigate("/dashboardAdmin");
                }
                if (id === "2") {
                  return navigate("/dashboardCentroAcopio");
                }
                if (id === "3") {
                  return navigate("/detailBilletera");
                }
              })
              .catch((error) => {
                console.log(error);
                setError(error);
                throw new Error("Respuesta no válida del servidor");
              });
          } else {
            //Usuario no es valido
            toast.error("Usuario NO válido", {
              duration: 4000,
              position: "bottom-right",
            });
          }
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    } catch (e) {
      // handle your error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="correo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="correo"
                    label="Correo"
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="contrasena"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="contrasena"
                    label="Contraseña"
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
