import apiClient from "./services";

export default {
  createStory(promptObj) {
    return apiClient.post("/stories", promptObj);
  },
  saveStory(storyObj) {
    return apiClient.put("/stories/save", storyObj);
  },
};
