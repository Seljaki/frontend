import { Box, Paper, Typography, Grid } from "@mui/material";
import myTheme from "../../theme";
import UserDetails from "../invoice/userDetails";

function DetailedInvoiceHeader({ invoice }) {
  const { id, title, note, started, ended, isPaid, dueDate, issuer = {}, customer = {}, totalPrice } = invoice || {};
  console.log(JSON.stringify(customer));

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 4,
      flex: 1,
      width:'100%'
    }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, alignItems: 'center', width: '100%' }}>
        <Typography variant="h4" sx={{ mb: 2, color: myTheme.palette.primary.main }}>{title}</Typography>
        <Grid container sx={{ width: '100%', p:1 }}>
          <Grid item xs={10}>
            <Typography variant="h6" sx={{ color: myTheme.palette.primary.main }}>Invoice note:</Typography>
            <Typography>
              {note}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography variant="h6">
              <span style={{ color: myTheme.palette.primary.main }}>TOTAL: </span>{totalPrice} €
            </Typography>
          </Grid>
          <UserDetails user={issuer} type={"Issuer"}></UserDetails>
          <Grid xs={1}/>
          <UserDetails user={customer} type={"Customer"}></UserDetails>
        </Grid>
      </Paper>
    </Box>
  )
}

export default DetailedInvoiceHeader;
