import apiClient from "./services";

export default {
  getCharacters() {
    return apiClient.get("/characters");
  },
  getCharacter(characterId){
    return apiClient.get(`/characters/${characterId}`)
  },
  async addCharacter(character) {
    return await apiClient.post("/characters", character);
  }
};

