import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { useLocation, useRoute } from 'wouter';

const EditUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token } = useContext(UserContext);
    const [location, setLocation] = useLocation();
    const [match, params] = useRoute('/users/edit/:userId');
    const [error, setError] = useState(null);
    const theme = useTheme();
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(`Fetching user with ID: ${params.userId}`);
                const response = await axios.get(`${SERVER_URL}/users`, {
                    headers: { 'x-auth-token': token },
                });
                console.log('Response from server:', response.data);
                const user = response.data.users.find(user => user.id === parseInt(params.userId));
                if (user) {
                    console.log('User found:', user);
                    setUsername(user.username);
                    setEmail(user.email);
                } else {
                    console.error('User not found');
                    setError('User not found');
                }
                setIsFetched(true);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError(err.response ? err.response.data.message : 'An error occurred');
            }
        };

        if (!isFetched) {
            fetchUser();
        }
    }, [params.userId, token, isFetched]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            console.log('Submitting update for user:', { username, email, password });
            await axios.put(`${SERVER_URL}/users/${params.userId}`, { username, email, password }, {
                headers: { 'x-auth-token': token },
            });
            setLocation('/users');
        } catch (err) {
            console.error('Error updating user:', err);
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: theme.palette.primary.main }}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>Edit User</Typography>
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
                <Button type="submit" variant="contained" color="primary" fullWidth>Update User</Button>
            </Box>
        </Box>
    );
};

export default EditUser;
