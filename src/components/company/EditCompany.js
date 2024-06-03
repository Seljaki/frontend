import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useParams } from 'wouter';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import {TextField, Button, Box, Typography, useTheme, Checkbox, FormControlLabel, Paper} from '@mui/material';

const EditCompany = () => {
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
  const params = useParams()
  const [error, setError] = useState(null);
  const theme = useTheme();
  const initialFetch = useRef(true);

  useEffect(() => {
    if (!params || !token || !initialFetch.current) {
      return;
    }

    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/companies/${params.companyId}`, {
          headers: {
            'x-auth-token': token,
          },
        });

        const company = response.data.company;
        console.log('Fetched company:', company);
        setName(company.name);
        setAddress(company.address);
        setIsTaxpayer(company.isTaxpayer);
        setPhone(company.phone);
        setTaxNumber(company.taxNumber);
        setIban(company.iban);
        setEmail(company.email);
        setIsDefaultIssuer(company.defaultIssuer);
        initialFetch.current = false;
      } catch (err) {
        console.error('Error:', err);
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchCompany();
  }, [params, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('Submitting:', { name, address, isTaxpayer, phone, taxNumber, iban, email, isDefaultIssuer });
      await axios.put(`${SERVER_URL}/companies/${params.companyId}`, 
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
      <Paper sx={{p:2}}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Uredi podjetje
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Naziv"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            console.log('Name changed:', e.target.value);
          }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Naslov"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            console.log('Address changed:', e.target.value);
          }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Telefon"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            console.log('Phone changed:', e.target.value);
          }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Davčna številka"
          variant="outlined"
          fullWidth
          value={taxNumber}
          onChange={(e) => {
            setTaxNumber(e.target.value);
            console.log('Tax Number changed:', e.target.value);
          }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="IBAN"
          variant="outlined"
          fullWidth
          value={iban}
          onChange={(e) => {
            setIban(e.target.value);
            console.log('IBAN changed:', e.target.value);
          }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log('Email changed:', e.target.value);
          }}
          sx={{ mb: 2, input: { color: theme.palette.primary.main } }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isTaxpayer}
              onChange={(e) => {
                setIsTaxpayer(e.target.checked);
                console.log('Is Taxpayer changed:', e.target.checked);
              }}
              color="primary"
            />
          }
          label="Davčni zavezanec"
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDefaultIssuer}
              onChange={(e) => {
                setIsDefaultIssuer(e.target.checked);
                console.log('Is Default Issuer changed:', e.target.checked);
              }}
              color="primary"
            />
          }
          label="Prevzeti izdajatelj"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Posodobi
        </Button>
      </Box>
    </Paper>
    </Box>
  );
};

export default EditCompany;
