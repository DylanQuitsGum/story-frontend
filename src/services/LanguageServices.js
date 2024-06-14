import apiClient from "./services";

export default {
  getLanguages() {
    return apiClient.get("/languages");
  },
  
  get(id) {
    return apiClient.get(`/languages/${id}`);
  },

  create(data) {
    return apiClient.post("/languages", data);
  },

  update(id, data) {
    return apiClient.put(`/languages/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`/languages/${id}`);
  },

  deleteAll() {
    return apiClient.delete(`/languages`);
  },
};
