import { useContext, useState } from "react"
import DbGeoJson from "./DbGeoJson"
import MapOverlay from "./MapOverlay"
import { Box, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { SERVER_URL } from "../../constants/http";
import { UserContext } from "../../store/userContext";
import EditPlot from "../plots/EditPlot";

function MapPlotDetailsOverlay() {
  const [plots, setPlots] = useState(null)
  const [editingPlot, setEditingPlot] = useState(null)
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
      setPlots({...plots, features: plots.features.filter(p => p.properties.id !== id)})
      setSelectedPlot(null)
      // TODO: doesnt update map
    }
  }

  async function editPlot(plot) {
    console.log(plot)
    const data = await fetch(SERVER_URL + `/plots/${plot.id}`, {
      method: 'PUT',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plot)
    });
    if (data.status < 300) {
      const json = await data.json();
      setPlots({...plots, features: plots.features.map(p => p.properties.id === plot.id ? {...p, properties: json.plot} : p)})
      setEditingPlot(null)
      // TODO: doesnt update map
    }
  }

  return (
    <>
      <DbGeoJson plots={plots} setPlots={setPlots} onFeaturePressed={(feature, plot) => {setSelectedPlot(plot)}} />
      {editingPlot && <EditPlot plot={editingPlot} setPlot={setEditingPlot} onConfirm={() => {editPlot(editingPlot)}} onCancel={() => {setEditingPlot(null)}} />}
      { selectedPlot &&
        <MapOverlay style={{ top: 10, right: 10, padding: 2 }}>
          <IconButton onClick={(e) => {e.stopPropagation(); setSelectedPlot(null)}}><CloseRoundedIcon fontSize="large" /></IconButton>
          <Typography>Title: {title}</Typography>
          <Typography>Note: {note}</Typography>
          <Typography>Size: {plotSize}m²/{(plotSize/10000).toFixed(2)}ha</Typography>
          <Typography>ID: {plotNumber} {cadastralMunicipality}</Typography>
          <Typography>Is archived: {String(archived)}</Typography>
          <Box display="flex" flex={1} justifyContent="center">
            <IconButton color="primary" onClick={() => {setEditingPlot(selectedPlot)}}><EditIcon/></IconButton>
            <IconButton color="secondary" onClick={deletePlot} ><DeleteIcon/></IconButton>
          </Box>
        </MapOverlay>
      }
    </>
  )
}

export default MapPlotDetailsOverlay