import apiClient from "./services";

export default {
  getCharacters() {
    return apiClient.get("/characters");
  },
};
