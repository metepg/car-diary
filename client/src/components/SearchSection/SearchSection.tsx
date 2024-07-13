import { Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FC } from 'react';

interface SearchSectionProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  handleSearch: () => void;
}

const SearchSection: FC<SearchSectionProps> = ({ startDate, setStartDate, endDate, setEndDate, handleSearch }) => (
  <Grid container spacing={2}>
    <Grid item xs={5}>
      <DatePicker
        label="Aloituspäivämäärä"
        value={startDate}
        onChange={(date) => setStartDate(date)}
        slotProps={{ textField: { fullWidth: true } }}
      />
    </Grid>
    <Grid item xs={5}>
      <DatePicker
        label="Lopetuspäivämäärä"
        value={endDate}
        onChange={(date) => setEndDate(date)}
        slotProps={{ textField: { fullWidth: true } }}
      />
    </Grid>
    <Grid item xs={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        fullWidth
        sx={{ height: '100%' }}
      >
        Hae
      </Button>
    </Grid>
  </Grid>
);

export default SearchSection;
