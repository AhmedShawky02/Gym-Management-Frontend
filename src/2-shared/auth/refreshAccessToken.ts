import { setToken, clearToken } from "./tokenLoader";
import { getRefreshToken } from "./refreshTokenLoader";
const API_URL = import.meta.env.VITE_API_URL;

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),

    });

    if (!res.ok) {
      clearToken();
      return null;
    }


    const data = await res.json();

    clearToken();
    setToken(data.accessToken);

    return data.accessToken;
  } catch (err) {
    if (err instanceof Error) {
      console.log("error from refreshAccessToken : ", err.message);
    } else {
      console.log("error from refreshAccessToken : ", err);
    } clearToken();
    return null;
  }
}
