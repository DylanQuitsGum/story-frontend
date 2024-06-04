import apiClient from "./services";

export default {
  getStories(userId) {
    return apiClient.get(`/users/${userId}/stories`);
  },
  createStory(promptObj) {
    return apiClient.post("/ai", promptObj);
  },
  saveStory(storyObj) {
    console.log(storyObj);
    return apiClient.post("/stories", storyObj);
  },
};
