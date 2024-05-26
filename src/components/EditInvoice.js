import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useRoute } from 'wouter';
import axios from 'axios';
import { UserContext } from '../store/userContext';
import { SERVER_URL } from '../constants/http';
import { TextField, Button, Box, Typography, useTheme, MenuItem, Select, InputLabel, FormControl, Checkbox, FormControlLabel } from '@mui/material';

const EditInvoice = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [issuerId, setIssuerId] = useState('');
  const { token } = useContext(UserContext);
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/edit/:invoiceId');
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (!params) {
      return;
    }

    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/invoices/${params.invoiceId}`, {
          headers: {
            'x-auth-token': token,
          },
        });

        const invoice = response.data;
        setTitle(invoice.title);
        setNote(invoice.note);
        setStarted(invoice.started);
        setEnded(invoice.ended);
        setIsPaid(invoice.isPaid);
        setDueDate(invoice.dueDate);
        setCustomerId(invoice.customer_id);
        setIssuerId(invoice.issuer_id);
      } catch (err) {
        console.error('Error:', err);
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchInvoice();
  }, [params, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.put(`${SERVER_URL}/invoices/${params.invoiceId}`, 
        { title, note, started, ended, isPaid, dueDate, customer_id: customerId, issuer_id: issuerId },
        { headers: { 'x-auth-token': token } }
      );

      setLocation('/');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: theme.palette.primary.main }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Edit Invoice
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
        <TextField
          label="Ended"
          type="date"
          variant="outlined"
          fullWidth
          value={ended}
          onChange={(e) => setEnded(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              color="primary"
            />
          }
          label="Is Paid"
          sx={{ mb: 2 }}
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
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditInvoice;
