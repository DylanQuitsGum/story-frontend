import apiClient from "./services";

export default {
  getLanguages() {
    return apiClient.get("/languages");
  },
};
