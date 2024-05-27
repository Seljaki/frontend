import { Paper, Select, TextField, MenuItem } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../store/userContext"
import { getAllJobTypes } from "../../util/http/jobTypes"
import { getTotalPriceForQuantityType, getUnitForQuantityType } from "../../constants/jobs"
import { SERVER_URL } from "../../constants/http"

function EditJob({job: j, onConfirm = (job) => {}}) {
  const [job, setJob] = useState(j ? j : { quantity: 1, price: null, timeTaken: 0, jobtype_id: null })
  const [jobTypes, setJobTypes] = useState([])
  const [plots, setPlots] = useState([])
  const userCtx = useContext(UserContext)

  useEffect(() => {
    async function getAllPlots() {
      const data = await fetch(SERVER_URL + '/plots', {
        headers: {
          "x-auth-token": userCtx.token
        }
      });
      if (data.status < 300) {
        const json = await data.json();
        return json.plots;
      }
    }

    async function getJT() {
      setJobTypes(await getAllJobTypes(userCtx.token))
    }
    getJT()
    getAllPlots()
  }, [])

  function findJobType() {
    const jobType = jobTypes.find(jt => jt.id === job.jobtype_id);
    return jobType || {};
  }

  useEffect(() => {
    const jt = findJobType()
    setJob({...job, price: jt.price})
  }, [job.jobtype_id])

  return (
    <Paper sx={{ display: "flex", flexDirection: 'column' }}>
      <Select required value={job.jobtype_id} onChange={(e) => {setJob({...job, jobtype_id: e.target.value})}}>
        { jobTypes.map(jt => <MenuItem value={jt.id}>{jt.name} - {jt.price}€</MenuItem>) }
      </Select>
      { job.jobtype_id &&
      <>
        <TextField inputProps={{min: 1}} required type="number" label={`Količina (${getUnitForQuantityType(findJobType().quantityType)})`} value={job.quantity} onChange={e => {setJob({...job, quantity: e.target.value})}}/>
        <TextField inputProps={{min: 0}} required type="number" label={`Cena na ${getUnitForQuantityType(findJobType().quantityType)}`} value={job.price} onChange={e => {setJob({...job, price: e.target.value})}}/>
        <TextField inputProps={{min: 0}} required type="number" label="Čas dela (min)" value={job.timeTaken} onChange={e => {setJob({...job, timeTaken: e.target.value})}}/>
        <TextField type="number" label="Skupna cena" value={getTotalPriceForQuantityType(job.price, job.quantity, findJobType().quantityType)} disabled />
        <TextField type="submit" value="Potrdi" onClick={() => onConfirm(job)} />
      </>}
    </Paper>
  )
}

export default EditJob