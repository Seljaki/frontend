import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  IconButton,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getUnitForQuantityType } from "../../constants/jobs";
import EditJobCost from "../jobCost/EditJobCost";
import { UserContext } from "../../store/userContext";
import { SERVER_URL } from "../../constants/http";
import JobCostRow from "../jobCost/JobCostRow";
import AddJobEquipment from "./equipment/AddJobEquipment";
import JobEquipmentRow from "./equipment/JobEquipmentRow";
import JobPlotRow from "./plots/JobPlotRow";
import AddJobPlot from "./plots/AddJobPlot";
import myTheme from "../../theme";


function JobRow({
                  job,
                  setJob = () => {},
                  onEdit = () => {},
                  onDelete = () => {}
                }) {
  const { id, quantity, price, totalPrice, timeTaken, jobType, totalCost } = job;
  const [editingJobCost, setEditingJobCost] = useState(null);
  const [jobCosts, setJobCosts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [addingEquipment, setAddingEquipment] = useState(false);
  const [jobPlots, setJobPlots] = useState([]);
  const [addingJobPlots, setAddingJobPlots] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const tCost = jobCosts.reduce((val, jc) => val + Number(jc.amount), 0);
    setJob({ ...job, totalCost: tCost });
  }, [jobCosts]);

  useEffect(() => {
    async function fetchAllJobCosts() {
      const data = await fetch(SERVER_URL + `/jobs/${id}/jobCosts`, {
        headers: {
          "x-auth-token": userCtx.token
        }
      });
      if (data.status < 300) {
        const json = await data.json();
        setJobCosts(json.jobCosts);
      }
    }

    async function fetchAllJobEquipment() {
      const data = await fetch(SERVER_URL + `/jobs/${id}/equipment`, {
        headers: {
          "x-auth-token": userCtx.token
        }
      });
      if (data.status < 300) {
        const json = await data.json();
        setEquipment(json.equipment);
      }
    }

    fetchAllJobPlots();
    fetchAllJobEquipment();
    fetchAllJobCosts();
  }, []);

  async function fetchAllJobPlots() {
    const data = await fetch(SERVER_URL + `/jobs/${id}/plots`, {
      headers: {
        "x-auth-token": userCtx.token
      }
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobPlots(json.plots);
    }
  }

  async function submitJobCost(jobCost) {
    const data = await fetch(SERVER_URL + `/jobs/${id}/jobCosts`, {
      method: "POST",
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobCost)
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobCosts([json.jobCost, ...jobCosts]);
      setEditingJobCost(null);
    }
  }

  async function updateJobCost(jobCost) {
    const data = await fetch(SERVER_URL + `/jobCosts/${jobCost.id}`, {
      method: "PUT",
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobCost)
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobCosts(jobCosts.map(jc => (jc.id === jobCost.id ? json.jobCost : jc)));
      setEditingJobCost(null);
    }
  }

  async function deleteJobCost(jobCostId) {
    const data = await fetch(SERVER_URL + `/jobCosts/${jobCostId}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": userCtx.token
      }
    });
    if (data.status < 300) {
      setJobCosts(jobCosts.filter(jc => jc.id !== jobCostId));
    }
  }

  function onAddJobCostPressed() {
    setEditingJobCost({ title: "", amount: 0 });
  }

  return (
    <>
      <TableRow>
        <TableCell sx={{pb :0}}>{jobType.name}</TableCell>
        <TableCell sx={{pb:0}}>{quantity}</TableCell>
        <TableCell sx={{pb:0}}>{getUnitForQuantityType(jobType.quantityType)}: {price} €</TableCell>
        <TableCell sx={{pb:0}}>{totalPrice} €</TableCell>
        <TableCell sx={{pb:0}}>{totalCost} €</TableCell>
        <TableCell sx={{pb:0}}>
          <IconButton onClick={onEdit} color="primary"><EditIcon /></IconButton>
          <IconButton onClick={onDelete} color="secondary"><DeleteIcon /></IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ pb: 0, pt: 0 }}>
          <Accordion
            style={{
              width: "100%",
              margin: 0,
              boxShadow: "none",
              borderBottom: "none"
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: 0 }}>
              <Typography color="secondary">Podrobnosti</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0, borderTop:"none" }}>
              <div style={{ width: "100%" }}>
                <Typography><span style={{color: myTheme.palette.primary.main}}>Zavzet čas:</span> {timeTaken} min</Typography>
                <Divider/>

                <Typography>STROŠKI</Typography>
                <Button variant="contained" sx={{my:1}} onClick={onAddJobCostPressed}>Dodaj stroške</Button>
                {editingJobCost && (
                  <EditJobCost
                    jobCost={editingJobCost}
                    setJobCost={setEditingJobCost}
                    onConfirm={() => {
                      if (editingJobCost.id) updateJobCost(editingJobCost);
                      else submitJobCost(editingJobCost);
                    }}
                    onClose={() => setEditingJobCost(false)}
                  />
                )}
                {jobCosts.map(jc => (
                  <JobCostRow
                    key={jc.id}
                    jobCost={jc}
                    onEdit={() => setEditingJobCost(jc)}
                    onDelete={() => deleteJobCost(jc.id)}
                  />
                ))}

                <Divider />
                <Typography>OPREMA</Typography>
                <Button variant="contained" sx={{my:1}} onClick={() => setAddingEquipment(true)}>Dodaj uporabljeno opremo</Button>
                {addingEquipment && (
                  <AddJobEquipment
                    jobId={id}
                    onEquipmentAdded={eq => {
                      setEquipment([...equipment, eq]);
                      setAddingEquipment(false);
                    }}
                    onClose={() => setAddingEquipment(false)}
                  />
                )}
                {equipment.map((eq, index) => (
                  <JobEquipmentRow
                    key={`${eq.id} + ${index}`}
                    jobId={id}
                    equipment={eq}
                    onDelete={() => setEquipment(equipment.filter(e => e.id !== eq.id))}
                  />
                ))}

                <Divider />
                <Typography>POLJA</Typography>
                <Button variant="contained" sx={{my:1}} onClick={() => setAddingJobPlots(true)}>Dodaj polje</Button>
                {addingJobPlots && (
                  <AddJobPlot
                    onClose={() => setAddingJobPlots(false)}
                    onJobPlotAdded={() => {
                      fetchAllJobPlots();
                      setAddingJobPlots(false);
                    }}
                    jobId={id}
                  />
                )}
                {jobPlots.map(jp => (
                  <JobPlotRow
                    key={jp.id}
                    jobId={id}
                    jobPlot={jp}
                    onDeleted={() => setJobPlots(jobPlots.filter(p => p.id !== jp.id))}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Divider/>
        </TableCell>
      </TableRow>
    </>
  );
}

export default JobRow;
