import { FormControl, Paper, Select, TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { QUANTITY_TYPES } from "../../constants/jobs";

function EditJobType({jobType = null, onConfirmed = (jobType) => {}}) {
  const [jt, setJt] = useState({ name: '', quantityType: '', price: 0.0 })

  useEffect(() => {
    setJt(jobType ? jobType : { name: '', quantityType: '', price: 0.0 })
  }, [jobType])

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
}

export default EditJobType