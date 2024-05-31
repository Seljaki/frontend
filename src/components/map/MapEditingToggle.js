import MapOverlay from "./MapOverlay";
import { FormControlLabel, Switch } from "@mui/material";

function MapEditingToggle({ checked = false, setChecked = () => {}}) {
  return (
    <MapOverlay style={{ top: 100, left: 10, padding: 1, paddingLeft: 2 }}>
      <FormControlLabel control={<Switch checked={checked} onChange={(e, checked) => {setChecked(checked)}} />} label="Način urejanja" />
    </MapOverlay>
  )
}

export default MapEditingToggle