import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useRoute } from 'wouter';
import axios from 'axios';
import { UserContext } from '../store/userContext';
import { SERVER_URL } from '../constants/http';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel, useTheme } from '@mui/material';

const EditInvoice = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [issuerId, setIssuerId] = useState('');
  const [companies, setCompanies] = useState([]);
  const { token } = useContext(UserContext);
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/invoices/edit/:invoiceId');
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [fetched, setFetched] = useState(false);

  const fetchInvoice = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/invoices/${params.invoiceId}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      const invoice = response.data.invoice;
      console.log('Fetched invoice:', invoice);
      setTitle(invoice.title);
      setNote(invoice.note);
      setStarted(invoice.started);
      setEnded(invoice.ended);
      setIsPaid(invoice.isPaid);
      setDueDate(invoice.dueDate);
      setCustomerId(invoice.customer_id);
      setIssuerId(invoice.issuer_id);
      setFetched(true);
    } catch (err) {
      console.error('Error fetching invoice:', err);
      setError(err.response ? err.response.data.message : 'An error occurred while fetching the invoice');
    }
  }, [params.invoiceId, token]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/companies`, {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log('Fetched companies:', response.data.companies);
        setCompanies(response.data.companies);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err.response ? err.response.data.message : 'An error occurred while fetching companies');
      }
    };

    if (params && !fetched) {
      fetchCompanies();
      fetchInvoice();
    } else if (!params) {
      console.error('No params available from useRoute hook');
      setError('Invalid route parameters');
    }
  }, [params, fetchInvoice, token, fetched]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('Submitting:', { title, note, started, ended, isPaid, dueDate, customer_id: customerId, issuer_id: issuerId });
      await axios.put(`${SERVER_URL}/invoices/${params.invoiceId}`, 
        { title, note, started, ended, isPaid, dueDate, customer_id: customerId, issuer_id: issuerId }, 
        { headers: { 'x-auth-token': token } }
      );

      setLocation('/invoices');
    } catch (err) {
      console.error('Error during invoice update:', err);
      setError(err.response ? err.response.data.message : 'An error occurred while updating the invoice');
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
          variant="outlined"
          fullWidth
          type="date"
          value={started}
          onChange={(e) => setStarted(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Ended"
          variant="outlined"
          fullWidth
          type="date"
          value={ended}
          onChange={(e) => setEnded(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Due Date"
          variant="outlined"
          fullWidth
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="customer-label">Customer</InputLabel>
          <Select
            labelId="customer-label"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            label="Customer"
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="issuer-label">Issuer</InputLabel>
          <Select
            labelId="issuer-label"
            value={issuerId}
            onChange={(e) => setIssuerId(e.target.value)}
            label="Issuer"
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
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
