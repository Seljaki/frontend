import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";
import ListUsers from "./components/usersCrud/ListUsers";
import AddUser from "./components/usersCrud/AddUser";
import EditUser from "./components/usersCrud/EditUser";

function Routes(){
    return(
        <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/users" component={ListUsers} />
            <Route path="/users/add" component={AddUser} />
            <Route path="/users/edit/:userId" component={EditUser} />
        </Switch>
    )
}

export default Routes;