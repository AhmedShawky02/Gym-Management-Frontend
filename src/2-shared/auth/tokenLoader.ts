export function getToken() {
  try {
    return localStorage.getItem("token") || null;
  } catch (e) {
    console.warn("Failed to read token from localStorage", e);
    return null;
  }
}

export function loader() {
  return getToken();
}

export function setToken(token: string) {
  try {
    localStorage.setItem("token", token);
  } catch (e) {
    console.warn("Failed to save token", e);
  }
}

export function clearToken() {
  try {
    localStorage.removeItem("token");

  } catch (e) {
    console.warn("Failed to clear token", e);
  }
}
