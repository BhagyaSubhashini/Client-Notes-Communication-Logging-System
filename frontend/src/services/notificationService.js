import API from "../api/axios";

export const getNotifications = async () => {
  const response = await API.get("/notifications");
  return response.data;
};

export const markNotificationRead = async (id) => {
  const response = await API.put(`/notifications/${id}`);
  return response.data;
};