import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { useLocation } from 'wouter';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token } = useContext(UserContext);
    const [location, setLocation] = useLocation();
    const [error, setError] = useState(null);
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${SERVER_URL}/users`, { username, email, password }, {
                headers: { 'x-auth-token': token },
            });
            console.log('User created:', response.data);
            setLocation('/users');
        } catch (err) {
            console.error('Error creating user:', err);
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: theme.palette.primary.main }}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>Add User</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add User</Button>
            </Box>
        </Box>
    );
};

export default AddUser;
