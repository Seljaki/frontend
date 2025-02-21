import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { Link } from 'wouter';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useTheme, Box } from '@mui/material';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const { token } = useContext(UserContext);
    const theme = useTheme();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/users`, {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setUsers(response.data.users);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${SERVER_URL}/users/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    return (
        <Box display="flex" flexDirection="column" flex={1} alignItems="center" sx={{ml: 5, mr: 5, mt: 4}}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>Uporabniki</Typography>
            <Link to="/users/add">
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>Dodaj uporabnika</Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Uporabniško ime</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Možnosti</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell sx={{ gap: 1, display: 'flex'}}>
                                    <Link to={`/users/edit/${user.id}`}>
                                        <Button variant="outlined" color="primary">uredi</Button>
                                    </Link>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(user.id)}>Briši</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListUsers;
