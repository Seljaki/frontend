import { FormControl, Paper, TextField, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";

function EditService({ service = null, setServices = (service) => {}, onConfirmed = (service) => {}, open = true, onClose, equipment_id}) {
  const [localService, setLocalService] = useState(service || { title: '', note: '', hours: 0, cost: 0, equipment_id: equipment_id});

  useEffect(() => {
    setLocalService(service || { title: '', note: '', hours: 0, cost: 0, equipment_id: equipment_id });
  }, [service]);

  const handleChange = (key, value) => {
    setLocalService({ ...localService, [key]: value });
    setServices({ ...localService, [key]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={{ p: 2 }}>
        <FormControl fullWidth sx={{ gap: 2 }}>
          <TextField
            required
            value={localService.title}
            label='Title'
            onChange={(e) => handleChange('title', e.target.value)}
          />
          <TextField
            value={localService.note}
            label='Note'
            onChange={(e) => handleChange('note', e.target.value)}
          />
          <TextField
            value={localService.hours}
            type="number"
            label='Hours'
            onChange={(e) => handleChange('hours', parseInt(e.target.value, 10))}
          />
          <TextField
            value={localService.cost}
            type="number"
            label='Cost'
            onChange={(e) => handleChange('cost', parseFloat(e.target.value))}
          />
          <Button variant="contained" color="primary" onClick={() => { onConfirmed(localService); onClose(); }}>
            Confirm
          </Button>
        </FormControl>
      </Paper>
    </Dialog>
  );
}

export default EditService;
