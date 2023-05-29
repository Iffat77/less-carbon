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