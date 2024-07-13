import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { TripData } from '../../models/TripData.tsx';
import { formatDate } from '../../utils/utils.ts';

interface TripTableProps {
  rows: TripData[];
  handleRowClick: (tripId: number | undefined) => void;
}

const TripTable: React.FC<TripTableProps> = ({ rows, handleRowClick }) => {
  const formatNumberWithSpaces = (number: number) => {
    return new Intl.NumberFormat('fi-FI', {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number).replace(/,/g, ' ');
  };

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
          {rows.map((trip) => (
            <TableRow key={trip.id} hover onClick={() => handleRowClick(trip.id)}>
              <TableCell style={{ width: '30%' }}>{formatDate(trip.date)}</TableCell>
              <TableCell style={{ width: '25%' }}>{trip.route}</TableCell>
              <TableCell style={{ width: '30%' }}>
                {formatNumberWithSpaces(+trip.endKilometers - +trip.startKilometers)} km
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TripTable;
