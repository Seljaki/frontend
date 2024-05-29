import { useContext, useState } from "react"
import DbGeoJson from "./DbGeoJson"
import MapOverlay from "./MapOverlay"
import { Box, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { SERVER_URL } from "../../constants/http";
import { UserContext } from "../../store/userContext";

function MapPlotDetailsOverlay() {
  const [plots, setPlots] = useState(null)
  const [selectedPlot, setSelectedPlot] = useState(null)
  const { id, title, note, plotSize, plotNumber, cadastralMunicipality, archived} = selectedPlot ?? {}
  const userCtx = useContext(UserContext)

  async function deletePlot() {
    const data = await fetch(SERVER_URL + `/plots/${id}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token,
      },
    });
    if (data.status < 300) {
      setPlots(plots.features.filter(p => {console.log(p.properties.id); return p.properties.id !== id}))
      setSelectedPlot(null)
    }
  }

  return (
    <>
      <DbGeoJson plots={plots} setPlots={setPlots} onFeaturePressed={(feature, plot) => {setSelectedPlot(plot)}} />
      { selectedPlot &&
        <MapOverlay style={{ top: 10, right: 10, padding: 2 }}>
          <IconButton onClick={(e) => {e.stopPropagation(); setSelectedPlot(null)}}><CloseRoundedIcon fontSize="large" /></IconButton>
          <Typography>Title: {title}</Typography>
          <Typography>Note: {note}</Typography>
          <Typography>Size: {plotSize}m²/{(plotSize/10000).toFixed(2)}ha</Typography>
          <Typography>ID: {plotNumber} {cadastralMunicipality}</Typography>
          <Typography>Is archived: {String(archived)}</Typography>
          <Box display="flex" flex={1} justifyContent="center">
            <IconButton color="primary"><EditIcon/></IconButton>
            <IconButton color="secondary" onClick={deletePlot} ><DeleteIcon/></IconButton>
          </Box>
        </MapOverlay>
      }
    </>
  )
}

export default MapPlotDetailsOverlay