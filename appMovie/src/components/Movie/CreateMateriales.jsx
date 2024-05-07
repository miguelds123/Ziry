import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import ColorService from "../../services/ColorService";
import { SelectColor } from "./Form/SelectColor";
import MaterialService from "../../services/MaterialService";
import tipo_materialService from "../../services/tipoMaterialService";
import { SelectTipoMaterial } from "./Form/SelectTipoMaterial";
import axios from "axios";

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateMaterial() {
  const navigate = useNavigate();

  // Esquema de validación
  const materialSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener 3 caracteres"),
    tipo_material: yup
      .string()
      .typeError("El color es requerido")
      .required("El color es requerido"),
    descripcion: yup.string().required("La descripción es requerida"),
    valor: yup
      .number()
      .typeError("Solo acepta números")
      .required("El valor es requerido")
      .positive("Solo acepta números positivos"),
    unidad_medida: yup.string().required("La unidad de medida es requerida"),
    color: yup
      .string()
      .typeError("El color es requerido")
      .required("El color es requerido"),
    imagen: yup.string().required("La imagen es requerida"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      tipo_material: "",
      descripcion: "",
      valor: "",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
      unidad_medida: "",
      color: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });
  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = async (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (materialSchema.isValid()) {
        console.log("entre");
        //Crear pelicula
        MaterialService.createMaterial(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate("/materiales-table");
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });

        console.log(selectedImage);

        const formData = new FormData();
        formData.append("imagen", selectedImage);

        try {
          const responseFileUpload = await axios.post(
            "http://localhost:81/api/upload.php",
            formData
          );
          console.log(
            "Resultado de la carga de archivos:",
            responseFileUpload.data
          );
        } catch (error) {
          console.error("Error durante la carga de la imagen:", error);
        }
      }
    } catch (e) {
      console.log(e);
      //Capturar error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  const [dataColores, setDataColor] = useState({});
  const [loadedColor, setLoadedColor] = useState(false);
  useEffect(() => {
    ColorService.getColores()
      .then((response) => {
        console.log(response);
        setDataColor(response.data.results);
        setLoadedColor(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedColor(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const [datatipo_material, setDatatipo_material] = useState({});
  const [loadedtipo_material, setLoadedtipo_material] = useState(false);
  useEffect(() => {
    tipo_materialService
      .getTipoMateriales()
      .then((response) => {
        console.log(response);
        setDatatipo_material(response.data.results);
        setLoadedtipo_material(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedtipo_material(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Actualiza el valor del campo de imagen en el formulario
    setValue("imagen", file, { shouldValidate: true });
  };

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Crear Material
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="descripcion"
                    label="Descripción"
                    error={Boolean(errors.descripcion)}
                    helperText={
                      errors.descripcion ? errors.descripcion.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="valor"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="valor"
                    label="Valor"
                    error={Boolean(errors.valor)}
                    helperText={errors.valor ? errors.valor.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="unidad_medida"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="unidad_medida"
                    label="Unidad Medida"
                    error={Boolean(errors.unidad_medida)}
                    helperText={
                      errors.unidad_medida ? errors.unidad_medida.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de colores */}
              {loadedColor && (
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <SelectColor
                      field={field}
                      data={dataColores}
                      error={Boolean(errors.director_id)}
                      onChange={(e) =>
                        setValue("color", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.color ? errors.color.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de tipo_material */}
              {loadedtipo_material && (
                <Controller
                  name="tipo_material"
                  control={control}
                  render={({ field }) => (
                    <SelectTipoMaterial
                      field={field}
                      data={datatipo_material}
                      error={Boolean(errors.tipo_material)}
                      onChange={(e) =>
                        setValue("tipo_material", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.tipo_material ? errors.tipo_material.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <input type="file" onChange={handleImageChange} />
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.imagen ? errors.imagen.message : " "}
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
