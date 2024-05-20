import { createContext, useState } from "react";
import { SERVER_URL } from "../constants/http";

const userInfo = { username: "", email: ""}

export const UserContext = createContext({
  token: "",
  user: userInfo,
  login: async (username, password) => {},
  logout: async () => {}
})

function UserContextProvider({children}) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(userInfo)

  async function login(username, password) {
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
    
    if(res.status === 200) {
      const data = await res.json()
      const { token, user } = data
      console.log(token)
      setToken(token)
      setUser(user)
      return true
    } else {
      return false
    }
  }

  async function logout() {
    setToken(null)
    setUser(userInfo)
  }

  const value = {
    token: token,
    user: user,
    login: login,
    logout: logout
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider