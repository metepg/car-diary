import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useState } from 'react';

interface SearchSectionProps {
  handleSearch: (year: number, month: number) => void;
}

const SearchSection: FC<SearchSectionProps> = ({ handleSearch }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  const months = [
    { value: 1, label: 'Tammikuu' },
    { value: 2, label: 'Helmikuu' },
    { value: 3, label: 'Maaliskuu' },
    { value: 4, label: 'Huhtikuu' },
    { value: 5, label: 'Toukokuu' },
    { value: 6, label: 'Kesäkuu' },
    { value: 7, label: 'Heinäkuu' },
    { value: 8, label: 'Elokuu' },
    { value: 9, label: 'Syyskuu' },
    { value: 10, label: 'Lokakuu' },
    { value: 11, label: 'Marraskuu' },
    { value: 12, label: 'Joulukuu' },
  ];

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const year = event.target.value as number;
    setSelectedYear(year);
    handleSearch(year, selectedMonth);
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const month = event.target.value as number;
    setSelectedMonth(month);
    handleSearch(selectedYear, month);
  };

  return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <FormControl fullWidth>
            <InputLabel id="year-select-label">Valitse vuosi</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              onChange={handleYearChange}
              label="Valitse vuosi"
            >
              {Array.from(new Array(10), (_, index) => (
                <MenuItem key={currentYear - index} value={currentYear - index}>
                  {currentYear - index}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Valitse kuukausi</InputLabel>
            <Select
              labelId="month-select-label"
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Valitse kuukausi"
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
  );
};

export default SearchSection;