import { TextField } from "@mui/material"

function EditJobCost({jobCost, setJobCost = () => {}, onConfirm = () => {}, onClose = () => {}}) {
  return (
    <div>
      <TextField sx={{mr:1}} required label="Naziv" value={jobCost.title} onChange={e => {setJobCost({...jobCost, title: e.target.value})}} />
      <TextField sx={{mr:1}} required label="Količina" inputProps={{ min: 0 }} type="number" value={jobCost.amount} onChange={e => {setJobCost({...jobCost, amount: e.target.value})}} />
      <TextField sx={{mr:1}} type="button" onClick={onConfirm} value="Potrdi" />
      <TextField type="button" value="Prekliči" onClick={onClose}/>
    </div>
  )
}

export default EditJobCost