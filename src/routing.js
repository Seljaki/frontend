import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";

function Routes(){
    return(
        <Switch>
            <Route path="/map" component={MapPage} />
        </Switch>
    )
}

export default Routes;