import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import CuponesService from "../../services/CuponesService";
import axios from "axios";
import tipoCuponesService from "../../services/tipoCuponesService";
import ReactDatePicker from "react-datepicker";
import { SelectTipoCupon } from "./Form/SelectTipoCupon";
import DateTimePickerStyle from "react-datepicker/dist/react-datepicker.css";
//https://www.npmjs.com/package/@hookform/resolvers

export function UpdateCupones() {
  const navigate = useNavigate();

  const routeParams = useParams();
  //Id de la pelicula a actualizar
  const id = routeParams.id || null;
  //Valores a precargar en el formulario, vienen del API
  const [values, setValores] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      CuponesService.getCuponById(Number(id))
        .then((response) => {
          console.log(response);
          setValores(response.data.results);
          setError(response.error);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);

            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [id]);

  // Esquema de validación
  const materialSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener 3 minimo caracteres"),
    descripcion: yup
      .string()
      .required("La descripción es requerida")
      .min(3, "La descripcion debe tener minimo 3 caracteres"),
    imagen: yup.string().required("La imagen es requerida"),
    id_tipo_cupon: yup
      .number()
      .typeError("El tipo de cupon es requerido")
      .required("El tipo de cupon es requerido"),
    precio: yup
      .number()
      .typeError("Solo acepta números")
      .required("El precio es requerido")
      .positive("Solo acepta números positivos"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: "",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
      id_tipo_cupon: "",
    },
    //Valores a precargar en el formulario
    values,
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
        if (selectedDate < selectedDateFinal) {
          DataForm.fecha_inicio = selectedDate;
          DataForm.fecha_final = selectedDateFinal;
          console.log("entre");
          //Crear pelicula
          CuponesService.updateCupon(DataForm)
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
                return navigate("/cuponesList");
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
        else
        {
          toast.error("La fecha de inicio es mayor a la fecha final", {
            duration: 4000,
            position: "top-center",
          });
        }
      }
    } catch (e) {
      console.log(e);
      //Capturar error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  const [dataid_tipo_cupon, setDataid_tipo_cupon] = useState({});
  const [loadedid_tipo_cupon, setLoadedid_tipo_cupon] = useState(false);
  useEffect(() => {
    tipoCuponesService
      .getTipoCupones()
      .then((response) => {
        console.log(response);
        setDataid_tipo_cupon(response.data.results);
        setLoadedid_tipo_cupon(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedid_tipo_cupon(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Actualiza el precio del campo de imagen en el formulario
    setValue("imagen", file, { shouldValidate: true });
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedDateFinal, setSelectedDateFinal] = useState(null);

  const handleDateFinalChange = (date) => {
    setSelectedDateFinal(date);
  };

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Actualizar Cupón
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
                name="precio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="precio"
                    label="Precio"
                    error={Boolean(errors.precio)}
                    helperText={errors.precio ? errors.precio.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <div>
                <h2>Fecha de Inicio</h2>
                <ReactDatePicker
                  id="fecha_inicio"
                  name="fecha_inicio"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  DateTimePickerStyle={DateTimePickerStyle}
                />
              </div>
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.fecha_inicio ? errors.fecha_inicio.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <div>
                <h2>Fecha Final</h2>
                <ReactDatePicker
                  id="fecha_final"
                  name="fecha_final"
                  selected={selectedDateFinal}
                  onChange={handleDateFinalChange}
                  dateFormat="dd/MM/yyyy"
                  DateTimePickerStyle={DateTimePickerStyle}
                />
              </div>
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.fecha_final ? errors.fecha_final.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de tipo_material */}
              {loadedid_tipo_cupon && (
                <Controller
                  name="id_tipo_cupon"
                  control={control}
                  render={({ field }) => (
                    <SelectTipoCupon
                      field={field}
                      data={dataid_tipo_cupon}
                      error={Boolean(errors.id_tipo_cupon)}
                      onChange={(e) =>
                        setValue("id_tipo_cupon", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.id_tipo_cupon ? errors.id_tipo_cupon.message : " "}
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
