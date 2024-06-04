import apiClient from "./services";

export default {
  createStory(promptObj) {
    return apiClient.post("/ai", promptObj);
  },
  saveStory(storyObj) {
    console.log(storyObj);
    return apiClient.post("/stories", storyObj);
  },
};
