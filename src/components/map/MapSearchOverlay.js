import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import MapOverlay from "./MapOverlay";
import { searchCadastralMunicipalitiesByName } from "../../http/wfs/euprava";
import { useMap } from "react-leaflet";


function MapSearchOverlay() {
  const [mapSearch, setMapSearch] = useState('')
  const [selectedMunicipality, setSelectedMunicipality] = useState(null)
  const [municipalities, setMunicipalities] = useState([])
  const map = useMap()

  useEffect(() => {
    async function setMan() {
      setMunicipalities(await searchCadastralMunicipalitiesByName(mapSearch))
    }
    setMan()
  }, [mapSearch])

  useEffect(() => {
    if(!selectedMunicipality)
      return
    console.log("Bounds: " + selectedMunicipality.bbox[0], selectedMunicipality.bbox[1])
    map.fitBounds([[selectedMunicipality.bbox[1], selectedMunicipality.bbox[0]], [selectedMunicipality.bbox[3], selectedMunicipality.bbox[2]]])
  }, [selectedMunicipality])

  return (
    <MapOverlay style={{ top: 10, left: 100, padding: 1 }}>
      <Autocomplete
        freeSolo
        onChange={(event, newValue) => {
          let mun = municipalities.find(m => m.properties.NAZIV.toLowerCase() === newValue.toLowerCase())
          if(!mun)
            mun = municipalities.find(m => m.properties.NAZIV.toLowerCase().includes(newValue.toLowerCase()))
          console.log(mun)
          if(mun)
            setSelectedMunicipality(mun)
        }}
        disableClearable
        options={municipalities.map((municipality) => municipality.properties.NAZIV)}
        renderInput={(params) => (
          <TextField
            sx={{width: 400}}
            {...params}
            label="Išči"
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}   
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      </MapOverlay>
  )
}

export default MapSearchOverlay