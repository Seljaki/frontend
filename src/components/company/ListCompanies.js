import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'wouter';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const { token } = useContext(UserContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get(`${SERVER_URL}/companies`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setCompanies(response.data.companies);
    };
    fetchCompanies();
  }, [token]);

  const handleDelete = async (id) => {
    await axios.delete(`${SERVER_URL}/companies/${id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    setCompanies(companies.filter((company) => company.id !== id));
  };

  return (
    <Box sx={{ display: 'flex',maxWidth: "100%", flex: 1, flexDirection: 'column', alignItems: 'center', ml: 5, mr: 5, mt: 4, color: theme.palette.primary.main }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Podjetja
      </Typography>
      <Button component={Link} href="/company-add" variant="contained" color="primary" sx={{ mb: 2 }}>
        Dodaj podjetje
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Naziv</TableCell>
              <TableCell>Naslov</TableCell>
              <TableCell>Možnosti</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>
                  <IconButton component={Link} href={`/company-edit/${company.id}`} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(company.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListCompanies;
