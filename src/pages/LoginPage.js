import { useState } from "react"
import { SERVER_URL } from "../constants/http"
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const paperStyle = {padding : 20, height:'37vh', width:280, margin:"20px auto"}
    const avatarStyle = {backgroundColor:'Green'}
    const textFieldStyle = {margin:"auto auto 15px"}
    const buttonStyle = {padding: "auto auto 30px"}

  const [testData, setTestData] = useState(null)

  async function login(e) {
    e.preventDefault();
    const res = await fetch(SERVER_URL + "/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    
    if(res.status === 201) {
      const data = await res.json()
      const token = data.token
      console.log(token)
      getUsers(token)
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
    setTestData(data)
  }

  if(testData)
    return <div>{testData.users.map(data => <pre>{JSON.stringify(data)}</pre>)}</div>

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
                <Button type='submit' color='primary' variant="contained" fullWidth style = {buttonStyle}>Prijava</Button>
            </Paper>
        </Grid>
    );
}

export default LoginPage