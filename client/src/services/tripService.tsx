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

export const fetchAll = async (): Promise<TripData[]> => {
  try {
    const response = await axios.get<TripData[]>(`${url}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error;
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
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const fetchById = async (tripId: number): Promise<TripData> => {
  try {
    const response = await axios.get<TripData>(`${url}/${tripId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
