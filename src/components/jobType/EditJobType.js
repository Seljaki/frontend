import { FormControl, Paper, TextField, MenuItem, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { QUANTITY_TYPES } from "../../constants/jobs";

function EditJobType({ jobType = null, onConfirmed = (jobType) => {}, open, onClose }) {
  const [jt, setJt] = useState({ name: '', quantityType: '', price: 0.0 });

  useEffect(() => {
    setJt(jobType ? jobType : { name: '', quantityType: '', price: 0.0 });
  }, [jobType]);

  return (
      <Dialog open={open} onClose={onClose}>
        <Paper component="form" onSubmit={(e) => {e.preventDefault();onConfirmed(jt); }} sx={{ p: 2, gap: 2, display: 'flex', flexDirection: 'column'}}>
            <TextField
                required
                value={jt.name}
                label='Naziv'
                onChange={(e) => setJt({ ...jt, name: e.target.value })}
            />
            <TextField
                select
                required
                label='Vrsta količine'
                value={jt.quantityType}
                onChange={e => setJt({ ...jt, quantityType: e.target.value })}
            >
              {QUANTITY_TYPES.map((qt, index) => (
                  <MenuItem key={index} value={qt}>{qt}</MenuItem>
              ))}
            </TextField>
            <TextField
                required
                value={jt.price}
                type="number"
                label='Cena na enoto'
                onChange={(e) => setJt({ ...jt, price: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={() => { onConfirmed(jt); }}>Potrdi</Button>
        </Paper>
      </Dialog>
  );
}

export default EditJobType;
