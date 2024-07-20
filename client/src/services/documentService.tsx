import axios, { AxiosError } from "axios";

const url = "/api/documents";

export const getTripsAsPDF = async (year: number, month: number): Promise<void> => {
  try {
    const response = await axios.get(`${url}/pdf`, {
      params: {
        year: year,
        month: month,
      },
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const blobURL = window.URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(blobURL, '_blank');

    setTimeout(() => {
      window.URL.revokeObjectURL(blobURL);
    }, 3600000);

  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};