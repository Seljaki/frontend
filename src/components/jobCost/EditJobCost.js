import { TextField } from "@mui/material"

function EditJobCost({jobCost, setJobCost = () => {}, onConfirm = () => {}, onClose = () => {}}) {
  return (
    <div>
      <TextField required label="Title" value={jobCost.title} onChange={e => {setJobCost({...jobCost, title: e.target.value})}} />
      <TextField required label="Amount" inputProps={{ min: 0 }} type="number" value={jobCost.amount} onChange={e => {setJobCost({...jobCost, amount: e.target.value})}} />
      <TextField type="button" onClick={onConfirm} value="Confirm" />
    </div>
  )
}

export default EditJobCost