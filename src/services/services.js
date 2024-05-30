import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost:3201/storyapi/";
} else {
  baseurl = "http://107.23.63.118:3201/storyapi/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//   transformRequest: (data, headers) => {
//     let token = null;
//     if (localStorage.getItem("user") !== null) {
//       token = JSON.parse(localStorage.getItem("user")).token;
//     }
//     let authHeader = "";
//     if (token !== null && token !== "") {
//       authHeader = "Bearer " + token;
//       headers["Authorization"] = authHeader;
//     }
//     return JSON.stringify(data);
//   },
//   transformResponse: function (data) {
//     data = JSON.parse(data);
//     if (!data.success && data.code == "expired-session") {
//       localStorage.removeItem("user");
//     }
//     return data;
//   },
// });

export default apiClient;
