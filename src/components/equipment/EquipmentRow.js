import {
    IconButton,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from "dayjs";

function EquipmentRow({equipment, onDelete = () => {}, onEdit = () => {}}) {
    const {id, name, nextService, nextServiceHours, hours, equipmentType} = equipment

    return (
        <TableBody>
            <TableRow>
                <TableCell>{name}</TableCell>
                <TableCell>{dayjs(new Date(nextService.toString())).format('ddd MMM YYYY')}</TableCell>
                <TableCell>{nextServiceHours}</TableCell>
                <TableCell>{hours}</TableCell>
                <TableCell>{equipmentType}</TableCell>
                <TableCell>
                    <IconButton onClick={onEdit} color="primary"><EditIcon/></IconButton>
                    <IconButton onClick={onDelete} color="secondary"><DeleteIcon/></IconButton>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}
export default EquipmentRow