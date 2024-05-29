import {
    IconButton,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material"
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from "dayjs";
import {Link} from "wouter";
import React from "react";
// react branding: ikona, naslov, sidemenu, user na podne
function ServiceRow({service, onDelete = () => {}, onEdit = () => {}}) {
    const {id, title, note, hours, cost} = service
    return (
        <TableBody>
            <TableRow>
                <TableCell>{title}</TableCell>
                <TableCell>{note}</TableCell>
                <TableCell>{hours}</TableCell>
                <TableCell>{cost}</TableCell>
                <TableCell>
                    <IconButton onClick={onEdit} color="primary"><EditIcon/></IconButton>
                    <IconButton onClick={onDelete} color="secondary"><DeleteIcon/></IconButton>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default ServiceRow