import apiClient from "./services";

export default {
  getCharacters() {
    return apiClient.get("/characters");
  },
  async addCharacter(character) {
    return await apiClient.post("/characters", character);
  }
};

