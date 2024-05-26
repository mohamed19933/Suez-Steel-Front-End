import axios from "axios";
import { baseUrl } from "../../Api";

const DownloadExcel = async (urlExport) => {
  try {
    console.log("Show = ", baseUrl + urlExport);
    const response = await axios.get(baseUrl + urlExport, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    return url;
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    throw error;
  }
};

export default DownloadExcel;
