import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText, IconButton, Tooltip } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import CantonService from '../../services/CantonService';
import UsuarioAdminService from '../../services/UsuarioAdminService';

import centroAcopioService from '../../services/CentroAcopioService';
import { toast } from 'react-hot-toast';
import ProvinciaService from '../../services/ProvinciaService';
import { SelectProvincia } from './Form/SelectProvincia';
import { SelectCanton } from './Form/SelectCanton';
import {SelectUsuarioAdmin } from './Form/SelectUsuarioAdmin';
import AddIcon from '@mui/icons-material/Add';
import MaterialService from '../../services/MaterialService';
import { MaterialesCentroAcopioForm } from './Form/MaterialesCentroAcopioForm';

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCentroAcopio() {

  const navigate = useNavigate();

  // Esquema de validación
  const CentroAcopioSchema = yup.object({
    nombre: yup
      .string()
      .required('El nombre es requerido')
      .min(2, 'El nombre debe tener 2 caracteres'),
      id_provincia: yup
      .number()
      .typeError('La provincia es requerida')
      .required('La provincia es requerida'),
      id_canton: yup
      .number()
      .typeError('El cantón es requerido')
      .required('El cantón es requerido'),
      direccion: yup
      .string()
      .required('La dirección es requerida')
      .min(2, 'La dirección debe tener 2 caracteres'),
    telefono: yup
      .string()
      .required("El telefono es requerido")
      .min(7, "El telefono debe tener por lo menos 8"),
      horario:yup
      .string()
      .required('El horario es requerido')
      .min(2, 'El horario debe tener 2 caracteres'),
   
    id_usuario_admin: yup
      .number()
      .typeError('El administrador es requerido')
      .required('El administrador es requerido'),

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
      nombre: '',
      id_provincia: '',
      id_canton: '',
      direccion: '',
      telefono: '',
      horario: '',
      id_usuario_admin: '',
      materiales: [
        {
          material_id: '',
        },      
      ],
    },
    // Asignación de validaciones
    resolver: yupResolver(CentroAcopioSchema),
  });

  const handleInputChange=(index, name, value)=>{
    //asignar valor en el formulario al control indicado
    setValue(name,value)
    //Obtienes todos los valores del formulario
    const valores= getValues()
    console.log(valores.materiales[index])
    let total='Materiales: '
    valores.materiales.map((item)=>{
      //Acordarse castear o convertir a número
      total+=`${item.role} `
    })
    setValue('total',total)
  }

  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'materiales',
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
      material_id: '',
    });
  };

  const idProvincia = watch('id_provincia');
 
  const [error, setError] = useState('');

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log('Formulario:');
    console.log(DataForm);

    try {
      if (CentroAcopioSchema.isValid()) {
        //Crear pelicula
        centroAcopioService.CreateCentroAcopio(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: 'top-center',
              });
              // Redireccion a la tabla
              return navigate('/centroAcopio-table');
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error('Respuesta no válida del servidor');
            }
          });
      }
    } catch (e) {
      //Capturar error
      console.log(e)
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  //Lista de Directores
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
  const [dataUsuarioAdmin, setDataUsuarioAdmin] = useState({});
  const [loadedUsuarioAdmin, setLoadedUsuarioAdmin] = useState(false);
  useEffect(() => {
    UsuarioAdminService.getUsuariosAdminLibre()
      .then((response) => {
        console.log(response);
        setDataUsuarioAdmin(response.data.results);
        setLoadedUsuarioAdmin(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedUsuarioAdmin(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);

  const [dataMateriales, setDataMateriales] = useState({});
  const [loadedMateriales, setLoadedMateriales] = useState(false);
  useEffect(() => {
    MaterialService.getMateriales()
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
              Crear Centro Acopio
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
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
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='direccion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='direccion'
                    label='Dirección'
                    error={Boolean(errors.direccion)}
                    helperText={errors.direccion ? errors.direccion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
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
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='horario'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='horario'
                    label='Horario'
                    error={Boolean(errors.horario)}
                    helperText={errors.horario ? errors.horario.message : ' '}
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
              {loadedUsuarioAdmin && (
                <Controller
                  name='id_usuario_admin'
                  control={control}
                  render={({ field }) => (
                    <SelectUsuarioAdmin
                      field={field}
                      data={dataUsuarioAdmin}
                      error={Boolean(errors.id_usuario_admin)}
                      onChange={(e) =>
                        setValue('id_usuario_admin', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.id_usuario_admin? errors.id_usuario_admin.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} al>

          <br />
          <br />
          <br />
          <br />
            <Typography variant='h6' gutterBottom>
              Materiales
              <Tooltip title='Agregar Material'>
                <span>
                  <IconButton color='secondary' onClick={addNewMaterial}>
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Typography>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Array de controles de actor */}
              {loadedMateriales &&
                fields.map((field, index) => (
                  <div key={index}>
                    <MaterialesCentroAcopioForm
                      name='material_id'
                      field={field}
                      data={dataMateriales}
                      key={field.id}
                      index={index}
                      onRemove={removeMaterial}
                      control={control}
                      onInputChange={handleInputChange}
                      disableRemoveButton={fields.length === 1}
                      onChange={(e) =>
                        setValue('material_id', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {errors.material_id && (
                      <FormHelperText
                        component={'span'}
                        sx={{ color: '#d32f2f' }}
                      >
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          {errors?.material_id[index]?.material_id && (
                            <Grid item xs={6}>
                              {errors?.material_id[index]?.material_id
                                ? errors?.material_id[index]?.material_id?.message
                                : ' '}
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
              type='submit'
              variant='contained'
              color='secondary'
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
