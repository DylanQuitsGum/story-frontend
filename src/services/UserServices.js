import apiClient from "./services";

export default {
  async getUser() {
    return await apiClient.get("users");
  },
  async addUser(user) {
    return await apiClient.post("users", user);
  },
  loginUser(user) {
    console.log(user);
    return apiClient.post("login", user.value, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization:
          "Basic " + btoa(user.value.email + ":" + user.value.password),
      },
    });
  },
  logoutUser() {
    localStorage.removeItem("user");
  },
};
