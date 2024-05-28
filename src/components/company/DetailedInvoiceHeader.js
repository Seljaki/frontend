import { Paper, Typography } from "@mui/material"


function DetailedInvoiceHeader({invoice}) {
  const { id, title, note, started, ended, isPaid, dueDate, issuer, customer, totalPrice} = invoice
  return (
    <Paper>
      <Typography variant="h4">{title}</Typography>
      <Typography>{note}</Typography>
      <Typography>{JSON.stringify(issuer)}</Typography>
      <Typography>{JSON.stringify(customer)}</Typography>
      <Typography>TOTAL: {totalPrice} EUR </Typography>
    </Paper>
  )
}

export default DetailedInvoiceHeader