import apiClient from "./services";

export default {
  getGenres() {
    return apiClient.get("/genres");
  },
  
  get(id) {
    return apiClient.get(`/genres/${id}`);
  },

  create(data) {
    return apiClient.post("/genres", data);
  },

  update(id, data) {
    return apiClient.put(`/genres/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`/genres/${id}`);
  },

  deleteAll() {
    return apiClient.delete(`/genres`);
  },
};
