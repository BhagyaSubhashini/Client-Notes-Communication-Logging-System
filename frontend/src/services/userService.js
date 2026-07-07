import API from "../api/axios";

// USERS

export const getUsers =
  async () => {
    const response =
      await API.get("/users");

    return response.data;
  };

export const deleteUser =
  async (id) => {
    const response =
      await API.delete(
        `/users/${id}`
      );

    return response.data;
  };

export const createUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/create",
        userData
      );

    return response.data;
  };

export const resetPassword =
  async (
    id,
    password
  ) => {

    const response =
      await API.put(
        `/users/reset-password/${id}`,
        { password }
      );

    return response.data;
  };

// PROFILE

export const getMyProfile =
  async () => {

    const response =
      await API.get(
        "/users/profile/me"
      );

    return response.data;
  };

export const updateMyProfile =
  async (data) => {

    const response =
      await API.put(
        "/users/profile/me",
        data
      );

    return response.data;
  };

export const changePassword =
  async (data) => {

    const response =
      await API.put(
        "/users/change-password",
        data
      );

    return response.data;
  };

export const uploadProfileImage =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const response =
      await API.post(
        "/users/upload-profile-image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const updateUserByAdmin =
  async (
    id,
    data
  ) => {

    const response =
      await API.put(
        `/users/${id}`,
        data
      );

    return response.data;
  };  