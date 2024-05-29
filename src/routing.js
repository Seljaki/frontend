import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";
import EquipmentPage from "./pages/EquipmentPage";

function Routes(){
    return(
        <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/equipment" component={EquipmentPage} />
        </Switch>
    )
}

export default Routes;