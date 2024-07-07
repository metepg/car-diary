import axios, { AxiosError } from "axios";
import { Route } from '../models/Route.tsx';

const url = "/api/routes";

// export const create = async (formData: FormData): Promise<Route | undefined> => {
//   try {
//     const response = await axios.post<Route>(`${url}/create`, formData);
//     return response.data;
//   } catch (error) {
//     if (error instanceof AxiosError && error.response) {
//       throw error.response.data;
//     }
//   }
// };

export const getRoutes = async (): Promise<Route[] | undefined> => {
  try {
    const response = await axios.get<Route[]>(`${url}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
}