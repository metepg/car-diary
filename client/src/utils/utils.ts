import { TripData } from '../models/TripData.tsx';

export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const stripSpaces = (value: string): number => {
  return Number(value.replace(/\s+/g, ''));
};

export const calculateTotalAmount = (trips: TripData[]): number => {
  return trips.reduce((acc, trip) => acc + (+trip.endKilometers - +trip.startKilometers), 0);
};

export const calculateTotalKilometers = (tripData: TripData): number => {
  if (!tripData) return 0;

  const {startKilometers, endKilometers} = tripData;
  if (!startKilometers || !endKilometers) return 0;

  const start = parseFloat(startKilometers.toString().replace(/\s+/g, ''));
  const end = parseFloat(endKilometers.toString().replace(/\s+/g, ''));
  return isNaN(start) || isNaN(end) ? 0 : end - start;
};

export const parseTotalAmountWithThousandSeparator = (amount: number): string => {
  if (!amount) {
    return amount.toString();
  }

  // Use Intl.NumberFormat to format the number with a space as the thousand separator
  return new Intl.NumberFormat('fi-FI', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/,/g, ' ');
};

export const calculateDeliveriesPerHour = (trip: TripData): string => {
  if (!trip.startTime || !trip.endTime) throw new Error("startTime and endTime must be defined");

  const start = new Date(trip.startTime);
  const end = new Date(trip.endTime);

  const startTotalMinutes = start.getHours() * 60 + start.getMinutes();
  const endTotalMinutes = end.getHours() * 60 + end.getMinutes();
  const differenceInHours = (endTotalMinutes - startTotalMinutes) / 60;

  if (!trip.deliveries || differenceInHours === 0) return "0.00"

  return (trip.deliveries / differenceInHours).toFixed(2);
}
