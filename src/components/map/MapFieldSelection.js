import { GeoJSON } from "react-leaflet"
import MapOverlay from "./MapOverlay"
import { transformCordsFromEPSG4326To3794 } from "../../constants/crs"
import { getPlotForCoordinates } from "../../http/wfs/euprava"
import { useContext, useState } from "react"
import { Alert, Box, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReactLeafletRightClick, { useLeafletRightClick } from "react-leaflet-rightclick"
import { SERVER_URL } from "../../constants/http"
import { UserContext } from "../../store/userContext"

function MapFieldSelection() {
  const [plot, setPlot] = useState(null)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [snackbarState, setSnackbarState] = useState(true)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('')

  const userCtx = useContext(UserContext)
  const map = useLeafletRightClick()

  async function getPlot(e) { 
    const transformedCords = transformCordsFromEPSG4326To3794(e.latlng.lng, e.latlng.lat)
    const plotGeoJson = await getPlotForCoordinates(transformedCords[0], transformedCords[1])
    setPlot(plotGeoJson)
    console.log(plotGeoJson)
  }

  async function savePlot(p) {
    p.crs = plot.crs
    console.log(p, title, note)
    if(title.length < 3)
      return
    const { KO_ID, ST_PARCELE } = p.properties
    const res = await fetch(SERVER_URL + '/plots', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userCtx.token
      },
      body: JSON.stringify({
        title: title,
        note: note,
        boundary: p.geometry,
        plotNumber: ST_PARCELE,
        cadastralMunicipality: KO_ID
      })
    })
    if(res.status < 300) {
      setSnackbarSeverity('success')
      setSnackbarMessage('Success')
    } else {
      const data = await res.json()
      setSnackbarSeverity('error')
      setSnackbarMessage(data.message)
    }
    setSnackbarState(true)
  }

  return (
    <>
      <ReactLeafletRightClick onRightClick={getPlot} />
      { plot && plot.features.map(p => <GeoJSON key={p.id} data={p} />) }
      { plot && 
      <MapOverlay style={{ top: 10, right: 10, padding: 1 }}>
        <IconButton onClick={(e) => {e.stopPropagation(); setPlot(null)}}><CloseRoundedIcon fontSize="large" /></IconButton>
        {plot.features.map(p => (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }} key={p.id}>
            <TextField value={title} defaultValue={p.properties.NAZIV} onChange={(e) => {setTitle(e.target.value)}} label="Naziv"/>
            <TextField value={note} onChange={(e) => {setNote(e.target.value)}} label="Opis"/>
            <Typography>ID katarske občine: {p.properties.KO_ID}</Typography>
            <Typography>Št parcele: {p.properties.ST_PARCELE}</Typography>
            <Typography>Površina: {p.properties.POVRSINA} m² / {(p.properties.POVRSINA * 0.0001).toFixed(2)} ha</Typography>
            <Button onClick={() => {savePlot(p)}} variant="contained" sx={{flex: 1}}>Save</Button>
          </Box>
        ))}
      </MapOverlay>}
      <Snackbar open={snackbarState} autoHideDuration={5000} onClose={() => {setSnackbarState(false)}} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={() => {setSnackbarState(false)}}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default MapFieldSelection