import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";
import AllEquipment from "./pages/Equipment/AllEquipment";

function Routes(){
    return(
        <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/Equipment" component={AllEquipment} />
        </Switch>
    )
}

export default Routes;