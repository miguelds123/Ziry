import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

SelectDistrito.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  idCanton: PropTypes.object,
  idProvincia: PropTypes.object,
};
export function SelectDistrito({ field, data, idCanton, idProvincia }) {
  console.log(idCanton);

  let $arrayDistritos = []

  data.forEach(function (distrito) {
    if (distrito.id_provincia === idProvincia && distrito.id_canton === idCanton) {
      $arrayDistritos.push(distrito)
    }
  });

  console.log($arrayDistritos)
  
  if ($arrayDistritos.length > -1)
  {
    return (
      <>
        <>
          <InputLabel id="distrito">Distrito</InputLabel>
          <Select
            {...field}
            labelId="distrito"
            label="distrito"
            defaultValue=""
            value={field.value}
          >
            {data &&
              $arrayDistritos.map((Distrito) => (
                <MenuItem key={Distrito.id} value={Distrito.id}>
                  {Distrito.descripcion}
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
