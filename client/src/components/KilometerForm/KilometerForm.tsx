import { ChangeEvent, useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Alert, MenuItem,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { fi } from 'date-fns/locale';
import { TripData } from '../../models/TripData.tsx';
import { create } from '../../services/tripService.tsx';

const KilometerForm = () => {
  const initialFormData: TripData = {
    startKilometers: '',
    endKilometers: '',
    date: new Date(),
    startTime: null,
    endTime: new Date(),
    area: '',
  };

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

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('kilometerFormData', JSON.stringify(formData));
  }, [formData]);

  const handleSaveClick = async (): Promise<void> => {
    if (!formData.startKilometers || !formData.endKilometers || !formData.date || !formData.startTime || !formData.endTime) {
      setError('All fields are required.');
      return;
    }

    setError(null);

    try {
      await create(formData);
      setFormData(initialFormData);
      localStorage.removeItem('kilometerFormData');
    } catch (err) {
      setError('Failed to save data. Please try again.');
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
        {error && (
          <Alert severity="error" sx={{mb: 2}}>
            {error}
          </Alert>
        )}
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Aloitus kilometrit"
                name="startKilometers"
                value={formData.startKilometers}
                onChange={handleInputChange}
                type="text" // Change to text to allow spaces
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
                type="text" // Change to text to allow spaces
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
              <DateField
                label="Pvm"
                value={formData.date}
                onChange={(date) => handleDateChange(date, 'date')}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TimeField
                label="Aloitusaika"
                value={formData.startTime}
                onChange={(date) => handleDateChange(date, 'startTime')}
                fullWidth
                size="small"
                ampm={false}
              />
            </Grid>
            <Grid item xs={12}>
              <TimeField
                label="Lopetusaika"
                value={formData.endTime}
                onChange={(date) => handleDateChange(date, 'endTime')}
                fullWidth
                size="small"
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
