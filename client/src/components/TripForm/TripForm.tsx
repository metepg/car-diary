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
import { DatePicker, TimeField  } from '@mui/x-date-pickers';
import { Route } from '../../models/Route.tsx';
import { getRoutes } from '../../services/routeService.tsx';
import { NumericFormat } from 'react-number-format';

const TripForm = () => {
  const initialFormData: TripData = {
    startKilometers: '',
    endKilometers: '',
    date: new Date(),
    startTime: null,
    endTime: new Date(),
    route: ''
  };

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('tripFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...parsedData,
        date: new Date(parsedData.date),
        startTime: parsedData.startTime ? new Date(parsedData.startTime) : null,
        endTime: new Date(),
        route: parsedData.route
      };
    }
    return initialFormData;
  });

  useEffect(() => {
    localStorage.setItem('tripFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    (async () => {
      try {
        const routes = await getRoutes();
        if (routes) {
          setRoutes(routes);
        }
      } catch (error) {
        setError(`Failed to fetch routes: ${error}`);
        setOpen(true);
      }
    })();
  }, []);

  const handleSaveClick = async (): Promise<void> => {
    if (!formData.startKilometers || !formData.endKilometers || !formData.date || !formData.startTime || !formData.endTime || !formData.route) {
      setError('Täytä kaikki kentät');
      setOpen(true);
      return;
    }

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
      setFormData({
        ...initialFormData,
        startKilometers: formatNumberWithSpaces(sanitizedFormData.endKilometers.toString()),
      });
      localStorage.removeItem('tripFormData');
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
    setFormData({...formData, [name]: value});
  };

  const handleDateChange = (date: Date | null, field: string): void => {
    setFormData({...formData, [field]: date});
  };

  const calculateTotalKilometers = () => {
    if (!formData || !formData.startKilometers || !formData.endKilometers) return 0;
    const start = parseFloat(formData.startKilometers.toString().replace(/\s+/g, ''));
    const end = parseFloat(formData.endKilometers.toString().replace(/\s+/g, ''));
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
              <NumericFormat
                fullWidth
                label="Aloitus kilometrit"
                name="startKilometers"
                customInput={TextField}
                onChange={handleInputChange}
                thousandSeparator=" "
                value={formData.startKilometers || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <NumericFormat
                fullWidth
                label="Lopetus kilometrit"
                name="endKilometers"
                customInput={TextField}
                onChange={handleInputChange}
                thousandSeparator=" "
                value={formData.endKilometers || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Alue"
                name="route"
                value={formData.route || ''}
                onChange={handleInputChange}
                size="small"
              >
                {routes.map((route) => (
                  <MenuItem key={route.id} value={route.description}>
                    {route.description}
                  </MenuItem>
                ))}
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
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TimeField
                label="Aloitusaika"
                value={formData.startTime}
                onChange={(date) => handleDateChange(date, 'startTime')}
                ampm={false}
              />
            </Grid>
            <Grid item xs={12}>
              <TimeField
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

export default TripForm;
