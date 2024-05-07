import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectColor.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectColor({ field, data }) {
  console.log(data)
  return (
    <>
      <>
        <InputLabel id='color'>Color</InputLabel>
        <Select
          {...field}
          labelId='color'
          label='color'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((color) => (
              <MenuItem key={color.id} value={color.color}>
                {color.descripcion}
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
