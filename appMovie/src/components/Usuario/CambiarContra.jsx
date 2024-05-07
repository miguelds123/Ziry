// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import toast from "react-hot-toast";
import UsuarioService from "../../services/UsuarioService";

export function CambiarContra() {
  const navigate = useNavigate();
  const routeParams = useParams();
  //Id de la pelicula a actualizar
  const id = routeParams.id || null;
  console.log(id);

  const CambiarContraSchema = yup.object({
    contrasena: yup.string().required("El password es requerido"),
    confirContrasena: yup.string().required("El password es requerido"),
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      contrasena: "",
      confirContrasena: "",
      id: id,
    },
    // Asignación de validaciones
    resolver: yupResolver(CambiarContraSchema),
  });

  let contrasena = watch("contrasena");
  let confirmarContrasena = watch("confirContrasena");

  // Valores de formulario

  const [error, setError] = useState("");
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      if (contrasena === confirmarContrasena) {
        if (CambiarContraSchema.isValid()) {
          console.log(DataForm);
          
          UsuarioService.cambiarContra(DataForm)
            .then((response) => {
              console.log(response);
              return navigate("/");
              // setError(response.error);
              // if (response.data.results != null) {
              //   toast.success(response.data.results, {
              //     duration: 4000,
              //     position: "top-center",
              //   });
              // }
              
            })
            .catch((error) => {
              if (error instanceof SyntaxError) {
                console.log(error);
                setError(error);
                throw new Error("Respuesta no válida del servidor");
              }
            });
        }
      } else {
        toast.error("Las contraseñas no coinciden", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (e) {
      console.log(e);
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
              Cambiar Contraseña
            </Typography>
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
                    error={Boolean(errors.contrasena)}
                    helperText={
                      errors.contrasena ? errors.contrasena.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="confirContrasena"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="confirContrasena"
                    label="Confirmar contraseña"
                    type="password"
                    error={Boolean(errors.confirContrasena)}
                    helperText={
                      errors.confirContrasena
                        ? errors.confirContrasena.message
                        : " "
                    }
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
              Cambiar{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
