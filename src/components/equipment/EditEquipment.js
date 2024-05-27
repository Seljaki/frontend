import { FormControl, Paper, TextField, MenuItem, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { EQUIPMENT_TYPES } from "../../constants/equipment";

function EditEquipment({ equipment = null, onConfirmed = (equipment) => {}, open, onClose }) {
    const [eq, setEq] = useState({ name: '', nextService: '', nextServiceHours: 0, hours: 0, equipmentType:''});

    useEffect(() => {
        setEq(equipment ? equipment : { name: '', nextService: '', nextServiceHours: 0, hours: 0, equipmentType:''});
    }, [equipment]);

    return (
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ p: 2}}>
                <FormControl fullWidth sx={{ gap: 2 }}>
                    <TextField
                        required
                        value={eq.name}
                        label='Title'
                        onChange={(e) => setEq({ ...eq, name: e.target.value })}
                    />
                    <TextField
                        required
                        value={eq.nextService}
                        type="datetime-local"
                        label='Next service'
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setEq({ ...eq, nextService: e.target.value })}
                    />
                    <TextField
                        required
                        value={eq.nextServiceHours}
                        type="number"
                        label='Next service hours'
                        onChange={(e) => setEq({ ...eq, nextServiceHours: parseInt(e.target.value, 10)})}
                    />
                    <TextField
                        required
                        value={eq.hours}
                        type="number"
                        label='Hours'
                        onChange={(e) => setEq({ ...eq, hours: parseInt(e.target.value, 10) })}
                    />
                    <TextField
                        select
                        required
                        label='Equipment type'
                        value={eq.equipmentType}
                        onChange={e => setEq({ ...eq, equipmentType: e.target.value })}
                    >
                        {EQUIPMENT_TYPES.map((et, index) => (
                            <MenuItem key={index} value={et}>{et}</MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={() => { onConfirmed(eq); onClose(); }}>Confirm</Button>
                </FormControl>
            </Paper>
        </Dialog>
    );
}

export default EditEquipment;