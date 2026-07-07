import API from "../api/axios";

export const getAnalytics = async () => {
  const response = await API.get("/analytics");
  return response.data;
};