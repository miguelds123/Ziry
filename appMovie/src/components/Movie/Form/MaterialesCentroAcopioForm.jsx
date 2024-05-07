import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RecyclingSharpIcon from '@mui/icons-material/RecyclingSharp';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { SelectMaterialCentroAcopio } from './SelectMaterialCentroAcopio';

MaterialesCentroAcopioForm.propTypes = {
  data: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onInputChange: PropTypes.func,
  disableRemoveButton: PropTypes.bool,
  field: PropTypes.object,
};

export function MaterialesCentroAcopioForm({
  data,
  control,
  index,
  onRemove,
  disableRemoveButton,
  // eslint-disable-next-line no-unused-vars
  field,
}) {
  return (
    

    <section key={index}>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Tooltip title={`Material ${index + 1}`}>
                <IconButton>
                  <RecyclingSharpIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText>
              <Controller
                key={index}
                name={`materiales.${index}.id_material`}
                control={control}
                render={({ field }) => (
                  <SelectMaterialCentroAcopio field={field} data={data} 
                   />
                )}
               
              />
              
            </ListItemText>
            
            <ListItemIcon>
              <Tooltip title={`Eliminar Material ${index + 1}`}>
                <span>
                  <IconButton
                    key={index}
                    edge='end'
                    disabled={disableRemoveButton}
                    onClick={() => onRemove(index)}
                    aria-label='Eliminar'
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </section>
  );
}
