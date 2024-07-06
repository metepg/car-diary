import { useState, ChangeEvent } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const KilometerForm = () => {
  const [formData, setFormData] = useState({
    startKilometers: '',
    endKilometers: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalKilometers = () => {
    const start = parseFloat(formData.startKilometers);
    const end = parseFloat(formData.endKilometers);
    return isNaN(start) || isNaN(end) ? 0 : end - start;
  };

  return (
    <Container component={Paper} sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Total Kilometers: {calculateTotalKilometers()}
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Starting Kilometers"
              name="startKilometers"
              value={formData.startKilometers}
              onChange={handleInputChange}
              type="number"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ending Kilometers"
              name="endKilometers"
              value={formData.endKilometers}
              onChange={handleInputChange}
              type="number"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Start Time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              type="time"
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="End Time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              type="time"
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default KilometerForm;
