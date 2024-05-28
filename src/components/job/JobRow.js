import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getUnitForQuantityType } from "../../constants/jobs";

function JobRow({job, onEdit = () => {}, onDelete = () => {}}) {
  const { id, quantity, price, totalPrice, timeTaken, invoice_id, jobtype_id, jobType } = job
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <span style={{ display: "flex", alignItems: 'center', flex: 1, gap: 25}}>
          <span>{jobType.name}</span>
          <span>količina: {quantity}</span>
          <span>cena na {getUnitForQuantityType(jobType.quantityType)}: {price} EUR</span>
          <span>končna cena: {totalPrice} EUR</span>
        </span>
        <span>
          <IconButton onClick={onEdit} color="primary"><EditIcon/></IconButton>
          <IconButton onClick={onDelete} color="secondary"><DeleteIcon/></IconButton>
        </span>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Zavzet čas: {timeTaken} min</Typography>
        <Typography>TODO: PLOTS</Typography>
        <Typography>TODO: EQUIPMENT</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default JobRow