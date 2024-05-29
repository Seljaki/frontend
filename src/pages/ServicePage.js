import {useContext, useEffect, useState} from "react";
import {SERVER_URL} from "../constants/http";
import {UserContext} from "../store/userContext";
import myTheme from "../theme";
import {useParams} from "wouter";
import {Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import EditService from "../components/service/EditService";


function ServicePage() {
  const params = useParams();
  const [equipment, setEquipment] = useState([]);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    async function getEquipmentById() {
      const data = await fetch(SERVER_URL + `/equipment/${params.equipment_id}`, {
        headers: {
          "x-auth-token": userCtx.token
        }
      });
      if (data.status < 300) {
        const json = await data.json();
        setEquipment(json.equipment);
      }
    }
    getEquipmentById();
  }, []);

  async function onSubmit(se) {
    console.log("saved new one: "+se);
    const data = await fetch(SERVER_URL + '/services', {
      method: se.id ? 'PUT' : 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(se)
    });
    if (data.status < 300) {
      const json = await data.json();
      setServices([json.service, ...services]);
    }
  }

  async function onEdit(se) {
    console.log("edited: "+se);
    const data = await fetch(SERVER_URL + `/services/${se.id}`, {
      method: se.id ? 'PUT' : 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(se)
    });
    if (data.status < 300) {
      const json = await data.json();
      const se = json.equipment;
      setServices(services.map(services => services.id === se.id ? se : services));
    }
  }

  async function deleteService(id) {
    const data = await fetch(`${SERVER_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token
      }
    });
    return data.status < 300;
  }

  const handleAddService = () => {
    setEditingService({ });
  };
  const handleEditService = (service) => {
    setEditingService(service);
  };
  const handleCloseDialog = () => {
    setEditingService(null);
  };

  return(
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: myTheme.palette.primary.main, flex: 1 }}>
      <Typography variant="h4" sx={{ mb: 2, color: myTheme.palette.primary.main }}>Past services of {equipment.name}</Typography>
  <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddService}>Add new</Button>
      { editingService && <EditService
        setService={setEditingService}
        onConfirmed={(s) => {
          console.log(s)
          if (!s.id) onSubmit(s);
          else onEdit(s);
          handleCloseDialog();
        }}
        onClose={handleCloseDialog}
      />}

      <TableContainer component={Paper} sx={{ maxWidth: '60%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          {/*services && services.map(se => (
            <ServiceRow
              onDelete={async () => {
                if (await deleteService(se.id)) {
                  setEquipment(equipment.filter(e => e.id !== se.id));
                }
              }}
              onEdit={() => handleEditService(se)}
              key={se.id}
              service={se}
            />
          ))*/}
        </Table>
      </TableContainer>
    </Box>
)
} export default ServicePage;