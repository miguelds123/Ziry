import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectTipoCupon.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectTipoCupon({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='id_tipo_cupon'>Tipo Cupon</InputLabel>
        <Select
          {...field}
          labelId='Tipo Cupon'
          label='id_tipo_cupon'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((id_tipo_cupon) => (
              <MenuItem key={id_tipo_cupon.id} value={id_tipo_cupon.id}>
                {id_tipo_cupon.descripcion} 
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
