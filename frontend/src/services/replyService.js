import API from "../api/axios";

export const addReply = async (replyData) => {
  const response = await API.post("/replies", replyData);
  return response.data;
};

export const getReplies = async (noteId) => {
  const response = await API.get(`/replies/${noteId}`);
  return response.data;
};