import { FormControl, Paper, TextField, MenuItem, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { EQUIPMENT_TYPES } from "../../constants/equipment";

function EditService({ service= null, setServices = (se) => {}, onConfirmed = (service) => {}, open = true, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={{ p: 2}}>
        <FormControl fullWidth sx={{ gap: 2 }}>
          <TextField
            required
            value={service.title}
            label='Title'
            onChange={(e) => setServices({ ...service, title: e.target.value })}
          />
          <TextField
            value={service.note}
            label='Note'
            onChange={(e) => setServices({ ...service, note: e.target.value })}
          />
          <TextField
            value={service.hours}
            type="number"
            label='Hours'
            onChange={(e) => setServices({ ...service, hours: parseInt(e.target.value, 10) })}
          />
          <TextField
            value={service.cost}
            type="number"
            label='Cost'
            onChange={(e) => setServices({ ...service, nextServiceHours: parseFloat(e.target.value, 10)})}
          />
          <Button variant="contained" color="primary" onClick={() => { onConfirmed(service); onClose(); }}>Confirm</Button>
        </FormControl>
      </Paper>
    </Dialog>
  );
}

export default EditService;