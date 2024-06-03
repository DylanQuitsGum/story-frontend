import apiClient from "./services";

export default {
  getCountries() {
    return apiClient.get("/countries");
  },
};
