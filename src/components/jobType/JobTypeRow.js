import {
    IconButton,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function JobTypeRow({jobType, onDelete = () => {}, onEdit = () => {}}) {
    const {id, name, quantityType, price} = jobType
    return (
        <TableBody>
            <TableRow>
                <TableCell>{name}</TableCell>
                <TableCell>{quantityType}</TableCell>
                <TableCell>{price} €</TableCell>
                <TableCell>
                    <IconButton onClick={onEdit} color="primary"><EditIcon/></IconButton>
                    <IconButton onClick={onDelete} color="secondary"><DeleteIcon/></IconButton>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}
export default JobTypeRow