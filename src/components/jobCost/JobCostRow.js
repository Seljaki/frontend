import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function JobCostRow({jobCost, onEdit = () => {}, onDelete = () => {}}) {
  const { id, title, amount } = jobCost
  return (
    <div>
      {title} - {amount} EUR
      <IconButton onClick={onEdit} color="primary"><EditIcon/></IconButton>
      <IconButton onClick={onDelete} color="secondary"><DeleteIcon/></IconButton>
    </div>
  )
}

export default JobCostRow