import api from "./apiConfig";

export const getWalls = async () => {
  try {
    console.log(api)
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get("/walls", { headers })
    return response.data
  } catch (error) {
    throw error;  
  }
}

export const getWall = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get(`/wall/${id}`, { headers })
    return response.data
  } catch (error) {
    throw error;  
  }
}

export const createWall = async (body) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.post(`/walls`, body, { headers })
    return response.data
  } catch (error) {
    throw error;  
  }
}

export const updateWall = async (id, wall) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.put(`walls/${id}`, wall, { headers })
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteWall = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.delete(`walls/${id}`, { headers })
    return response.data
  } catch (error) {
    throw error
  }
}