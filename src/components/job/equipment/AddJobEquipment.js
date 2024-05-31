import {Autocomplete, Box, TextField} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../store/userContext"
import { SERVER_URL } from "../../../constants/http"

function AddJobEquipment({ jobId, onEquipmentAdded = (equipment) => {}, onClose = () => {} }) {
  const [equipment, setEquipment] = useState([])
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const userCtx = useContext(UserContext)

  useEffect(() => {
    async function fetchAllEquipment() {
      const data = await fetch(SERVER_URL + `/equipment`, {
        headers: {
          "x-auth-token": userCtx.token,
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        setEquipment(json.equipment)
      }
    }
    fetchAllEquipment()
  }, [])

  async function postJobEquipment() {
    const data = await fetch(SERVER_URL + `/jobs/${jobId}/equipment/${selectedEquipment.id}`, {
      method: 'POST',
      headers: {
        "x-auth-token": userCtx.token,
      },
    });
    if (data.status < 300) {
      onEquipmentAdded(selectedEquipment)
      setSelectedEquipment(null)
    }
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <Autocomplete
        disablePortal
        value={selectedEquipment}
        onChange={(e, value) => {setSelectedEquipment(value)}}
        options={equipment}
        sx={{ width: 300, mr:1}}
        getOptionLabel={eq => `${eq.name} - ${eq.equipmentType}`}
        renderInput={(params) => <TextField {...params} label="Oprema" />}
      />
      <TextField sx={{mr:1}} disabled={!selectedEquipment} type="button" value="Potrdi" onClick={postJobEquipment} />
      <TextField type="button" value="Prekliči" onClick={onClose}/>
    </Box>
  )
}

export default AddJobEquipment