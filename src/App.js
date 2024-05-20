import { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./store/userContext";
import Routes from "./routing";

function App() {
  const userCtx = useContext(UserContext)

  if(!userCtx.token)
    return <LoginPage />
  
  return (
    <>
        <Routes />
    </>
  )
}

export default App;
