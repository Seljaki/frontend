import { useContext, useEffect, useState } from "react"
import { UserContext } from "../store/userContext"
import { useParams } from "wouter"
import { SERVER_URL } from "../constants/http"
import EditJob from "../components/job/EditJob"
import JobRow from "../components/job/JobRow"
import { Button } from "@mui/material"
import DetailedInvoiceHeader from "../components/company/DetailedInvoiceHeader"

function DetailedInvocieView() {
  const [invoice, setInvoice] = useState({})
  const [editingJob, setEditingJob] = useState(null)
  const [jobs, setJobs] = useState([])
  const userCtx = useContext(UserContext)
  const { invoiceId } = useParams()

  useEffect(() => {
    const totalPrice = jobs.reduce((acc, j) => acc + Number(j.totalPrice), 0)
    setInvoice({...invoice, totalPrice: totalPrice})
  }, [jobs])
  
  useEffect(() => {
    async function getInvoice() {
      const data = await fetch(SERVER_URL + `/invoices/${invoiceId}`, {
        headers: {
          "x-auth-token": userCtx.token,
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        setInvoice(json.invoice)
      }
    }
    async function getJobs() {
      const data = await fetch(SERVER_URL + `/invoices/${invoiceId}/jobs`, {
        headers: {
          "x-auth-token": userCtx.token,
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        setJobs(json.jobs)
      }
    }
    getInvoice()
    getJobs()
  }, [])

  async function addJobToinvoice(job) {
    const data = await fetch(SERVER_URL + `/invoices/${invoiceId}/jobs`, {
      method: 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job)
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobs([json.job, ...jobs]);
      setEditingJob(null)
    }
  }

  async function updateJob(job) {
    const data = await fetch(SERVER_URL + `/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job)
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobs(jobs.map(j => j.id === job.id ? json.job : j));
      setEditingJob(null)
    }
  }

  async function deleteJob(jobId) {
    const data = await fetch(SERVER_URL + `/invoices/${invoiceId}/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token,
      }
    });
    if (data.status < 300) {
      setJobs(jobs.filter(j => j.id !== jobId));
    }
  }

  return (
    <div style={{ maxWidth: "70%" }}>
      <DetailedInvoiceHeader invoice={invoice} />
      <Button variant="contained" onClick={() => {
        setEditingJob({ quantity: 1, price: null, timeTaken: 0, jobtype_id: null })
      }}>Add job</Button>
      { editingJob && <EditJob job={editingJob} setJob={setEditingJob} onCancel={() => {setEditingJob(null)}} onConfirm={j => {
        if(j.id)
          updateJob(j)
        else
          addJobToinvoice(j)
      }} />}
      { jobs.map(j => <JobRow key={j.id} job={j} onDelete={() => {deleteJob(j.id)}} onEdit={() => {
        setEditingJob(j)
      }} />) }
    </div>
  )
}

export default DetailedInvocieView