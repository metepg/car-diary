import axios from "axios";

const url = "/api/trips";

export const create = async (formData: FormData) => {
  try {
    const response = await axios.post(`${url}/create`, formData);
    return response.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};
