import { Modal, Box, TextField, Button, Grid, Typography } from '@mui/material';
import { TripData } from '../../models/TripData.tsx';
import { ChangeEvent, FC } from 'react';
import { NumericFormat } from 'react-number-format';
import { calculateTotalKilometers } from '../../utils/utils.ts';

interface EditTripModalProps {
  open: boolean;
  handleClose: () => void;
  selectedTrip: TripData | null;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  formatDate: (dateString: Date) => string
}

const EditTripModal: FC<EditTripModalProps> = ({open, handleClose, selectedTrip, handleInputChange, handleSave, formatDate}) => {
  if (!selectedTrip) return null;

  const totalKilometers = calculateTotalKilometers(selectedTrip.startKilometers, selectedTrip.endKilometers);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 4,
        outline: 'none'
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Muokkaa
        </Typography>
        <form>
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
                value={selectedTrip.startKilometers}
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
                value={selectedTrip.endKilometers}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Alue"
                name="route"
                value={selectedTrip.route}
                InputProps={{
                  readOnly: true,
                  disabled: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Päivämäärä"
                name="date"
                value={formatDate(selectedTrip.date)}
                InputProps={{
                  readOnly: true,
                  disabled: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <strong>PÄIVÄN KILOMETRIT: {totalKilometers} km</strong>
              </Typography>
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Tallenna
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Peruuta
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTripModal;