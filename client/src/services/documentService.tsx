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

    const link = document.createElement('a');
    link.href = blobURL;
    const formattedMonth = month.toString().padStart(2, '0');
    link.download = `Kilometrit-${year}-${formattedMonth}.pdf`;

    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(blobURL);
    }, 1800000);

  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};