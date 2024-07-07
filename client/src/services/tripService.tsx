import axios, { AxiosError } from "axios";
import { TripData } from '../models/TripData.tsx';

const url = "/api/trips";

export const create = async (formData: FormData) => {
  try {
    const response = await axios.post(`${url}/create`, formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

export const fetchByDateRange = async (startDate: Date, endDate: Date): Promise<TripData[]> => {
  try {
    const response = await axios.get<TripData[]>(`${url}/range`, {
      params: {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
      }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};