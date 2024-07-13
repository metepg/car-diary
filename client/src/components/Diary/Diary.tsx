import { ChangeEvent, useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TripData } from '../../models/TripData';
import { fi } from 'date-fns/locale';
import { fetchAll, fetchByDateRange, fetchById, updateTrip } from '../../services/tripService.tsx';
import EditTripModal from '../EditTripModal/EditTripModal.tsx';
import { calculateTotalAmount, formatDate, stripSpaces } from '../../utils/utils.ts';
import TripTable from '../TripTable/TripTable.tsx';
import SearchSection from '../SearchSection/SearchSection.tsx';

const Diary = () => {
  const [rows, setRows] = useState<TripData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);

  useEffect(() => {
    (async () => {
      await loadAllTrips();
    })();
  }, []);

  const loadAllTrips = async () => {
    const tripData = await fetchAll();
    setRows(tripData);
    setTotalAmount(calculateTotalAmount(tripData));
  };

  const handleSearch = async () => {
    if (startDate && endDate) {
      try {
        const tripData = await fetchByDateRange(startDate, endDate);
        setRows(tripData);
        setTotalAmount(calculateTotalAmount(tripData));
      } catch (error) {
        alert(`Virhe: ${error}`);
      }
    }
  };

  const handleRowClick = async (tripId: number | undefined) => {
    if (!tripId) return;
    const tripData = await fetchById(tripId);
    setSelectedTrip(tripData);
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
      return {...prevTrip, [name]: value} as TripData;
    });
  };

  const handleSave = async () => {
    if (selectedTrip) {
      const formattedData = {
        ...selectedTrip,
        startKilometers: stripSpaces(selectedTrip.startKilometers.toString()),
        endKilometers: stripSpaces(selectedTrip.endKilometers.toString()),
      };
      const updatedTrip = await updateTrip(formattedData);

      setRows((prevRows) =>
        prevRows.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip))
      );
    }
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <Paper sx={{padding: 2, marginBottom: 2}}>
        <SearchSection
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSearch={handleSearch}
        />
      </Paper>

      {totalAmount !== null && (
        <Typography variant="h6" gutterBottom>
          Kokonaiskilometrit: {totalAmount} km
        </Typography>
      )}

      <TripTable rows={rows} handleRowClick={handleRowClick}/>

      {/*Show modal when user clicks row from table*/}
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