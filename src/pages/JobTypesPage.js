import { Box, Button, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import JobTypeRow from "../components/jobType/JobTypeRow"
import { SERVER_URL } from "../constants/http"
import { UserContext } from "../store/userContext"
import EditJobType from "../components/jobType/EditJobType"


function JobTypesPage() {
  const [jobTypes, setJobTypes] = useState([])
  const [editingJobType, setEditingJobType] = useState(null)
  const [isAddingJobType, setIsAddingJobType] = useState(false)
  const userCtx = useContext(UserContext)

  useEffect(() => {
    async function getAllJobTypes() {
      const data = await fetch(SERVER_URL + '/jobTypes', {
        headers: {
          "x-auth-token": userCtx.token
        }
      })
      if(data.status < 300) {
        const json = await data.json()
        setJobTypes(json.jobTypes)
        console.log("JT: ", jobTypes)
      }
    }
    getAllJobTypes()
  }, [])

  async function onSubmit(jobType) {
    console.log(jobType)
    const data = await fetch(SERVER_URL + '/jobTypes' , {
      method: jobType.id ? 'PUT' : 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobType)
    })
    if(data.status < 300) {
      const json = await data.json()
      setJobTypes([json.jobType, ...jobTypes])
    }
  }

  async function onEdit(jobType) {
    console.log(jobType)
    const data = await fetch(SERVER_URL + `/jobTypes/${jobType.id}` , {
      method: jobType.id ? 'PUT' : 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobType)
    })
    if(data.status < 300) {
      const json = await data.json()
      const jobType = json.jobType
      setJobTypes([jobType, ...jobTypes.filter(j => j.id !== jobType.id)])
    }
  }

  async function deletJobType(id) {
    const data = await fetch(`${SERVER_URL}/jobTypes/${id}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token
      }
    })
    return data.status < 300
  }

  return (
    <Box>
      <Typography variant="h1">Job types</Typography>
      <Button onClick={() => {
        setEditingJobType(null)
        setIsAddingJobType(true)
      }}>Dodaj novo</Button>
      { (isAddingJobType || editingJobType) && <EditJobType jobType={editingJobType} onConfirmed={(jt) => {
          if(!jt.id)
            onSubmit(jt)
          else
            onEdit(jt)
          setIsAddingJobType(false)
          setEditingJobType(null)
        }} /> }
      { jobTypes && jobTypes.map(jt => <JobTypeRow onDelete={async () => {
        if(await deletJobType(jt.id)) {
          setJobTypes(jobTypes.filter(j => j.id !== jt.id))
        }
      }}
      onEdit={() => {
        setEditingJobType(jt)
      }} key={jt.id} jobType={jt} />) }
    </Box>
  )
}

export default JobTypesPage