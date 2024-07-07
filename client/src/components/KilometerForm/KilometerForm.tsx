import { ChangeEvent, useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Alert, MenuItem, Snackbar,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fi } from 'date-fns/locale';
import { TripData } from '../../models/TripData.tsx';
import { create } from '../../services/tripService.tsx';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

const KilometerForm = () => {
  const initialFormData: TripData = {
    startKilometers: '',
    endKilometers: '',
    date: new Date(),
    startTime: null,
    endTime: new Date(),
    area: '',
  };

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('kilometerFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...parsedData,
        date: new Date(parsedData.date),
        startTime: parsedData.startTime ? new Date(parsedData.startTime) : null,
        endTime: new Date(parsedData.endTime),
      };
    }
    return initialFormData;
  });


  useEffect(() => {
    localStorage.setItem('kilometerFormData', JSON.stringify(formData));
  }, [formData]);

  const handleSaveClick = async (): Promise<void> => {
    if (!formData.startKilometers || !formData.endKilometers || !formData.date || !formData.startTime || !formData.endTime) {
      setError('Täytä kaikki kentät');
      setOpen(true);
      return;
    }

    // Remove spaces from numerical fields
    const sanitizedFormData = {
      ...formData,
      startKilometers: formData.startKilometers.replace(/\s+/g, ''),
      endKilometers: formData.endKilometers.replace(/\s+/g, ''),
    };

    setError(null);
    setSuccess(null);
    setOpen(false);

    try {
      await create(sanitizedFormData);
      setFormData(initialFormData);
      localStorage.removeItem('kilometerFormData');
      setSuccess('Tallennus onnistui!');
      setOpen(true);
    } catch (err) {
      setError(`Tallennus epäonnistui... ${err}`);
      setOpen(true);
    }
  };

  const formatNumberWithSpaces = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    const formattedValue = formatNumberWithSpaces(value.replace(/\s+/g, '')); // Remove existing spaces before formatting
    setFormData({...formData, [name]: formattedValue});
  };

  const handleDateChange = (date: Date | null, field: string): void => {
    setFormData({...formData, [field]: date});
  };

  const calculateTotalKilometers = () => {
    const start = parseFloat(formData.startKilometers.replace(/\s+/g, ''));
    const end = parseFloat(formData.endKilometers.replace(/\s+/g, ''));
    return isNaN(start) || isNaN(end) ? 0 : end - start;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <Container component={Paper} sx={{padding: 4, marginTop: 4}}>
        <Typography variant="h6" gutterBottom>
          Päivän kilometrit: {calculateTotalKilometers()} km
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          {success && (
            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={() => setOpen(false)}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
              <Alert onClose={() => setOpen(false)} severity="success">
                {success}
              </Alert>
            </Snackbar>
          )}
          {error && (
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={() => setOpen(false)}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
              <Alert onClose={() => setOpen(false)} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Aloitus kilometrit"
                name="startKilometers"
                value={formData.startKilometers}
                onChange={handleInputChange}
                type="text"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lopetus kilometrit"
                name="endKilometers"
                value={formData.endKilometers}
                onChange={handleInputChange}
                type="text"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Alue"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                size="small"
              >
                <MenuItem value="Vantaa-Helsinki">Vantaa-Helsinki</MenuItem>
                <MenuItem value="Helsinki-Vantaa">Helsinki-Vantaa</MenuItem>
                <MenuItem value="Helsinki-Espoo">Helsinki-Espoo</MenuItem>
                <MenuItem value="Espoo-Helsinki">Espoo-Helsinki</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Pvm"
                value={formData.date}
                onChange={(date) => handleDateChange(date, 'date')}
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {fullWidth: true, size: 'small'},
                }}/>
            </Grid>
            <Grid item xs={12}>
              <TimePicker
                label="Aloitusaika"
                value={formData.startTime}
                onChange={(date) => handleDateChange(date, 'startTime')}
                ampm={false}
              />
            </Grid>
            <Grid item xs={12}>
              <TimePicker
                label="Lopetusaika"
                value={formData.endTime}
                onChange={(date) => handleDateChange(date, 'endTime')}
                ampm={false}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Tallenna
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default KilometerForm;
