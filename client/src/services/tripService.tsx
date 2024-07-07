import axios, { AxiosError } from "axios";

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
