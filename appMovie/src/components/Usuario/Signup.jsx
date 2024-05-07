/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import UsuarioService from '../../services/UsuarioService'
import ProvinciaService from '../../services/ProvinciaService'
import CantonService from '../../services/CantonService'
import { SelectProvincia } from '../Movie/Form/SelectProvincia'
import { FormHelperText } from '@mui/material'
import { SelectCanton } from '../Movie/Form/SelectCanton'
import DistritoService from '../../services/DistritoService'
import { SelectDistrito } from '../Movie/Form/SelectDistrito'

export function Signup () {
  const navigate = useNavigate()
  // Esquema de validación
  const loginSchema = yup.object({
    correo: yup
      .string()
      .typeError('La provincia es requerida')
      .required('El email es requerido')
      .email('Formato email'),
    contrasena: yup
      .string()
      .typeError('La provincia es requerida')
      .required('El password es requerido')
      .min(4, 'La contraseña debe tener 4 caracteres'),
    id_provincia: yup
      .number()
      .typeError('La provincia es requerida')
      .required('La provincia es requerida'),
    id_canton: yup
      .number()
      .typeError('El cantón es requerido')
      .required('El cantón es requerido'),
    id_distrito: yup
      .number()
      .typeError('El distrito es requerido')
      .required('El distrito es requerido'),
    nombre:yup
      .string()
      .required('El nombre es requerido')
      .min(3, 'El nombre debe tener 3 caracteres'),
    apellido:yup
      .string()
      .required('El apellido es requerido')
      .min(3, 'El apellido debe tener 3 caracteres'),
    telefono: yup
      .string()
      .required("El telefono es requerido")
      .min(7, "El telefono debe tener por lo menos 8"),
    cedula:yup
      .string()
      .required('La cedula es requerido')
      .min(9, 'La cedula debe tener 9 caracteres'),
  })
  const { control, handleSubmit, setValue, watch, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      correo: '',
      contrasena: '',
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      telefono: '',
      cedula: '',
      id_provincia: '',
      id_canton: '',
      id_distrito: '',
      tipo_usuario: '3'
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  
  const [error, setError] = useState('');
  const notify = () => toast.success('Usuario registrado', {
    duration: 4000,
    position: 'top-center'
  })

  const idProvincia = watch('id_provincia');
  const id_canton = watch('id_canton')
 // Accion submit
  const onSubmit = (DataForm) => {
    try {
     console.log(DataForm)
     setValue('tipo_usuario',3)
     //Registrar usuario
     UsuarioService.createUser(DataForm)
     .then(response => {
        console.log(response)
        notify()
        return navigate('/login')
        
     })
     .catch(error => {
       if (error instanceof SyntaxError) {
         console.log(error)
         setError(error)
         throw new Error('Respuesta no válida del servidor')
       }
     });
     
    } catch (e) {
      // handle your error
    }
  }
  
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)

  const [dataProvincia, setDataProvincia] = useState({});
  const [loadedProvincia, setLoadedProvincia] = useState(false);
  useEffect(() => {
    ProvinciaService.getProvincia()
      .then((response) => {
        console.log(response);
        setDataProvincia(response.data.results);
        setLoadedProvincia(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedProvincia(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);
  //Lista de Generos
  const [dataCanton, setDataCanton] = useState({});
  const [loadedCanton, setLoadedCanton] = useState(false);
  useEffect(() => {
    CantonService.getCanton()
      .then((response) => {
        console.log(response);
        setDataCanton(response.data.results);
        setLoadedCanton(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedCanton(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);

  const [dataDistrito, setDataDistrito] = useState({});
  const [loadedDistrito, setLoadedDistrito] = useState(false);
  useEffect(() => {
    DistritoService.getDistrito()
      .then((response) => {
        console.log(response);
        setDataDistrito(response.data.results);
        setLoadedDistrito(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedDistrito(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);
  
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Registrar Usuario
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='correo'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='correo'
                    label='Correo Electronico'
                    error={Boolean(errors.correo)}
                    helperText={errors.correo ? errors.correo.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='contrasena'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='contrasena'
                    label='Contraseña'
                    type='password'
                    error={Boolean(errors.contrasena)}
                    helperText={errors.contrasena ? errors.contrasena.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='nombre'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='nombre'
                    label='Nombre'
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='apellido'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='apellido'
                    label='Apellido'
                    error={Boolean(errors.apellido)}
                    helperText={errors.apellido ? errors.apellido.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='telefono'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='telefono'
                    label='Telefono'
                    error={Boolean(errors.telefono)}
                    helperText={errors.telefono ? errors.telefono.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='cedula'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='cedula'
                    label='Cedula'
                    error={Boolean(errors.cedula)}
                    helperText={errors.cedula ? errors.cedula.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Lista de directores */}
              {loadedProvincia && (
                <Controller
                  name='id_provincia'
                  control={control}
                  render={({ field }) => (
                    <SelectProvincia
                      field={field}
                      data={dataProvincia}
                      error={Boolean(errors.id_provincia)}
                      onChange={(e) =>
                        setValue('id_provincia', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.id_provincia ? errors.id_provincia.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Lista de generos */}
              {loadedCanton && (
                <Controller
                  name='id_canton'
                  control={control}
                  render={({ field }) => (
                    <SelectCanton
                      field={field}
                      idProvincia={idProvincia}
                      data={dataCanton}
                      error={Boolean(errors.Canton)}
                      onChange={(e) =>
                        setValue('id_canton', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.id_canton ? errors.id_canton.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Lista de generos */}
              {loadedCanton && (
                <Controller
                  name='id_distrito'
                  control={control}
                  render={({ field }) => (
                    <SelectDistrito
                      field={field}
                      idProvincia={idProvincia}
                      idCanton={id_canton}
                      data={dataDistrito}
                      error={Boolean(errors.id_distrito)}
                      onChange={(e) =>
                        setValue('id_distrito', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.id_distrito ? errors.id_distrito.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Login</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
