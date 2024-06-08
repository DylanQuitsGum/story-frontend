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
  getStoryById(userId, storyId) {
    console.log(`fetch user ${userId} ${storyId}`);
    return apiClient.get(`/users/${userId}/stories/${storyId}`);
  },

  deleteStory(userId, storyId) {
    return apiClient.delete(`/users/${userId}/stories/${storyId}`);
  },
};
