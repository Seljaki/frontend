import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";
import JobTypesPage from "./pages/JobTypesPage";

function Routes(){
    return(
        <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/jobTypes" component={JobTypesPage} />
        </Switch>
    )
}

export default Routes;