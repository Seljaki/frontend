import { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./store/userContext";
import Routes from "./routing";
import SideMenu from "./components/SideMenu";
import dayjs from "dayjs";
require('dayjs/locale/sl');

function App() {
  const userCtx = useContext(UserContext)
  dayjs.locale("sl")

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
