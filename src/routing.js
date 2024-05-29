import {Route, Switch, useLocation} from "wouter";
import MapPage from "./pages/MapPage";
import EquipmentPage from "./pages/EquipmentPage";
import ServicePage from "./pages/ServicePage";
import {useEffect} from "react";

function Routes(){
  const [location] = useLocation();
  useEffect(() => {
    const setTitle = () => {
      switch(location) {
        case "/map":
          document.title = "Map";
          break;
        case "/equipment":
          document.title = "Equipment";
          break;
        default:
        if (location.startsWith("/service"))
          document.title = "Service";
        else
          document.title = "Agro  Majster";
      }
    };
    setTitle();
    return () => {
      setTitle();
    };
  }, [location]);

    return(
        <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/equipment" component={EquipmentPage} />
            <Route path="/service/:equipment_id" component={ServicePage} />
        </Switch>
    )
}

export default Routes;