import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectTipoMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectTipoMaterial({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='tipo_material'>Tipo Material</InputLabel>
        <Select
          {...field}
          labelId='tipo_material'
          label='tipo_material'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((tipoMaterial) => (
              <MenuItem key={tipoMaterial.id} value={tipoMaterial.id}>
                {tipoMaterial.descripcion}
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
