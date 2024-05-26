import React, { useState, useContext } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import { UserContext } from '../store/userContext';
import { SERVER_URL } from '../constants/http';
import { TextField, Button, Box, Typography, useTheme, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AddInvoice = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [started, setStarted] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [issuerId, setIssuerId] = useState('');
  const { token } = useContext(UserContext);
  const [location, setLocation] = useLocation();
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${SERVER_URL}/invoices`, 
        { title, note, started, customer_id: customerId, issuer_id: issuerId }, 
        { headers: { 'x-auth-token': token } }
      );

      console.log('Response:', response);
      setLocation('/');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: theme.palette.primary.main }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Add Invoice
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Note"
          variant="outlined"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Started"
          type="date"
          variant="outlined"
          fullWidth
          value={started}
          onChange={(e) => setStarted(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Customer ID</InputLabel>
          <Select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            label="Customer ID"
            sx={{ color: theme.palette.primary.main }}
          >
            {/* Add MenuItem components here for customer_id */}
            <MenuItem value={1}>Customer 1</MenuItem>
            <MenuItem value={2}>Customer 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Issuer ID</InputLabel>
          <Select
            value={issuerId}
            onChange={(e) => setIssuerId(e.target.value)}
            label="Issuer ID"
            sx={{ color: theme.palette.primary.main }}
          >
            {/* Add MenuItem components here for issuer_id */}
            <MenuItem value={1}>Issuer 1</MenuItem>
            <MenuItem value={2}>Issuer 2</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddInvoice;
