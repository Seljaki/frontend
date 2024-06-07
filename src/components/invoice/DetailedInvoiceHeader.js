import { Box, Paper, Typography, Grid } from "@mui/material";
import myTheme from "../../theme";
import UserDetails from "./userDetails";
import dayjs from "dayjs";
import IsInvoicePaidCheckBox from "./IsInvoicePaidCheckBox";
import { useContext } from "react";
import { UserContext } from "../../store/userContext";

function DetailedInvoiceHeader({ invoice, setInvoice = (invoice) => {} }) {
  const { id, title, note, started, ended, isPaid, dueDate, issuer = {}, customer = {}, totalPrice } = invoice || {};
  const userCtx = useContext(UserContext)

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 4,
      flex: 1,
      width:'100%'
    }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, alignItems: 'center', flex: 1}}>
        <Typography variant="h4" sx={{ mb: 2, color: myTheme.palette.primary.main, wordWrap:'break-word' }}>{title}</Typography>
        <Grid container>
          <Grid item xs={3}>
            <Typography>
              <Typography sx={{ color: myTheme.palette.primary.main }}>Začeto:</Typography>
            {dayjs(started).format('DD. MMM YYYY')}
          </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Typography sx={{ color: myTheme.palette.primary.main }}>Končano:</Typography>
              { ended ? dayjs(ended).format('DD. MMM YYYY') : "nedoločeno"}
          </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Typography sx={{ color: myTheme.palette.primary.main }}>Stanje:</Typography>
              <IsInvoicePaidCheckBox token={userCtx.token} invoiceId={id} isPaid={isPaid} setIsPaid={(isPaid) => {
                  setInvoice({...invoice, isPaid: isPaid})
                }} />
              {isPaid ? "plačano" : "neplačano"}
          </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Typography sx={{ color: myTheme.palette.primary.main }}>Rok plačila:</Typography>
              { dueDate ? dayjs(dueDate).format('DD. MMM YYYY') : "nedoločeno"}
          </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{color: myTheme.palette.primary.main}} variant="h6">Opomba:</Typography>
            <Typography sx={{wordWrap: 'break-word'}}>
              {note}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb:1}}>
            <Typography sx={{wordWrap: 'break-word'}} variant="h6">
              <span style={{ color: myTheme.palette.primary.main }}>VSOTA: </span>{totalPrice} €
            </Typography>
          </Grid>
          <UserDetails user={issuer} type={"Izdajatelj"}></UserDetails>
          <Grid xs={1}/>
          <UserDetails user={customer} type={"Stranka"}></UserDetails>
        </Grid>
      </Paper>
    </Box>
  )
}

export default DetailedInvoiceHeader;
