import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";
import EquipmentPage from "./pages/EquipmentPage";
import ServicePage from "./pages/ServicePage";

function Routes(){
    return(
        <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/equipment" component={EquipmentPage} />
            <Route path="/service/:equipment_id" component={ServicePage} />
        </Switch>
    )
}

export default Routes;