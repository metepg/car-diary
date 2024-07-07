import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { TripData } from '../../models/TripData.tsx';

const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const Diary = () => {
  const [rows, setRows] = useState<TripData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<TripData[]>('/api/trips');
        console.log(response.data)
        setRows(response.data);
      } catch (error) {
        alert(`Virhe: ${error}`);
      }
    })();
  }, []);

  if (!rows) return null;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '30%' }}>PVM</TableCell>
            <TableCell style={{ width: '25%' }}>ALUE</TableCell>
            <TableCell style={{ width: '30%' }}>AJETTU</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell style={{ width: '30%' }}>{formatDate(row.date)}</TableCell>
              <TableCell style={{ width: '25%' }}>{row.route}</TableCell>
              <TableCell style={{ width: '30%' }}>{+row.endKilometers - +row.startKilometers} km</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Diary;
