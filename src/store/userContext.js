import { createContext, useState } from "react";
import { SERVER_URL } from "../constants/http";

const userInfo = { id: 0, username: "", email: ""}

export const UserContext = createContext({
  token: "",
  user: userInfo,
  login: async (username, password) => {},
  logout: async () => {}
})

function UserContextProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : userInfo )

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
      setToken(token)
      setUser(user)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      return true
    } else {
      return false
    }
  }

  async function logout() {
    setToken(null)
    setUser(userInfo)
    localStorage.clear()
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