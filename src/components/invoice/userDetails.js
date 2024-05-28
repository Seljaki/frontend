import myTheme from "../../theme";
import {Grid, Typography} from "@mui/material";

function UserDetails({user, type}){

  return(
    <Grid item xs={5.5} sx={{ border: 'solid 1px', borderColor: myTheme.palette.secondary.main, borderRadius: 2, p:1}}>
      <Typography ><span style={{ color: myTheme.palette.primary.main }}>{type}: </span>{user.name}</Typography>
      <Typography ><span style={{ color: myTheme.palette.primary.main }}>Address: </span>{user.address}</Typography>
      <Typography ><span style={{ color: myTheme.palette.primary.main }}>Phone: </span>{user.phone}</Typography>
      <Typography ><span style={{ color: myTheme.palette.primary.main }}>Email: </span>{user.email}</Typography>
      <Typography ><span style={{ color: myTheme.palette.primary.main }}>Iban: </span>{user.iban}</Typography>

    </Grid>

  )
}export default UserDetails