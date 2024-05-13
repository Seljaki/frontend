import { useState } from "react"
import { SERVER_URL } from "../constants/http"
import {Typography} from "@mui/material";

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [testData, setTestData] = useState(null)

  async function login() {
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
    <div>
      <Typography>UPDATED v2</Typography>
      Username: <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} /> <br />
      password: <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} /> <br />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default LoginPage