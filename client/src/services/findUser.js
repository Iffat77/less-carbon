import api from "./apiConfig";

export const getUserNameById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get(`/users/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPubUserNameById = async (id) => {
  try {
    const response = await api.get(`/users/pub/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};