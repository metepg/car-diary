import axios, { AxiosError } from "axios";

const url = "/api/documents";

export const getTripsAsPDF = async (): Promise<unknown[] | undefined> => {
  try {
    const response = await axios.get<unknown[]>(`${url}/pdf/7`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
}
