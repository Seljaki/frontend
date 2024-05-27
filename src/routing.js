import { Route, Switch } from "wouter";
import MapPage from "./pages/MapPage";
import ListInvoices from "./components/invoice/ListInvoice";
import AddInvoice from "./components/invoice/AddInvoice";
import EditInvoice from "./components/invoice/EditInvoice";
import ListCompanies from "./components/company/ListCompanies";
import AddCompany from "./components/company/AddCompany";
import EditCompany from "./components/company/EditCompany";
import JobTypesPage from "./pages/JobTypesPage";

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
            <Route path="/jobTypes" component={JobTypesPage} />
        </Switch>
    )
}

export default Routes;