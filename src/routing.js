import {Route, Switch, useLocation} from "wouter";
import MapPage from "./pages/MapPage";
import ListInvoices from "./components/invoice/ListInvoice";
import AddInvoice from "./components/invoice/AddInvoice";
import EditInvoice from "./components/invoice/EditInvoice";
import ListCompanies from "./components/company/ListCompanies";
import AddCompany from "./components/company/AddCompany";
import EditCompany from "./components/company/EditCompany";
import JobTypesPage from "./pages/JobTypesPage";
import DetailedInvocieView from "./pages/DetailedInvocieView";
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
            <Route path="/invoices" component={ListInvoices} />
            <Route path="/invoices/:invoiceId" component={DetailedInvocieView} />
            <Route path="/invoices/add" component={AddInvoice} />
            <Route path="/invoices/edit/:invoiceId" component={EditInvoice} />
            <Route path="/companies" component={ListCompanies} />
            <Route path="/add-company" component={AddCompany} />
            <Route path="/edit-company/:companyId" component={EditCompany} />
            <Route path="/map" component={MapPage} />
            <Route path="/jobTypes" component={JobTypesPage} />
            <Route path="/equipment" component={EquipmentPage} />
            <Route path="/service/:equipment_id" component={ServicePage} />
        </Switch>
    )
}

export default Routes;