import React, { useState } from "react";
import {
    IconButton,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShowNote from "./ShowNote";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

function ServiceRow({ service, onDelete = () => {}, onEdit = () => {} }) {
    const { id, title, note, hours, cost, equipment_id } = service;
    const [isNoteOpen, setIsNoteOpen] = useState(false);

    const handleNoteOpen = () => {
        setIsNoteOpen(true);
    };

    const handleNoteClose = () => {
        setIsNoteOpen(false);
    };

    return (
      <>
          <TableBody>
              <TableRow>
                  <TableCell>{title}</TableCell>
                  <TableCell>{hours}</TableCell>
                  <TableCell>{cost}</TableCell>
                  <TableCell>
                      <IconButton onClick={handleNoteOpen} color="primary">
                          <StickyNote2Icon/>
                      </IconButton>
                      <IconButton onClick={onEdit} color="primary">
                          <EditIcon />
                      </IconButton>
                      <IconButton onClick={onDelete} color="secondary">
                          <DeleteIcon />
                      </IconButton>
                  </TableCell>
              </TableRow>
          </TableBody>
          <ShowNote note={note} open={isNoteOpen} onClose={handleNoteClose} />
      </>
    );
}

export default ServiceRow;
