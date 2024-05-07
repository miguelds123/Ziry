import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

SelectMaterialCentroAcopio.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onCantidadChange: PropTypes.func,
};
export function SelectMaterialCentroAcopio({ field, data }) {
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
              <MenuItem key={material.id} value={material.id}>
                {material.nombre}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
