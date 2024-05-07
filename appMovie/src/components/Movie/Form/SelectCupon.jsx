import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectCupon.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectCupon({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='id_cupon'>Cupón</InputLabel>
        <Select
          {...field}
          labelId='id_cupon'
          label='id_cupon'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((cupon) => (
              <MenuItem key={cupon.id} value={cupon.id}>
                {"Nombre: " + cupon.nombre + " - Descripcion: " +  cupon.descripcion}
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
