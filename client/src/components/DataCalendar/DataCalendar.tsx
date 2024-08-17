import { Box, useTheme } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { TripData } from '../../models/TripData.tsx';
import { calculateDeliveriesPerHour } from '../../utils/utils.ts';
import { FC, useEffect, useState } from 'react';

interface ColoredCalendarProps {
  tripData: TripData[];
  selectedMonth: number;
  selectedYear: number;
}

const DataCalendar: FC<ColoredCalendarProps> = ({ tripData, selectedYear, selectedMonth }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (selectedMonth) {
      const newDate = new Date(selectedYear, selectedMonth - 1);
      setSelectedDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1)); // Set to the first day of the selected month
      const calendarElement = document.querySelector('.MuiDateCalendar-root') as HTMLElement;
      if (calendarElement) {
        calendarElement.style.display = 'contents';
      }
    }
  }, [selectedMonth, selectedYear, tripData]);

  useEffect(() => {
    document.querySelectorAll('.MuiPickersCalendarHeader-root').forEach(element => {
      const el = element as HTMLElement;
      el.style.display = 'none';
    });

    document.querySelectorAll('.MuiDayCalendar-weekContainer button').forEach(dayButton => {
      const buttonElement = dayButton as HTMLElement;
      const timestamp = parseInt(dayButton.getAttribute('data-timestamp') || '');
      const date = new Date(timestamp);
      buttonElement.classList.remove('Mui-selected');

      date.setDate(date.getDate() + 1); // Add one day to fix the issue

      const formattedDate = date.toISOString().split('T')[0];

      const deliveryData = tripData.find(d => {
        const startDate = new Date(d.startTime as Date).toISOString().split('T')[0];
        return startDate === formattedDate;
      });

      const deliveries = deliveryData ? parseFloat(calculateDeliveriesPerHour(deliveryData)) : 0;

      if (!deliveries) return;

      if (deliveries >= 2) {
        buttonElement.style.backgroundColor = theme.palette.success.light; // Green = good day
      } else {
        buttonElement.style.backgroundColor = theme.palette.error.light; // Red = bad day
      }
    });
  }, [selectedDate, theme.palette.error.light, theme.palette.success.light, tripData]);

  return (
    <Box sx={{ m: 2 }}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        views={['day']}
        disableFuture
        disablePast
        disableHighlightToday={true}
        sx={{
          '.MuiDateCalendar-root': {
            marginBottom: 0,
          },
        }}
        slots={{
          leftArrowIcon: "style",
          rightArrowIcon: "style"
        }}
        readOnly
      />
    </Box>
  );
};

export default DataCalendar;