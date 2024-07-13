import { Dispatch, FC, SetStateAction } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { TripData } from '../../models/TripData';
import TripForm from '../TripForm/TripForm';
import { getRoutesFromLocalStorage } from '../../utils/localStorageUtils.ts';

interface EditTripModalProps {
  open: boolean;
  handleClose: () => void;
  selectedTrip: TripData | null;
  setError: (message: string | null) => void;
  onSave: () => Promise<void>;
  setSelectedTrip: Dispatch<SetStateAction<TripData | null>>;
}

const EditTripModal: FC<EditTripModalProps> = ({ open, handleClose, selectedTrip, setError, onSave, setSelectedTrip }) => {
  if (!selectedTrip) return null;

  const routes = getRoutesFromLocalStorage();

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
        <TripForm
          tripData={selectedTrip}
          onSave={onSave}
          onClose={handleClose}
          routes={routes}
          setError={setError}
          setTripData={setSelectedTrip}
        />
      </Box>
    </Modal>
  );
};

export default EditTripModal;
