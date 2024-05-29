import { FormControl, Paper, TextField, MenuItem, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { EQUIPMENT_TYPES } from "../../constants/equipment";

function EditService({ equipment: services, setServices = (se) => {}, onConfirmed = (services) => {}, open = true, onClose }) {

    useEffect(() => {
        setServices(services ? services : { title: '', note: '', hours: 0, cost: 0.0});
        console.log(services.title)
    }, [services]);
    return (
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ p: 2}}>
                <FormControl fullWidth sx={{ gap: 2 }}>
                    <TextField
                        required
                        value={services.title}
                        label='Title'
                        onChange={(e) => setServices({ ...services, title: e.target.value })}
                    />
                    <TextField
                        value={services.note}
                        label='Note'
                        onChange={(e) => setServices({ ...services, note: e.target.value })}
                    />
                    <TextField
                        value={services.hours}
                        type="number"
                        label='Hours'
                        onChange={(e) => setServices({ ...services, hours: parseInt(e.target.value, 10) })}
                    />
                    <TextField
                      value={services.cost}
                      type="number"
                      label='Cost'
                      onChange={(e) => setServices({ ...services, nextServiceHours: parseFloat(e.target.value, 10)})}
                    />
                    <Button variant="contained" color="primary" onClick={() => { onConfirmed(services); onClose(); }}>Confirm</Button>
                </FormControl>
            </Paper>
        </Dialog>
    );
}

export default EditService;