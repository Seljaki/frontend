import React, {useContext, useEffect, useState} from "react";
import {SERVER_URL} from "../constants/http";
import {UserContext} from "../store/userContext";
import myTheme from "../theme";
import {useParams} from "wouter";
import {Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import EditService from "../components/service/EditService";
import ServiceRow from "../components/service/ServiceRow";


function ServicePage() {
  const params = useParams();
  const equipmentId = params.equipment_id
  const [equipment, setEquipment] = useState([]);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    async function getEquipmentById() {
      const data = await fetch(SERVER_URL + `/equipment/${equipmentId}`, {
        headers: {
          "x-auth-token": userCtx.token
        }
      });
      if (data.status < 300) {
        const json = await data.json();
        setEquipment(json.equipment);
      }
    }
    async function getServices() {
      const data = await fetch(SERVER_URL + `/services?equipment_id=${equipmentId}`, {
        headers: {
          "x-auth-token": userCtx.token
        }
      });
      if (data.status < 300) {
        const json = await data.json();
        setServices(json.services);
      }
    }
    getServices()
    getEquipmentById();
  }, []);

  async function onSubmit(se) {
    console.log("saved new one dasdad: "+se);
    const data = await fetch(SERVER_URL + '/services', {
      method: 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(se)
    });
    if (data.status < 300) {
      const json = await data.json();
      setServices([json.service, ...services]);
      handleCloseDialog();
    }
  }

  async function onEdit(se) {
    console.log("edited: ",se);
    console.log(se.id)
    const data = await fetch(SERVER_URL + `/services/${se.id}`, {
      method: 'PUT',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(se)
    });
    if (data.status < 300) {
      const json = await data.json();
      const se = json.service;
      setServices(services.map(services => services.id === se.id ? se : services));
      handleCloseDialog();
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
    setEditingService({ title: '', note: '', hours: 0, cost: 0.0, equipment_id: equipmentId});
  };
  const handleEditService = (service) => {
    setEditingService(service);
  };
  const handleCloseDialog = () => {
    setEditingService(null);
  };

  return(
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: myTheme.palette.primary.main, flex: 1 }}>
      <Typography variant="h4" sx={{ mb: 2, color: myTheme.palette.primary.main }}>Pretekli servisi za {equipment.name}</Typography>
  <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddService}>Dodaj servis</Button>
      { editingService && <EditService
        service={editingService}
        setService={setEditingService}
        equipment_id={equipmentId}
        onConfirmed={(s) => {
          if(s.id)
            onEdit(s)
          else
            onSubmit(s);
        }}
        onClose={handleCloseDialog}
      />}

      <TableContainer component={Paper} sx={{ maxWidth: '60%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Naziv</TableCell>
              <TableCell>Ure</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>Možnosti</TableCell>
            </TableRow>
          </TableHead>
          {services && services.map(se => (
            <ServiceRow
              onDelete={async () => {
                if (await deleteService(se.id)) {
                  setServices(services.filter(e => e.id !== se.id));
                }
              }}
              onEdit={() => handleEditService(se)}
              key={se.id}
              service={se}
            />
          ))}
        </Table>
      </TableContainer>
    </Box>
)
} export default ServicePage;