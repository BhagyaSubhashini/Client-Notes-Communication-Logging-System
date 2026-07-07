import API from "../api/axios";

export const getClients = async () => {
  const response = await API.get("/clients");
  return response.data;
};

export const searchClients = async (query) => {
  const response = await API.get(`/clients/search?query=${query}`);
  return response.data;
};

export const createClient = async (clientData) => {
  const response = await API.post("/clients", clientData);
  return response.data;
};

export const updateClient = async (
  clientId,
  clientData
) => {

  const response =
    await API.put(
      `/clients/${clientId}`,
      clientData
    );

  return response.data;
};

export const deleteClient = async (
  clientId
) => {

  const response =
    await API.delete(
      `/clients/${clientId}`
    );

  return response.data;
};

export const getDashboardStats =
  async () => {

    const response =
      await API.get(
        "/clients/stats/dashboard"
      );

    return response.data;
};