import {Paper, Select, TextField, MenuItem, Grid, FormControl, InputLabel} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../store/userContext"
import { getAllJobTypes } from "../../util/http/jobTypes"
import { getTotalPriceForQuantityType, getUnitForQuantityType } from "../../constants/jobs"
import { SERVER_URL } from "../../constants/http"

function EditJob({job, setJob = (job) => {}, onConfirm = (job) => {}, onCancel = () => {}}) {
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
        setPlots(json.plots);
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
    <Paper sx={{ display: "flex", width: "100%", p:2, mb:2}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center'}}>
          <FormControl sx={{ flex: 1, pr: 2 }}>
            <InputLabel id="job-type-label">Služba</InputLabel>
            <Select
              fullWidth
              labelId="job-type-label"
              label="Služba"
              required
              value={job.jobtype_id}
              onChange={(e) => {setJob({...job, jobtype_id: e.target.value})}}
            >
              { jobTypes.map(jt => <MenuItem key={jt.id} value={jt.id}>{jt.name} - {jt.price}€</MenuItem>) }
            </Select>
          </FormControl>
          <TextField
            sx={{ mr: 2 }}
            type="submit"
            disabled={job.jobtype_id === null}
            value="Potrdi"
            onClick={() => onConfirm(job)}
          />
          <TextField
            type="submit"
            value="Prekliči"
            onClick={() => onCancel(job)}
          />
        </Grid>

        { job.jobtype_id &&
          <>
            <Grid item xs={6}>
              <TextField sx={{width:"100%"}} inputProps={{min: 1}} required type="number" label={`Količina (${getUnitForQuantityType(findJobType().quantityType)})`} value={job.quantity} onChange={e => {setJob({...job, quantity: e.target.value})}}/>
            </Grid>
            <Grid item xs={6}>
              <TextField sx={{width:"100%"}} inputProps={{min: 0}} required type="number" label={`Cena na ${getUnitForQuantityType(findJobType().quantityType)}`} value={job.price} onChange={e => {setJob({...job, price: e.target.value})}}/>
            </Grid>
            <Grid item xs={6}>
              <TextField sx={{width:"100%"}} inputProps={{min: 0}} required type="number" label="Čas dela (min)" value={job.timeTaken} onChange={e => {setJob({...job, timeTaken: e.target.value})}}/>
            </Grid>
            <Grid item xs={6}>
              <TextField sx={{width:"100%"}} type="number" label="Skupna cena" value={getTotalPriceForQuantityType(job.price, job.quantity, findJobType().quantityType)} disabled />
            </Grid>
          </>}
      </Grid>
    </Paper>
  )
}

export default EditJob
