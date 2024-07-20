export interface TripData {
  id?: number;
  startKilometers: number | string;
  endKilometers: number | string;
  date: Date;
  startTime?: Date | null;
  endTime: Date | null;
  route: string;
}