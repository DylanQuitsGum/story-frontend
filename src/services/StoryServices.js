import apiClient from "./services";

export default {
  getStories(userId) {
    return apiClient.get(`/stories?userId=${userId}`);
  },
  createStory(promptObj) {
    return apiClient.post("/ai", promptObj);
  },
  saveStory(storyObj) {
    console.log(storyObj);
    return apiClient.post("/stories", storyObj);
  },
};
