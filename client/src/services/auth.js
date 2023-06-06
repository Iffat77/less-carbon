import axios from "axios";
import api from "./apiConfig";

// Remider to update url before prod NOTE- fugure out api import issue

const baseUrl = "https://less-carbon-mongodb-api.onrender.com/api/users";
// const baseUrl = "http://localhost:8000/api/users";


const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${baseUrl}/login`, { email, password });
    const token = response.data.token;

    localStorage.setItem("token", token);

    return token;
  },

  register: async (name, email, password) => {
    const response = await axios.post(`${baseUrl}`, { name, email, password });
    return response.data.token;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getUserData: async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${baseUrl}/me`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token; // Return true if token exists, false otherwise
  },
};

export default authService;
