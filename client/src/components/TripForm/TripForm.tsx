import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Box, Button, Container, Grid, MenuItem, Paper, TextField, Typography, } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fi } from 'date-fns/locale';
import { TripData } from '../../models/TripData';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import { Route } from '../../models/Route';
import { NumericFormat } from 'react-number-format';
import { calculateTotalKilometers, stripSpaces } from '../../utils/utils';

interface TripFormProps {
  tripData: TripData | null;
  setTripData: Dispatch<SetStateAction<TripData | null>>;
  onSave: (tripData: TripData) => void;
  onClose?: () => void;
  routes: Route[] | undefined;
  setError: (message: string | null) => void
}

const TripForm: FC<TripFormProps> = ({tripData, onSave, onClose, routes, setTripData, setError}) => {
  if (!tripData) return null;

  const totalKilometers = calculateTotalKilometers(tripData);

  const handleSaveClick = async (): Promise<void> => {
    if (!formIsValid(tripData)) {
      return;
    }

    const sanitizedTripData = {
      ...tripData,
      startKilometers: stripSpaces(tripData.startKilometers.toString()),
      endKilometers: stripSpaces(tripData.endKilometers.toString()),
    };

    onSave(sanitizedTripData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    setTripData({...tripData, [name]: value});
  };

  const handleDateChange = (date: Date | null, field: string): void => {
    setTripData(prevData => prevData ? { ...prevData, [field]: date } : null);
  };

  const formIsValid = (form: TripData): boolean => {
    const hasEmptyValues = Object.values(form).some(value => !value);

    if (hasEmptyValues) {
      setError("Täytä kaikki tiedot");
      return false;
    }
    if (totalKilometers <= 0) {
      setError("Ajettu matka ei voi olla 0 tai pienempi.")
      return false;
    }

    return true;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <Container component={Paper} sx={{padding: 4, marginTop: 4}}>
        <Typography variant="h6" gutterBottom>
          Ajettu matka: {totalKilometers} km
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumericFormat
                fullWidth
                type="tel"
                label="Aloitus kilometrit"
                name="startKilometers"
                customInput={TextField}
                onChange={handleInputChange}
                thousandSeparator=" "
                value={tripData.startKilometers}
              />
            </Grid>
            <Grid item xs={12}>
              <NumericFormat
                fullWidth
                type="tel"
                label="Lopetus kilometrit"
                name="endKilometers"
                customInput={TextField}
                onChange={handleInputChange}
                thousandSeparator=" "
                value={tripData.endKilometers}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Alue"
                name="route"
                value={tripData.route}
                onChange={handleInputChange}
                size="small"
              >
                {routes?.map((route) => (
                  <MenuItem key={route.id} value={route.description}>
                    {route.description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Pvm"
                value={tripData.date ? new Date(tripData.date) : null}
                onChange={(date) => handleDateChange(date, 'date')}
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {fullWidth: true, size: 'small'},
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TimeField
                fullWidth
                label="Aloitusaika"
                value={tripData.startTime ? new Date(tripData.startTime) : null}
                onChange={(date) => handleDateChange(date, 'startTime')}
                ampm={false}
              />
            </Grid>
            <Grid item xs={12}>
              <TimeField
                fullWidth
                label="Lopetusaika"
                value={tripData.endTime ? new Date(tripData.endTime) : null}
                onChange={(date) => handleDateChange(date, 'endTime')}
                ampm={false}
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  {tripData ? 'Tallenna' : 'Päivitä'}
                </Button>
                {!tripData?.id ? null : <Button variant="outlined" onClick={onClose}>
                  Peruuta
                </Button>
                }
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default TripForm;
