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
  updateStory(storyObj) {
    const { userId, storyId } = storyObj;
    return apiClient.put(`/users/${userId}/stories/${storyId}`, storyObj);
  },
  getStoryById(userId, storyId) {
    return apiClient.get(`/users/${userId}/stories/${storyId}`);
  },
  deleteStory(userId, storyId) {
    return apiClient.delete(`/users/${userId}/stories/${storyId}`);
  },
};
