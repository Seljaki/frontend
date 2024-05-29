import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVER_URL } from "../../../constants/http";
import { useContext } from "react";
import { UserContext } from "../../../store/userContext";

function JobPlotRow({jobPlot, jobId, onDeleted = () => {}}) {
  const {id, title, dateDone, plotSize, plotNumber, cadastralMunicipality} = jobPlot
  const userCtx = useContext(UserContext)

  async function deleteJobPlot() {
    const data = await fetch(SERVER_URL + `/jobs/${jobId}/plots/${id}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token,
      },
    });
    if (data.status < 300) {
      onDeleted()
    }
  }

  return (
    <div>
      { title } - { dateDone }
      <IconButton onClick={deleteJobPlot} color="secondary"><DeleteIcon/></IconButton>
    </div>
  )
}

export default JobPlotRow