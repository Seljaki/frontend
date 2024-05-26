import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";
import ListInvoices from "./components/ListInvoice";
import AddInvoice from "./components/AddInvoice";
import EditInvoice from "./components/EditInvoice";
import ListCompanies from "./components/ListCompanies";
import AddCompany from "./components/AddCompany";
import EditCompany from "./components/EditCompany";

function Routes(){
    return(
        <Switch>
            <Route path="/invoices" component={ListInvoices} />
            <Route path="/invoices/add" component={AddInvoice} />
            <Route path="/invoices/edit/:invoiceId" component={EditInvoice} />
            <Route path="/companies" component={ListCompanies} />
            <Route path="/add-company" component={AddCompany} />
            <Route path="/edit-company/:companyId" component={EditCompany} />
            <Route path="/map" component={MapPage} />
        </Switch>
    )
}

export default Routes;