import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TripData } from '../../models/TripData';
import { fi } from 'date-fns/locale';
import { fetchAll, fetchByDateRange, fetchById, updateTrip } from '../../services/tripService.tsx';
import EditTripModal from '../EditTripModal/EditTripModal.tsx';


const Diary = () => {
  const [rows, setRows] = useState<TripData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetchAll();
      setRows(response);
      const total = response.reduce((acc, trip) => acc + (+trip.endKilometers - +trip.startKilometers), 0);
      setTotalAmount(total);
    })();
  }, []);

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const stripSpaces = (value: string): number => {
    return Number(value.replace(/\s+/g, ''));
  };

  const handleSearch = async () => {
    if (startDate && endDate) {
      try {
        const response = await fetchByDateRange(startDate, endDate);
        setRows(response);

        // Calculate the total amount
        const total = response.reduce((acc, trip) => acc + (+trip.endKilometers - +trip.startKilometers), 0);
        setTotalAmount(total);
      } catch (error) {
        alert(`Virhe: ${error}`);
      }
    }
  };

  const handleRowClick = async (tripId: number | undefined) => {
    if (!tripId) return;
    const result = await fetchById(tripId);
    setSelectedTrip(result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTrip(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setSelectedTrip((prevTrip) => {
      if (!prevTrip) return prevTrip;

      return {
        ...prevTrip,
        [name]: value,
      } as TripData;
    });
  };

  // TODO: MESSAGE ABOUT THE UPDATE PROCESS
  const handleSave = async () => {
    if (selectedTrip) {
      const formattedData = {
        ...selectedTrip,
        startKilometers: stripSpaces(selectedTrip.startKilometers.toString()),
        endKilometers: stripSpaces(selectedTrip.endKilometers.toString()),
      };
      const updatedTrip = await updateTrip(formattedData)

      setRows((prevRows) => {
        return prevRows.map((trip) =>
          trip.id === updatedTrip.id ? updatedTrip : trip
        );
      });
    }

    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <Paper sx={{padding: 2, marginBottom: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <DatePicker
              label="Aloituspäivämäärä"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              slotProps={{textField: {fullWidth: true}}}
            />
          </Grid>
          <Grid item xs={5}>
            <DatePicker
              label="Lopetuspäivämäärä"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              slotProps={{textField: {fullWidth: true}}}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
              sx={{height: '100%'}}
            >
              Hae
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {totalAmount !== null && (
        <Typography variant="h6" gutterBottom>
          Kokonaiskilometrit: {totalAmount} km
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{width: '30%'}}>PVM</TableCell>
              <TableCell style={{width: '25%'}}>ALUE</TableCell>
              <TableCell style={{width: '30%'}}>AJETTU</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((trip) => (
              <TableRow
                key={trip.id}
                hover
                onClick={() => handleRowClick(trip.id)}
              >
                <TableCell style={{width: '30%'}}>{formatDate(trip.date)}</TableCell>
                <TableCell style={{width: '25%'}}>{trip.route}</TableCell>
                <TableCell style={{width: '30%'}}>{+trip.endKilometers - +trip.startKilometers} km</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditTripModal
        open={open}
        handleClose={handleClose}
        selectedTrip={selectedTrip}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        formatDate={formatDate}
      />
    </LocalizationProvider>
  );
};

export default Diary;
