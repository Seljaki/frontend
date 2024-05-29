import { Dialog, Paper, Typography } from "@mui/material";
import myTheme from "../../theme";
import React from "react";

function ShowNote({ note, open = true, onClose }) {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <Paper sx={{ p: 2, overflow: 'auto', wordWrap: 'break-word' }}>
        <Typography variant="h5" sx={{ mb: 2, color: myTheme.palette.primary.main }}>Note</Typography>
        <Typography>{note}</Typography>
      </Paper>
    </Dialog>
  );
}

export default ShowNote;
