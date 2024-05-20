import { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./store/userContext";

function App() {
  const userCtx = useContext(UserContext)

  if(!userCtx.token)
    return <LoginPage />
  
  return (
    <>
      <div>Hello, {userCtx.user.username}</div>
      <button onClick={() => {userCtx.logout()}}>Logout</button>
    </>
  )
}

export default App;
