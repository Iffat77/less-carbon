import api from "./apiConfig";

export const getCommentsForArticle = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCommentForArticle = async (articleId, body) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log("service for comment fired", articleId, body);
    const response = await api.post(`/articles/${articleId}/comments`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCommentForArticle = async (commentId, content) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      content,
    };

    const response = await api.put(`/comments/${commentId}`, body, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await api.delete(`/comments/${commentId}`, { headers });
  } catch (error) {
    throw error;
  }
};
