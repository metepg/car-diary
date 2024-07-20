import { useEffect, useState } from 'react';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TripData } from '../../models/TripData';
import { fi } from 'date-fns/locale';
import {
  deleteTripById,
  fetchTripById,
  fetchTripsByMonth,
  updateTrip
} from '../../services/tripService';
import EditTripModal from '../EditTripModal/EditTripModal';
import { calculateTotalAmount, parseTotalAmountWithThousandSeparator, stripSpaces } from '../../utils/utils';
import TripTable from '../TripTable/TripTable';
import SearchSection from '../SearchSection/SearchSection';
import { useSnackbar } from '../SnackBarContext/SnackBarContext.tsx';
import { HttpStatusCode } from 'axios';
import DownloadIcon from '@mui/icons-material/DownloadForOfflineRounded';
import { getTripsAsPDF } from '../../services/documentService.tsx';

const Diary = () => {
  const [rows, setRows] = useState<TripData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const {setSuccess, setError} = useSnackbar();

  useEffect(() => {
    (async () => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const tripData = await fetchTripsByMonth(currentYear, currentMonth);
      setRows(tripData);
      setTotalAmount(calculateTotalAmount(tripData));
    })();
  }, []);

  const handleSearch = async (year: number, month: number) => {
    if (year && month) {
      setYear(year)
      setMonth(month)
      try {
        const tripData = await fetchTripsByMonth(year, month)
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

  const handleDownload = async () => {
    await getTripsAsPDF(year, month);
  };

  const handleDelete = async (tripId: number | undefined) => {
    if (!tripId) return;

    const shouldDelete = confirm("Haluatko poistaa tämän merkinnän ajopäiväkirjasta?");
    if (!shouldDelete) return;

    const response = await deleteTripById(tripId);

    if (response.status === HttpStatusCode.Ok) {
      setSuccess("Merkintä poistettu")
      setRows(rows.filter(trip => trip.id !== tripId))
      handleClose();
    } else {
      setError("Virhe poistettaessa merkintää");
    }
  }

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
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <SearchSection handleSearch={handleSearch}/>
          </Grid>
          <Grid item>
            <IconButton onClick={handleDownload} aria-label="download">
              <DownloadIcon color="primary" fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {totalAmount !== null && (
        <Typography variant="h6" gutterBottom>
          Kokonaiskilometrit: {parseTotalAmountWithThousandSeparator(totalAmount)} km
        </Typography>
      )}

      <TripTable
        rows={rows}
        handleRowClick={handleRowClick}
      />

      <EditTripModal
        open={open}
        handleClose={handleClose}
        selectedTrip={selectedTrip}
        setError={setError}
        onSave={onSave}
        setSelectedTrip={setSelectedTrip}
        handleDelete={handleDelete}
      />
    </LocalizationProvider>
  );
};

export default Diary;
