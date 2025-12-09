export function getRefreshToken() {
    try {
        return localStorage.getItem("refreshToken") || null;
    } catch (e) {
        console.warn("Failed to read refresh token from localStorage", e);
        return null;
    }
}

export function loader() {
    return getRefreshToken();
}

export function setRefreshToken(token: string) {
    try {
        localStorage.setItem("refreshToken", token);
    } catch (e) {
        console.warn("Failed to save refresh token", e);
    }
}

export function clearRefreshToken() {
    try {
        localStorage.removeItem("refreshToken");
    } catch (e) {
        console.warn("Failed to clear refresh token", e);
    }
}
