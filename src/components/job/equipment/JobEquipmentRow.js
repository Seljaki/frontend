import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../store/userContext';
import { SERVER_URL } from '../../../constants/http';

function JobEquipmentRow({ jobId, equipment, onDelete = () => {} }) {
  const { id, name, equipmentType } = equipment
  const userCtx = useContext(UserContext)

  async function onDeletePressed() {
    const data = await fetch(SERVER_URL + `/jobs/${jobId}/equipment/${id}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token,
      },
    });
    if (data.status < 300) {
      onDelete()
    }
  }
  return (
    <div>
      {name} - {equipmentType}
      <IconButton onClick={onDeletePressed} color="secondary"><DeleteIcon/></IconButton>
    </div>
  )
}

export default JobEquipmentRow