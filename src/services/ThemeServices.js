import apiClient from "./services";

export default {
  getThemes() {
    return apiClient.get("/themes");
  },
  
  get(id) {
    return apiClient.get(`/themes/${id}`);
  },

  create(data) {
    return apiClient.post("/themes", data);
  },

  update(id, data) {
    return apiClient.put(`/themes/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`/themes/${id}`);
  },

  deleteAll() {
    return apiClient.delete(`/themes`);
  },
};
