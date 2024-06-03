import apiClient from "./services";

export default {
  getThemes() {
    return apiClient.get("/themes");
  },
};
