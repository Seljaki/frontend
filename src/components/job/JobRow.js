import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getUnitForQuantityType } from "../../constants/jobs";
import { useContext, useEffect, useState } from "react";
import EditJobCost from "../jobCost/EditJobCost";
import { UserContext } from "../../store/userContext";
import { SERVER_URL } from "../../constants/http";
import JobCostRow from "../jobCost/JobCostRow";
import AddJobEquipment from "./equipment/AddJobEquipment"
import JobEquipmentRow from "./equipment/JobEquipmentRow";
import JobPlotRow from "./plots/JobPlotRow";
import AddJobPlot from "./plots/AddJobPlot";

function JobRow({job, setJob = () => {}, onEdit = () => {}, onDelete = () => {}}) {
  const { id, quantity, price, totalPrice, timeTaken, invoice_id, jobtype_id, jobType, totalCost } = job
  const [ editingJobCost, setEditingJobCost ] = useState(null)
  const [ jobCosts, setJobCosts ] = useState([])
  const [ equipment, setEquipment ] = useState([])
  const [ addingEquipment, setAddingEquipment ] = useState(false)
  const [ jobPlots, setJobPlots ] = useState([])
  const [ addingJobPlots, setAddingJobPlots ] = useState(false)
  const userCtx = useContext(UserContext)

  useEffect(() => {
    const tCost = jobCosts.reduce((val, jc) => val + Number(jc.amount), 0)
    setJob({...job, totalCost: tCost})
  }, [jobCosts])

  useEffect(() => {
    async function fetchAllJobCosts() {
      const data = await fetch(SERVER_URL + `/jobs/${id}/jobCosts`, {
        headers: {
          "x-auth-token": userCtx.token,
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        setJobCosts(json.jobCosts)
      }
    }
    async function fetchAllJobEquipment() {
      const data = await fetch(SERVER_URL + `/jobs/${id}/equipment`, {
        headers: {
          "x-auth-token": userCtx.token,
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        setEquipment(json.equipment)
      }
    }
    fetchAllJobPlots()
    fetchAllJobEquipment()
    fetchAllJobCosts()
  }, [])

  async function fetchAllJobPlots() {
    const data = await fetch(SERVER_URL + `/jobs/${id}/plots`, {
      headers: {
        "x-auth-token": userCtx.token,
      },
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobPlots(json.plots)
    }
  }

  async function submitJobCost(jobCost) {
    const data = await fetch(SERVER_URL + `/jobs/${id}/jobCosts`, {
      method: 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobCost)
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobCosts([json.jobCost,...jobCosts])
      setEditingJobCost(null)
    }
  }

  async function updateJobCost(jobCost) {
    const data = await fetch(SERVER_URL + `/jobCosts/${jobCost.id}`, {
      method: 'PUT',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobCost)
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobCosts(jobCosts.map(jc => jc.id === jobCost.id ? json.jobCost : jc))
      setEditingJobCost(null)
    }
  }

  async function deleteJobCost(jobCostId) {
    const data = await fetch(SERVER_URL + `/jobCosts/${jobCostId}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token,
      },
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobCosts(jobCosts.filter(jc => jc.id !== jobCostId))
    }
  }

  function onAddJobCostPressed() {
    setEditingJobCost({ title: '', amount: 0 })
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <span style={{ display: "flex", alignItems: 'center', flex: 1, gap: 25}}>
          <span>{jobType.name}</span>
          <span>količina: {quantity}</span>
          <span>cena na {getUnitForQuantityType(jobType.quantityType)}: {price} EUR</span>
          <span>končna cena: {totalPrice} EUR</span>
          <span>končni stroški: {totalCost} EUR</span>
        </span>
        <span>
          <IconButton onClick={onEdit} color="primary"><EditIcon/></IconButton>
          <IconButton onClick={onDelete} color="secondary"><DeleteIcon/></IconButton>
        </span>
      </AccordionSummary>
      <AccordionDetails>
      <Button onClick={onAddJobCostPressed}>Add job cost</Button>
        { editingJobCost && <EditJobCost jobCost={editingJobCost} setJobCost={setEditingJobCost} onConfirm={() => {
          if(editingJobCost.id)
            updateJobCost(editingJobCost)
          else
            submitJobCost(editingJobCost)
        }} />}
        <Typography>Zavzet čas: {timeTaken} min</Typography>
        {jobCosts.map(jc => <JobCostRow key={jc.id} jobCost={jc}
          onEdit={() => {setEditingJobCost(jc)}}
          onDelete={() => {deleteJobCost(jc.id)}} 
          />) }
        <Divider />
        <Typography>EQUIPMENT USED</Typography>
        <Button onClick={() => {setAddingEquipment(true)}}>Add equipment used</Button>
        { addingEquipment && <AddJobEquipment jobId={id} onEquipmentAdded={(eq) => {setEquipment([...equipment, eq]); setAddingEquipment(false)}} onClose={() => {setAddingEquipment(false)}} />}
        { equipment.map((eq, index) => <JobEquipmentRow jobId={id} onDelete={() => {
          setEquipment(equipment.filter(e => e.id !== eq.id))
        }} key={`${eq.id} + ${index}`} equipment={eq} /> )}

        <Divider />
        <Typography>PLOTS</Typography>
        <Button onClick={() => {setAddingJobPlots(true)}}>Add plot</Button>
        { addingJobPlots && <AddJobPlot onClose={() => {setAddingJobPlots(false)}} onJobPlotAdded={() => {fetchAllJobPlots(); setAddingJobPlots(false)}} jobId={id} />}
        { jobPlots.map(jp => <JobPlotRow jobId={id} jobPlot={jp} onDeleted={() => {
          setJobPlots(jobPlots.filter(p => p.id !== jp.id))
        }} />) }
      </AccordionDetails>
    </Accordion>
  )
}

export default JobRow