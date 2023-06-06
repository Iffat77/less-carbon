import api from "./apiConfig";

export const getArticles = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get("/articles", { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArticle = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get(`/article/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createArticle = async (body) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.post(`/articles`, body, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArticle = async (id, article) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.put(`articles/${id}`, article, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.delete(`article/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllArticles = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get("/all", { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPubArticles = async () => {
  try {
    const response = await api.get("/pubarticles");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPubArticle = async (id) => {
  try {
    const response = await api.get(`/pubarticle/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
