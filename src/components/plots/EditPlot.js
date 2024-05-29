import { Modal, Paper, TextField } from "@mui/material";

function EditPlot({plot, setPlot = (plot) => {}}) {
  return (
    <Modal open={true}>
      <Paper>
        <TextField required label="Name" value={plot.title} onChange={(e) => {setPlot({...plot, title: e.target.value})}} />
        <TextField required label="Note" value={plot.title} onChange={(e) => {setPlot({...plot, note: e.target.value})}} />
      </Paper>
    </Modal>
  )
}