import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

SelectCanton.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  idProvincia: PropTypes.object,
};
export function SelectCanton({ field, data, idProvincia }) {
  console.log(idProvincia);

  let $arrayCantones = []

  data.forEach(function (canton) {
    if (canton.id_provincia === idProvincia) {
      $arrayCantones.push(canton)
    }
  });

  console.log($arrayCantones)
  
  if ($arrayCantones.length > -1)
  {
    return (
      <>
        <>
          <InputLabel id="canton">Canton</InputLabel>
          <Select
            {...field}
            labelId="canton"
            label="canton"
            defaultValue=""
            value={field.value}
          >
            {data &&
              $arrayCantones.map((Canton) => (
                <MenuItem key={Canton.id} value={Canton.id}>
                  {Canton.descripcion}
                </MenuItem>
              ))}
          </Select>
        </>
      </>
    );
  }
  else
  {
    console.log("Aun no")
  }
}
