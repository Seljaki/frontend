    import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
    import { useContext, useEffect, useState } from "react";
    import EquipmentRow from "../components/equipment/EquipmentRow";
    import { SERVER_URL } from "../constants/http";
    import { UserContext } from "../store/userContext";
    import EditEquipment from "../components/equipment/EditEquipment";
    import myTheme from "../theme";

    function EquipmentPage() {
        const [equipment, setEquipment] = useState([]);
        const [editingEquipment, setEditingEquipment] = useState(null);
        const userCtx = useContext(UserContext);

        useEffect(() => {
            async function getAllEquipment() {
                const data = await fetch(SERVER_URL + '/equipment', {
                    headers: {
                        "x-auth-token": userCtx.token
                    }
                });
                if (data.status < 300) {
                    const json = await data.json();
                    setEquipment(json.equipment);
                    console.log("eq: ", equipment);
                }
            }
            getAllEquipment();
        }, []);

        async function onSubmit(eq) {
            console.log("saved new one: "+eq);
            const data = await fetch(SERVER_URL + '/equipment', {
                method: eq.id ? 'PUT' : 'POST',
                headers: {
                    "x-auth-token": userCtx.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eq)
            });
            if (data.status < 300) {
                const json = await data.json();
                setEquipment([json.equipment, ...equipment]);
                handleCloseDialog();
            }
        }

        async function onEdit(eq) {
            console.log("edited: "+eq);
            const data = await fetch(SERVER_URL + `/equipment/${eq.id}`, {
                method: eq.id ? 'PUT' : 'POST',
                headers: {
                    "x-auth-token": userCtx.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eq)
            });
            if (data.status < 300) {
                const json = await data.json();
                const eq = json.equipment;
                setEquipment(equipment.map(equipment => equipment.id === eq.id ? eq : equipment));
                handleCloseDialog();
            }
        }

        async function deleteEquipment(id) {
            const data = await fetch(`${SERVER_URL}/equipment/${id}`, {
                method: 'DELETE',
                headers: {
                    "x-auth-token": userCtx.token
                }
            });
            return data.status < 300;
        }

        const handleAddEquipment = () => {
            setEditingEquipment({ name: '', nextService: '', nextServiceHours: 0, hours: 0, equipmentType:''});
        };

        const handleEditEquipment = (equipment) => {
            setEditingEquipment({...equipment, nextService: new Date(equipment.nextService)});
        };

        const handleCloseDialog = () => {
            setEditingEquipment(null);
        };

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  ml: 5, mr: 5, mt: 4, color: myTheme.palette.primary.main, flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 2, color: myTheme.palette.primary.main }}>Orodje</Typography>
                <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddEquipment}>Dodaj Orodje</Button>
                { editingEquipment && <EditEquipment
                  equipment={editingEquipment}
                    setEquipment={setEditingEquipment}
                    onConfirmed={(e) => {
                        if (e.id)
                            onEdit(e)
                        else
                            onSubmit(e);
                    }}
                    onClose={handleCloseDialog}
                />}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Naziv</TableCell>
                                <TableCell>Datum do servisa</TableCell>
                                <TableCell>Ure do servisa</TableCell>
                                <TableCell>Ure</TableCell>
                                <TableCell>Vrsta orodja</TableCell>
                                <TableCell>Možnosti</TableCell>

                            </TableRow>
                        </TableHead>
                        {equipment && equipment.map(eq => (
                            <EquipmentRow
                                onDelete={async () => {
                                    if (await deleteEquipment(eq.id)) {
                                        setEquipment(equipment.filter(e => e.id !== eq.id));
                                    }
                                }}
                                onEdit={() => handleEditEquipment(eq)}
                                key={eq.id}
                                equipment={eq}
                            />
                        ))}
                    </Table>
                </TableContainer>
            </Box>
        );
}
export default EquipmentPage;