import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

SelectCantidad.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  cantidad: PropTypes.number,
  onCantidadChange: PropTypes.func,
};

const cantidad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 100]
export function SelectCantidad({ field, data }) {
  return (
    <>
      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
        <InputLabel id='cantidad'>Cantidad</InputLabel>
        <Select
          {...field}
          labelId='cantidad'
          label='cantidad'
          defaultValue=''
          value={field.value}
        >
          {cantidad &&
            cantidad.map((cantidad) => (
              <MenuItem key={cantidad} value={cantidad}>
                {cantidad}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
