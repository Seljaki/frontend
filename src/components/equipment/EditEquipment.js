import { FormControl, Paper, TextField, MenuItem, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { EQUIPMENT_TYPES } from "../../constants/equipment";

function EditEquipment({ equipment, setEquipment = (eq) => {}, onConfirmed = (equipment) => {}, open = true, onClose }) {

    useEffect(() => {
        setEquipment(equipment ? equipment : { name: '', nextService: '', nextServiceHours: 0, hours: 0, equipmentType:''});
        console.log(equipment.name)
    }, [equipment]);
    return (
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ p: 2}}>
                <FormControl fullWidth sx={{ gap: 2 }}>
                    <TextField
                        required
                        value={equipment.name}
                        label='Title'
                        onChange={(e) => setEquipment({ ...equipment, name: e.target.value })}
                    />
                    <TextField
                        value={equipment.nextService}
                        type="date"
                        label='Next service'
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setEquipment({ ...equipment, nextService: e.target.value })}
                    />
                    <TextField
                        value={equipment.nextServiceHours}
                        type="number"
                        label='Next service hours'
                        onChange={(e) => setEquipment({ ...equipment, nextServiceHours: parseInt(e.target.value, 10)})}
                    />
                    <TextField
                        value={equipment.hours}
                        type="number"
                        label='Hours'
                        onChange={(e) => setEquipment({ ...equipment, hours: parseInt(e.target.value, 10) })}
                    />
                    <TextField
                        select
                        required
                        label='Equipment type'
                        value={equipment.equipmentType}
                        SelectProps={{ MenuProps: { style: { maxHeight: 300, }, }, }}
                        onChange={e => setEquipment({ ...equipment, equipmentType: e.target.value })}
                    >
                        {EQUIPMENT_TYPES.map((et, index) => (
                            <MenuItem key={index} value={et}>{et}</MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={() => { onConfirmed(equipment); onClose(); }}>Confirm</Button>
                </FormControl>
            </Paper>
        </Dialog>
    );
}

export default EditEquipment;