import React, { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./store/userContext";
import Routes from "./routing";
import SideMenu from "./components/SideMenu";

function App() {
  const userCtx = useContext(UserContext)

  if(!userCtx.token)
    return <LoginPage />
  
  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <Routes />
    </div>
  )
}

export default App;
