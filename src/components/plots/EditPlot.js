import { Checkbox, Dialog, FormControlLabel, Paper, TextField } from "@mui/material";

function EditPlot({plot, setPlot = (plot) => {}, onConfirm = () => {}, onCancel = () => {}}) {
  return (
    <Dialog open={true} onClose={onCancel}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, gap: 2}}>
        <TextField required label="Name" value={plot.title} onChange={(e) => {setPlot({...plot, title: e.target.value})}} />
        <TextField required label="Note" value={plot.note} onChange={(e) => {setPlot({...plot, note: e.target.value})}} />
        <FormControlLabel control={<Checkbox value={plot.archived} onChange={(e) => {setPlot({...plot, note: e.target.value})}} />} label="Archived" />
        <div>
          <TextField fullWidth type="button" value="Confirm" onClick={onConfirm} />
          <TextField fullWidth type="button" value="Cancel" onClick={onCancel} />
        </div>
      </Paper>
    </Dialog>
  )
}

export default EditPlot