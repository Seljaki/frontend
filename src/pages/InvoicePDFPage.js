import { PDFViewer } from "@react-pdf/renderer"
import InvoicePDF from "../components/invoice/pdf/InvoicePDF"
import { useParams } from "wouter";
import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { SERVER_URL } from "../constants/http";
import { UserContext } from "../store/userContext";

function InvoicePDFPage() {
  const [invoice, setInvoice] = useState(null)
  const [jobs, setJobs] = useState([])
  const { invoiceId } = useParams();
  const userCtx = useContext(UserContext)

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
  }, [invoiceId])

  if(!invoice)
    return <Typography flex={1}>NALAGANJE</Typography>

  return (
    <PDFViewer style={{ flex: 1}}>
      <InvoicePDF invoice={invoice} />
    </PDFViewer>
  )
}

export default InvoicePDFPage