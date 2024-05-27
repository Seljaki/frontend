import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'wouter';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditJob from '../job/EditJob';

const ListInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const { token } = useContext(UserContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await axios.get(`${SERVER_URL}/invoices`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setInvoices(response.data.invoices);
    };
    fetchInvoices();
  }, [token]);

  const handleDelete = async (id) => {
    await axios.delete(`${SERVER_URL}/invoices/${id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', mt: 4, color: theme.palette.primary.main }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Invoices
      </Typography>
      <EditJob />
      <Button component={Link} href="/invoices/add" variant="contained" color="primary" sx={{ mb: 2 }}>
        Add Invoice
      </Button>
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.title}</TableCell>
                <TableCell>{invoice.note}</TableCell>
                <TableCell>
                  <IconButton component={Link} href={`/invoices/edit/${invoice.id}`} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(invoice.id)} color="secondary">
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

export default ListInvoices;
