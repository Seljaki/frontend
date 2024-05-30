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
        <Paper sx={{ p: 2}}>
          <FormControl fullWidth sx={{ gap: 2 }}>
            <TextField
                required
                value={jt.name}
                label='Title'
                onChange={(e) => setJt({ ...jt, name: e.target.value })}
            />
            <TextField
                select
                required
                label='Quantity type'
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
                label='Price per unit'
                onChange={(e) => setJt({ ...jt, price: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={() => { onConfirmed(jt); onClose(); }}>Confirm</Button>
          </FormControl>
        </Paper>
      </Dialog>
  );
}

export default EditJobType;
