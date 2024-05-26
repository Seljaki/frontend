import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'wouter';
import axios from 'axios';
import { UserContext } from '../store/userContext';
import { SERVER_URL } from '../constants/http';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: theme.palette.primary.main }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Companies
      </Typography>
      <Button component={Link} href="/add-company" variant="contained" color="primary" sx={{ mb: 2 }}>
        Add Company
      </Button>
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>
                  <IconButton component={Link} href={`/edit-company/${company.id}`} color="primary">
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
