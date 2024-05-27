import React, { useState, useContext } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { TextField, Button, Box, Typography, useTheme, FormControlLabel, Checkbox } from '@mui/material';

const AddCompany = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isTaxpayer, setIsTaxpayer] = useState(false);
  const [phone, setPhone] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [iban, setIban] = useState('');
  const [email, setEmail] = useState('');
  const [isDefaultIssuer, setIsDefaultIssuer] = useState(false);
  const { token } = useContext(UserContext);
  const [location, setLocation] = useLocation();
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${SERVER_URL}/companies`, 
        { name, address, isTaxpayer, phone, taxNumber, iban, email, isDefaultIssuer }, 
        { headers: { 'x-auth-token': token } }
      );

      setLocation('/companies');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', mt: 4, color: theme.palette.primary.main }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Add Company
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Tax Number"
          variant="outlined"
          fullWidth
          value={taxNumber}
          onChange={(e) => setTaxNumber(e.target.value)}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="IBAN"
          variant="outlined"
          fullWidth
          value={iban}
          onChange={(e) => setIban(e.target.value)}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isTaxpayer}
              onChange={(e) => setIsTaxpayer(e.target.checked)}
              color="primary"
            />
          }
          label="Is Taxpayer"
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDefaultIssuer}
              onChange={(e) => setIsDefaultIssuer(e.target.checked)}
              color="primary"
            />
          }
          label="Is Default Issuer"
          sx={{ mb: 2 }}
        />
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

export default AddCompany;
