import apiClient from "./services";

export default {
  getAll(userId) {
    return apiClient.get("/characters");
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

  delete(id) {
    return apiClient.delete(`/characters/${id}`);
  },

  deleteAll() {
    return apiClient.delete(`/characters`);
  },
};
