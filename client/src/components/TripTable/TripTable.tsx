import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, useTheme } from '@mui/material';
import { TripData } from '../../models/TripData.tsx';
import { calculateDeliveriesPerHour, formatDate } from '../../utils/utils.ts';

interface TripTableProps {
  rows: TripData[];
  handleRowClick: (tripId: number | undefined) => void;
}

const TripTable: React.FC<TripTableProps> = ({ rows, handleRowClick }) => {
  const theme = useTheme();
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
            <TableCell style={{ width: '15%' }}>PVM</TableCell>
            <TableCell style={{ width: '20%' }}>ALUE</TableCell>
            <TableCell style={{ width: '30%' }}>AJETTU</TableCell>
            <TableCell style={{ width: '35%' }}>KEIKAT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((trip) => {
            const deliveriesPerHour = calculateDeliveriesPerHour(trip);

            return (
              <TableRow key={trip.id} hover onClick={() => handleRowClick(trip.id)}>
                <TableCell style={{ width: '15%' }}>{formatDate(trip.date)}</TableCell>
                <TableCell style={{ width: '20%' }}>{trip.route}</TableCell>
                <TableCell style={{ width: '20%' }}>
                  {formatNumberWithSpaces(+trip.endKilometers - +trip.startKilometers)} km
                </TableCell>
                <TableCell
                  style={{
                    width: '35%',
                    color: parseFloat(deliveriesPerHour) >= 2
                      ? theme.palette.success.light
                      : theme.palette.error.light
                  }}
                >
                  {deliveriesPerHour}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TripTable;
