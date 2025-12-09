import { redirect } from "react-router-dom";
import { clearToken } from "../../../../2-shared/auth/tokenLoader";
import { clearRefreshToken, getRefreshToken } from "../../../../2-shared/auth/refreshTokenLoader";
const API_URL = import.meta.env.VITE_API_URL

export async function action() {
    const refreshToken = getRefreshToken();

    try {
        const res = await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: refreshToken }),

        });
        if (!res.ok) throw new Error("Failed to logout");

        await res.json();
        console.log("log out Seccsess")
    } catch (err) {
        const error = err as Error
        console.log(error.message);
    } finally {
        clearToken();
        clearRefreshToken();
    }

    return redirect("/auth/login");
}
