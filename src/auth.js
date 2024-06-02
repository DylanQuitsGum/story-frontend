export function isAuthenticated() {
  const storedUser = localStorage.getItem("user");
  const loggedIn = storedUser && JSON.parse(storedUser).token;
  return loggedIn;
}
