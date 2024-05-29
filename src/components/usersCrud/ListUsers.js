import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { Link } from 'wouter';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useTheme } from '@mui/material';

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
        <div>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>Users</Typography>
            <Link to="/users/add">
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>Add User</Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Link to={`/users/edit/${user.id}`}>
                                        <Button variant="outlined" color="primary">Edit</Button>
                                    </Link>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListUsers;
