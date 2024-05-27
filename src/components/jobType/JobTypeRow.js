import { Box, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function JobTypeRow({jobType, onDelete = () => {}, onEdit = () => {}}) {
  const {id, name, quantityType, price} = jobType

  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography>{quantityType}</Typography>
      <Typography>{price}</Typography>
      <IconButton onClick={onEdit}><EditIcon /></IconButton>
      <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
    </Box>
  )
}

export default JobTypeRow