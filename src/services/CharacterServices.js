import apiClient from "./services";

export default {
  getAll(userId) {
    return apiClient.get(`/users/${userId}/characters`);
  },

  get(id) {
    return apiClient.get(`/characters/${id}`);
  },

  create(data) {
    return apiClient.post("/characters", data);
  },

  update(id, data) {
    return apiClient.put(`/characters/${id}`, data);
  },

  delete({ userId, characterId }) {
    return apiClient.delete(`/users/${userId}/characters/${characterId}`);
  },

  deleteAll(userId) {
    return apiClient.delete(`/users/${userId}/characters`);
  },
};
