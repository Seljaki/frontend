import { FormControl, Paper, TextField, MenuItem, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { EQUIPMENT_TYPES } from "../../constants/equipment";
import dayjs from "dayjs";

function EditEquipment({ equipment, setEquipment = (eq) => {}, onConfirmed = (equipment) => {}, open = true, onClose }) {
  const [localEquipment, setLocalEquipment] = useState(equipment || { name: '', nextService: '', nextServiceHours: 0, hours: 0, equipmentType:''});
  console.log(localEquipment.nextService)
  useEffect(() => {
    setEquipment(equipment ? equipment : { name: '', nextService: '', nextServiceHours: 0, hours: 0, equipmentType:''});
  }, [equipment]);

  const handleChange = (key, value) => {
    setLocalEquipment({ ...localEquipment, [key]: value });
    setEquipment({ ...localEquipment, [key]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={{ p: 2}}>
        <FormControl fullWidth sx={{ gap: 2 }}>
          <TextField
            required
            value={localEquipment.name}
            label='Naziv'
            onChange={(e) => handleChange( 'name', e.target.value )}
          />
          <TextField
            value={dayjs(localEquipment.nextService).format('YYYY-MM-DD')}
            type="date"
            label='Naslednji servis'
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange( 'nextService', e.target.value )}
          />
          <TextField
            value={localEquipment.nextServiceHours}
            type="number"
            label='Ure naslednjega servisa'
            onChange={(e) =>  handleChange('nextServiceHours', parseInt(e.target.value, 10))}
          />
          <TextField
            value={localEquipment.hours}
            type="number"
            label='Ure'
            onChange={(e) =>  handleChange('hours', parseInt(e.target.value, 10))}
          />
          <TextField
            select
            required
            label='Vrsta Orodja'
            value={localEquipment.equipmentType}
            SelectProps={{ MenuProps: { style: { maxHeight: 300, }, }, }}
            onChange={e => handleChange( 'equipmentType', e.target.value )}
          >
            {EQUIPMENT_TYPES.map((et, index) => (
              <MenuItem key={index} value={et}>{et}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={() => { onConfirmed(localEquipment); onClose(); }}>Potrdi</Button>
        </FormControl>
      </Paper>
    </Dialog>
  );
}

export default EditEquipment;