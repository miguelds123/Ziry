import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectUsuarioAdmin.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectUsuarioAdmin({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='usuario'>Administrador</InputLabel>
        <Select
          {...field}
          labelId='usuario'
          label='usuario'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((usuario) => (
              <MenuItem key={usuario.id} value={usuario.id}>
                {usuario.nombre} {usuario.apellido}
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
