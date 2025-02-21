import {Route, Switch, useLocation} from "wouter";
import MapPage from "./pages/MapPage";
import ListUsers from "./components/users/ListUsers";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
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
import HomePage from "./pages/HomePage";
import { useTransition, a } from "react-spring";
import ErrorPage from "./pages/ErrorPage";

function Routes() {
  const [location] = useLocation();
  useEffect(() => {
    const setTitle = () => {
      switch (location) {
        case "/map":
          document.title = "Zemljevid";
          break;
        case "/equipment":
          document.title = "Stroji";
          break;
        case "/":
          document.title = "Statistika";
          break;
        default:
          if (location.startsWith("/job"))
            document.title = "Služba";
          if (location.startsWith("/service"))
            document.title = "Servis";
          else if (location.startsWith("/invoices"))
            document.title = "Račun";
          else if (location.startsWith("/compan"))
            document.title = "Podjetje";
          else if (location.startsWith("/user"))
            document.title = "Uporbanik";
          else
            document.title = "Agro Majster";
      }
    };
    setTitle();
    return () => {
      setTitle();
    };
  }, [location]);

  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    //leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  })

  return transitions((props, item, key) => 
    <a.div key={key} style={{...props, display: 'flex', flex: 1}}>
      <Switch location={item}>
        <Route path="/" component={HomePage}/>
        <Route path="/invoices" component={ListInvoices}/>
        <Route path="/invoices/add" component={AddInvoice}/>
        <Route path="/invoices/edit/:invoiceId" component={EditInvoice}/>
        <Route path="/invoices/:invoiceId" component={DetailedInvocieView}/>
        <Route path="/companies" component={ListCompanies}/>
        <Route path="/company-add" component={AddCompany}/>
        <Route path="/company-edit/:companyId" component={EditCompany}/>
        <Route path="/map" component={MapPage}/>
        <Route path="/users" component={ListUsers}/>
        <Route path="/users/add" component={AddUser}/>
        <Route path="/users/edit/:userId" component={EditUser}/>
        <Route path="/jobTypes" component={JobTypesPage}/>
        <Route path="/equipment" component={EquipmentPage}/>
        <Route path="/service/:equipment_id" component={ServicePage}/>
        <Route component={ErrorPage} />
      </Switch>
    </a.div>
  )
}

export default Routes;