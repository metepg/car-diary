import { Dispatch, FC, SetStateAction } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { TripData } from '../../models/TripData';
import TripForm from '../TripForm/TripForm';
import { getRoutesFromLocalStorage } from '../../utils/localStorageUtils.ts';
import CloseIcon from '@mui/icons-material/Close';

interface EditTripModalProps {
  open: boolean;
  handleClose: () => void;
  selectedTrip: TripData | null;
  setError: (message: string | null) => void;
  onSave: () => Promise<void>;
  setSelectedTrip: Dispatch<SetStateAction<TripData | null>>;
  handleDelete: (tripId: number | undefined) => Promise<void>
}

const EditTripModal: FC<EditTripModalProps> = ({open, handleClose, selectedTrip, setError, onSave, setSelectedTrip, handleDelete}) => {
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
        outline: 'none',
      }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h6" component="h2" gutterBottom>
            Muokkaa
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon/>
          </IconButton>
        </Box>
        <TripForm
          tripData={selectedTrip}
          onSave={onSave}
          onClose={handleClose}
          routes={routes}
          setError={setError}
          setTripData={setSelectedTrip}
          handleDelete={handleDelete}
        />
      </Box>
    </Modal>
  );
};

export default EditTripModal;
