import API from "../api/axios";

export const createNote = async (
  noteData
) => {
  const response =
    await API.post(
      "/notes",
      noteData
    );

  return response.data;
};

export const getNotesByClient =
  async (clientId) => {

    const response =
      await API.get(
        `/notes/${clientId}`
      );

    return response.data;
  };

export const getNoteById =
  async (id) => {

    const response =
      await API.get(
        `/notes/single/${id}`
      );

    return response.data;
  };

export const searchNotes =
  async (query) => {

    const response =
      await API.get(
        `/notes/search/direct?query=${query}`
      );

    return response.data;
  };

export const getLatestNotes =
  async (
    page = 1,
    limit = 10
  ) => {

    const response =
      await API.get(
        `/notes/latest/all?page=${page}&limit=${limit}`
      );

    return response.data;
  };