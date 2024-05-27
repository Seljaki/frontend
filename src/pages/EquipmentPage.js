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
        const [isDialogOpen, setIsDialogOpen] = useState(false);
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
            console.log(eq);
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
            }
        }

        async function onEdit(eq) {
            console.log(eq);
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
                setEquipment([eq, ...equipment.filter(e => e.id !== equipment.id)])
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
            setEditingEquipment(null);
            setIsDialogOpen(true);
        };

        const handleEditEquipment = (equipment) => {
            setEditingEquipment(equipment);
            setIsDialogOpen(true);
        };

        const handleCloseDialog = () => {
            setIsDialogOpen(false);
            setEditingEquipment(null);
        };

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: myTheme.palette.primary.main, flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 2, color: myTheme.palette.primary.main }}>Equipment</Typography>
                <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddEquipment}>Add new</Button>
                <EditEquipment
                    equipment={editingEquipment}
                    onConfirmed={(e) => {
                        if (!e.id) onSubmit(e);
                        else onEdit(e);
                        handleCloseDialog();
                    }}
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                />
                <TableContainer component={Paper} sx={{ maxWidth: '50%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Next service date</TableCell>
                                <TableCell>Next service hours</TableCell>
                                <TableCell>Hours</TableCell>
                                <TableCell>Equipment type</TableCell>
                                <TableCell>Actions</TableCell>

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