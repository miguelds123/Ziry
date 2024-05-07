import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

SelectMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  cantidad: PropTypes.number,
  onCantidadChange: PropTypes.func,
};
export function SelectMaterial({ field, data }) {
  return (
    <>
      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
        <InputLabel id='id_material'>Material</InputLabel>
        <Select
          {...field}
          labelId='id_material'
          label='id_material'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((material) => (
              <MenuItem key={material.id_material} value={material.id_material}>
                {"Nombre: " + material.nombre + " - Valor: " + material.valor}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
