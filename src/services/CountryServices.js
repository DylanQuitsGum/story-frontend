import apiClient from "./services";

export default {
  getCountries() {
    return apiClient.get("/countries");
  },
  
  get(id) {
    return apiClient.get(`/countries/${id}`);
  },

  create(data) {
    return apiClient.post("/countries", data);
  },

  update(id, data) {
    return apiClient.put(`/countries/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`/countries/${id}`);
  },

  deleteAll() {
    return apiClient.delete(`/countries`);
  },
};
