@ -1,26 +1,47 @@
import { FormControl, Paper, Select, TextField, MenuItem } from "@mui/material";
import { FormControl, Paper, TextField, MenuItem, Dialog, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { QUANTITY_TYPES } from "../../constants/jobs";

function EditJobType({jobType = null, onConfirmed = (jobType) => {}}) {
  const [jt, setJt] = useState({ name: '', quantityType: '', price: 0.0 })
  function EditJobType({ jobType = null, onConfirmed = (jobType) => {}, open, onClose }) {
    const [jt, setJt] = useState({ name: '', quantityType: '', price: 0.0 });

    useEffect(() => {
      setJt(jobType ? jobType : { name: '', quantityType: '', price: 0.0 })
    }, [jobType])
    setJt(jobType ? jobType : { name: '', quantityType: '', price: 0.0 });
  }, [jobType]);

  return (
      <Paper>
        <FormControl fullWidth style={{ gap: 10 }}>
          <TextField required value={jt.name} label='Naziv' onChange={(e) => {setJt({...jt, name: e.target.value})}} />
          <Select required value={jt.quantityType} onChange={e => {setJt({...jt, quantityType: e.target.value})}} label='Vrsta količine' >
            { QUANTITY_TYPES.map((qt) => <MenuItem value={qt}>{qt}</MenuItem>)}
          </Select>
          <TextField required value={jt.price} type="number" label='Cena na enoto' onChange={(e) => {setJt({...jt, price: e.target.value})}} />
          <TextField onClick={() => {onConfirmed(jt)}} type="submit" value="Potrdi" />
        </FormControl>
      </Paper>
    )
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

export default EditJobType
export default EditJobType;