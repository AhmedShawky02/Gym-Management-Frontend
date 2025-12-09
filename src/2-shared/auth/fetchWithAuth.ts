import { getToken } from "./tokenLoader";
import { refreshAccessToken } from "./refreshAccessToken";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    try {
        // جلب التوكين الحالي
        let accessToken = getToken();

        // لو التوكين مش موجود، حاول تجديده
        if (!accessToken) {
            accessToken = await refreshAccessToken();
            if (!accessToken) {
                throw new Error("Unauthorized, please login again");
            }
        }

        // ارسال الريكوست
        let res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        // لو التوكين انتهى أثناء الطلب
        if (res.status === 401) {
            const newToken = await refreshAccessToken();
            if (!newToken) {
                throw new Error("Unauthorized, please login again");
            }

            res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                },
                credentials: "include",
            });
        }

        // حالة 403
        if (res.status === 403) {
            const data = await res.json();
            throw new Error(data.message || "Forbidden");
        }

        if (res.status === 400) {
            return res;
        }

        // أي حالة فشل أخرى
        if (!res.ok) {
            // باقي الحالات الغير متوقعة
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${res.status}`);
        }

        return res;
    } catch (err) {
        if (err instanceof Error) {
            console.error("fetchWithAuth error: ", err.message);
        } else {
            console.log("fetchWithAuth error: ", err);
        }
        throw err;
    }
}
