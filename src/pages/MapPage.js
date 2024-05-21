import { useEffect, useState } from "react";
import GerkMap from "../components/map/GerkMap"
import { searchCadastralMunicipalitiesByName } from "../http/wfs/euprava";
import MapOverlay from "../components/map/MapOverlay";
import { Autocomplete, TextField } from "@mui/material";

function MapPage() {
  const [mapSearchOptions, setMapSearchOptions] = useState('')
  const [municipalities, setMunicipalities] = useState([])
  

  useEffect(() => {
    async function setMan() {
      setMunicipalities(await searchCadastralMunicipalitiesByName(mapSearchOptions))
    }
    setMan()
  }, [mapSearchOptions])
  
  return (
    <>
    <GerkMap />
    <MapOverlay style={{ top: 10, left: 100, padding: 1 }}>
      <Autocomplete
        freeSolo
        disableClearable
        options={municipalities.map((municipality) => municipality.properties.NAZIV)}
        renderInput={(params) => (
          <TextField
            sx={{width: 400}}
            {...params}
            label="Išči"
            value={mapSearchOptions}
            onChange={(e) => setMapSearchOptions(e.target.value)}   
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      </MapOverlay>
    </>
  )
}

export default MapPage