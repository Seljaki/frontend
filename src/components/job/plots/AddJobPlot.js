import { TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { UserContext } from "../../../store/userContext"
import SelectPlotFromMap from "../../map/SelectPlotFromMap"
import { SERVER_URL } from "../../../constants/http"

function AddJobPlot({jobId, onJobPlotAdded = () => {}, onClose = () => {}}) {
  const [ date, setDate ] = useState(new Date())
  const [ selectedPlot, setSelectedPlot ] = useState(null)
  const [ isSelectingPlot, setIsSelectingPlot ] = useState(false)
  
  const userCtx = useContext(UserContext)

  async function submitJobPlot() {
    console.log(date)
    const data = await fetch(SERVER_URL + `/jobs/${jobId}/plots/${selectedPlot.id}`, {
      method: 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date
      })
    });
    if (data.status < 300) {
      //const json = await data.json();
      onJobPlotAdded()
    }
  }

  return (
    <>
      { isSelectingPlot && <SelectPlotFromMap onPlotSelected={(plot) => {
        setIsSelectingPlot(false)
        console.log("ssss: ",plot)
        setSelectedPlot(plot)
      }} />}
      <div>
        { selectedPlot && <Typography>Selected plot - {selectedPlot.title}</Typography>}
        <TextField type="button" value="Choose plot" onClick={() => {setIsSelectingPlot(true)}}/>
        <TextField type="date" value={date} onChange={(e) => {setDate(e.target.value)}} />
        <TextField type="submit" value="Confirm" disabled={selectedPlot === null} onClick={submitJobPlot} />
      </div>
    </>
  )
}

export default AddJobPlot