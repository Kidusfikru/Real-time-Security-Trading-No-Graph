import axios from "axios";

const API_URL = "https://www.alphavantage.co";

const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(
      `${API_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`
    );
    return response.data["Global Quote"];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchStockData };
