import axios, { AxiosError } from "axios";
import { TripData } from '../models/TripData.tsx';

const url = "/api/trips";

const handleAxiosError = (error: unknown): never => {
  if (error instanceof AxiosError && error.response) {
    throw error.response.data;
  }
  throw error;
};

export const create = async (formData: FormData): Promise<TripData> => {
  try {
    const response = await axios.post<TripData>(`${url}/create`, formData);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const fetchAll = async (): Promise<TripData[]> => {
  try {
    const response = await axios.get<TripData[]>(`${url}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const fetchByDateRange = async (startDate: Date, endDate: Date): Promise<TripData[]> => {
  const localStartDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000));
  const localEndDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000));
  try {
    const response = await axios.get<TripData[]>(`${url}/range`, {
      params: {
        start_date: localStartDate,
        end_date: localEndDate
      }
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const fetchById = async (tripId: number): Promise<TripData> => {
  try {
    const response = await axios.get<TripData>(`${url}/${tripId}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateTrip = async (trip: TripData): Promise<TripData> => {
  try {
    const response = await axios.put<TripData>(`${url}`, trip);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
