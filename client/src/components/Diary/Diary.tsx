import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TripData } from '../../models/TripData';
import { fi } from 'date-fns/locale';
import { fetchAllTrips, fetchTripByDateRange, fetchTripById, updateTrip } from '../../services/tripService';
import EditTripModal from '../EditTripModal/EditTripModal';
import { calculateTotalAmount, parseTotalAmountWithThousandSeparator, stripSpaces } from '../../utils/utils';
import TripTable from '../TripTable/TripTable';
import SearchSection from '../SearchSection/SearchSection';
import { useSnackbar } from '../SnackBarContext/SnackBarContext.tsx';

const Diary = () => {
  const [rows, setRows] = useState<TripData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const {setSuccess, setError} = useSnackbar();

  useEffect(() => {
    (async () => {
      const tripData = await fetchAllTrips();
      setRows(tripData);
      setTotalAmount(calculateTotalAmount(tripData));
    })();
  }, []);

  const handleSearch = async () => {
    if (startDate && endDate) {
      try {
        const tripData = await fetchTripByDateRange(startDate, endDate);
        setRows(tripData);
        setTotalAmount(calculateTotalAmount(tripData));
      } catch (error) {
        alert(`Virhe: ${error}`);
      }
    }
  };

  const handleRowClick = async (tripId: number | undefined) => {
    if (!tripId) return;
    const tripData = await fetchTripById(tripId);
    setSelectedTrip(tripData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTrip(null);
  };

  const onSave = async (): Promise<void> => {
    try {
      if (!selectedTrip) return;

      const formattedSelectedTrip = {
        ...selectedTrip,
        startKilometers: stripSpaces(selectedTrip.startKilometers.toString()),
        endKilometers: stripSpaces(selectedTrip.endKilometers.toString()),
      };

      await updateTrip(formattedSelectedTrip);

      const updatedRows = rows.map(row => (row.id === formattedSelectedTrip.id ? formattedSelectedTrip : row));
      setRows(updatedRows);

      const newTotalAmount = calculateTotalAmount(updatedRows);
      setTotalAmount(newTotalAmount);

      setSuccess("Päivitys onnistui");
      handleClose();
    } catch (err) {
      setError(`Päivitys epäonnistui, ${err}`);
    }
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
          Kokonaiskilometrit: {parseTotalAmountWithThousandSeparator(totalAmount)} km
        </Typography>
      )}

      <TripTable rows={rows} handleRowClick={handleRowClick}/>

      <EditTripModal
        open={open}
        handleClose={handleClose}
        selectedTrip={selectedTrip}
        setError={setError}
        onSave={onSave}
        setSelectedTrip={setSelectedTrip}
      />
    </LocalizationProvider>
  );
};

export default Diary;
