import { useMap, useMapEvents, GeoJSON } from "react-leaflet"
import MapOverlay from "./MapOverlay"
import { transformCordsFromEPSG4326To3794 } from "../../constants/crs"
import { getPlotForCoordinates } from "../../http/wfs/euprava"
import { useState } from "react"
import { IconButton, Typography } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReactLeafletRightClick, { useLeafletRightClick } from "react-leaflet-rightclick"

function MapFieldSelection() {
  const [plot, setPlot] = useState(null)

  const map = useLeafletRightClick()

  async function getPlot(e) { 
    const transformedCords = transformCordsFromEPSG4326To3794(e.latlng.lng, e.latlng.lat)
    const plotGeoJson = await getPlotForCoordinates(transformedCords[0], transformedCords[1])
    setPlot(plotGeoJson)
    console.log(plotGeoJson)
  }

  return (
    <>
      <ReactLeafletRightClick onRightClick={getPlot} />
      { plot && plot.features.map(p => <GeoJSON key={p.id} data={p} />) }
      { plot && 
      <MapOverlay style={{ top: 10, right: 10, padding: 1 }}>
        <IconButton onClick={(e) => {e.stopPropagation(); setPlot(null)}}><CloseRoundedIcon fontSize="large" /></IconButton>
        {plot.features.map(p => (
          <div key={p.id}>
            <Typography>Naziv: {p.properties.NAZIV}</Typography>
            <Typography>ID katarske občine: {p.properties.KO_ID}</Typography>
            <Typography>Št parcele: {p.properties.ST_PARCELE}</Typography>
            <Typography>Površina: {p.properties.POVRSINA} m² / {(p.properties.POVRSINA * 0.0001).toFixed(2)} ha</Typography>
          </div>
        ))}
      </MapOverlay>}
    </>
  )
}

export default MapFieldSelection