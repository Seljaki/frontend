import React, {useState, useEffect, useContext} from 'react';
import {useLocation} from 'wouter';
import axios from 'axios';
import {UserContext} from '../../store/userContext';
import {SERVER_URL} from '../../constants/http';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  Paper
} from '@mui/material';
import dayjs from 'dayjs';

const AddInvoice = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [started, setStarted] = useState(dayjs().format('YYYY-MM-DD'));
  const [ended, setEnded] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [issuerId, setIssuerId] = useState('');
  const [companies, setCompanies] = useState([]);
  const {token} = useContext(UserContext);
  const [location, setLocation] = useLocation();
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/companies`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setCompanies(response.data.companies);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    async function getDefaultIssuer() {
      const data = await fetch(SERVER_URL + `/companies/defaultIssuer`, {
        headers: {
          "x-auth-token": token,
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        if(json.company)
          setIssuerId(json.company.id)
      }
    }
    fetchCompanies();
    getDefaultIssuer()
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(`${SERVER_URL}/invoices`,
        {title, note, started, ended, isPaid, dueDate, customer_id: customerId, issuer_id: issuerId},
        {headers: {'x-auth-token': token}}
      );
      
      if(res.status < 300) {
        
        setLocation(`/invoices/${res.data.id}`);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      mt: 4,
      color: theme.palette.primary.main
    }}>
      <Paper sx={{p: 2}}>
        <Typography variant="h4" sx={{mb: 2, color: theme.palette.primary.main}}>
          Dodaj račun
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{width: '100%', maxWidth: 400}}>
          <TextField
            label="Naziv"
            variant="outlined"
            required
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{mb: 2}}
          />
          <TextField
            label="Opomba"
            variant="outlined"
            fullWidth
            value={note}
            multiline
            onChange={(e) => setNote(e.target.value)}
            sx={{mb: 2}}
          />
          <TextField
            label="Začeto"
            variant="outlined"
            required
            fullWidth
            type="date"
            value={started}
            onChange={(e) => setStarted(e.target.value)}
            sx={{mb: 2, input: {color: theme.palette.primary.main}}}
            InputLabelProps={{shrink: true}}
          />
          <TextField
            label="Končano"
            variant="outlined"
            fullWidth
            type="date"
            value={ended}
            onChange={(e) => setEnded(e.target.value)}
            sx={{mb: 2, input: {color: theme.palette.primary.main}}}
            InputLabelProps={{shrink: true}}
          />
          <TextField
            label="Rok plačila"
            variant="outlined"
            fullWidth
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            sx={{mb: 2, input: {color: theme.palette.primary.main}}}
            InputLabelProps={{shrink: true}}
          />
          <FormControl fullWidth sx={{mb: 2}}>
            <InputLabel id="customer-label">Stranka</InputLabel>
            <Select
              labelId="customer-label"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              label="Stranka"
              required
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{mb: 2}}>
            <InputLabel id="issuer-label">Izdajatelj</InputLabel>
            <Select
              labelId="issuer-label"
              value={issuerId}
              onChange={(e) => setIssuerId(e.target.value)}
              label="Izdajatelj"
              required
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
            Dodaj
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddInvoice;
