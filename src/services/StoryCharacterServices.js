import apiClient from "./services";

export default {
  getAll({ userId, storyId }) {
    return apiClient.get(`/users/${userId}/stories/${storyId}/characters`);
  },
  create({ userId, storyId, data }) {
    return apiClient.post(
      `/users/${userId}/stories/${storyId}/characters`,
      data
    );
  },
  deleteAll({ userId, storyId }) {
    return apiClient.delete(`/users/${userId}/stories/${storyId}/characters`);
  },
};
