import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'wouter';
import axios from 'axios';
import { UserContext } from '../../store/userContext';
import { SERVER_URL } from '../../constants/http';
import { Box, MenuItem, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useTheme, FormControl, InputLabel, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IsInvoicePaidCheckBox from './IsInvoicePaidCheckBox';

const ListInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [showPaid, setShowPaid] = useState("undefined")
  const { token } = useContext(UserContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await axios.get(`${SERVER_URL}/invoices`, {
        headers: {
          'x-auth-token': token,
        },
        params: {
          paid: showPaid === "undefined" ? undefined : showPaid
        }
      });
      setInvoices(response.data.invoices);
    };
    fetchInvoices();
  }, [token, showPaid]);

  const handleDelete = async (id) => {
    await axios.delete(`${SERVER_URL}/invoices/${id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', ml: 5, mr: 5, mt: 4, color: theme.palette.primary.main }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Računi
      </Typography>
      <Box display='flex' width='100%' p={2}>
        <Box flex={1}>
          <FormControl>
            <InputLabel id="paid">Status plačila</InputLabel>
            <Select
              defaultValue={"undefined"}
              labelId="paid"
              id="paid"
              value={showPaid}
              label="Status plačila"
              onChange={(e) => {setShowPaid(e.target.value)}}
            >
              <MenuItem value={"undefined"} defaultValue>Pokaži vse</MenuItem>
              <MenuItem value={"true"}>Plačani</MenuItem>
              <MenuItem value={"false"}>Neplačani</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button component={Link} href="/invoices/add" variant="contained" color="primary" sx={{ mb: 2 }}>
            Dodaj račun
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Naziv</TableCell>
              <TableCell>Opomba</TableCell>
              <TableCell>Stranka</TableCell>
              <TableCell>Vsota</TableCell>
              <TableCell>Je plačan</TableCell>
              <TableCell>Možnosti</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.title}</TableCell>
                <TableCell>{invoice.note}</TableCell>
                <TableCell>{invoice.customer.name}</TableCell>
                <TableCell>{invoice.totalPrice} €</TableCell>
                <TableCell><IsInvoicePaidCheckBox token={token} invoiceId={invoice.id} isPaid={invoice.isPaid} setIsPaid={(isPaid) => {
                  setInvoices(invoices.map((i) => i.id === invoice.id ? {...i, isPaid: isPaid} : i));
                }} /></TableCell>
                <TableCell>
                  <IconButton component={Link} href={`/invoices/${invoice.id}`} color="primary">
                    <VisibilityIcon />
                  </IconButton>
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
