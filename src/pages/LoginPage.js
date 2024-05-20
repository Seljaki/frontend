import { useContext, useState } from "react"
import { SERVER_URL } from "../constants/http"
import { Alert, Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { UserContext } from "../store/userContext";

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState(null)

  const userCtx = useContext(UserContext)

  const paperStyle = {padding : 20, width:320, margin:"20px auto"}
  const avatarStyle = {backgroundColor:'Green'}
  const textFieldStyle = {margin:"auto auto 15px"}
  const buttonStyle = {padding: "auto auto 30px"}

  async function login(e) {
    e.preventDefault();
    setWarning(null)
 
    if(!await userCtx.login(username, password)) {
      setWarning("Uporabniško ime ali geslo je napačno")
    }
  }

  async function getUsers(token) {
    const res = await fetch(SERVER_URL + '/users', {
      headers: {
        'x-auth-token': token
      }
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} component="form" onSubmit={login}>
        <Grid align='center'>
            <Avatar style={avatarStyle}><LockPersonIcon/></Avatar>
            <h2>Prijavi se!</h2>
        </Grid>
        <TextField
        required
        id="standard-required"
        label="Uporabniško ime"
        variant="standard"
        name="username"
        fullWidth
        style = {textFieldStyle}
        value={username}
        onChange={e => setUsername(e.target.value)}
        />
        <TextField
        required	
        id="standard-required"
        label="Geslo"
        type="password"
        autoComplete="current-password"
        variant="standard"
        name="password"
        fullWidth
        style = {textFieldStyle}
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        { warning && <Alert sx={{marginBottom: "15px"}} severity="warning">{warning}</Alert>}
        <Button type='submit' color='primary' variant="contained" fullWidth style = {buttonStyle}>Prijava</Button>
      </Paper>
    </Grid>
    );
}

export default LoginPage