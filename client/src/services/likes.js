import api from "./apiConfig";

export const createLike = async (articleId, userId) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = { user: userId };

    const response = await api.post(`/articles/${articleId}/likes`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLikesForArticle = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}/likes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLike = async (likeId) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.delete(`/likes/${likeId}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
