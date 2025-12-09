import { setToken } from "../../../../2-shared/auth/tokenLoader";
import { type ActionFunctionArgs } from "react-router-dom";
import { setRefreshToken } from "../../../../2-shared/auth/refreshTokenLoader";
import type { ILoginAction, LoginActionResult } from "../../../../2-shared/types/auth";
import type { BackendError } from "../../../../2-shared/types/error.api";
import { syncGuestCart } from "../../../../2-shared/cart/cart";
import { fetchWithAuth } from "../../../../2-shared/auth/fetchWithAuth";
const API_URL = import.meta.env.VITE_API_URL

export async function action({ request }: ActionFunctionArgs): Promise<LoginActionResult> {

    const formData = await request.formData()

    const evenData = {
        email: formData.get("email"),
        password_hash: formData.get("password"),
    }

    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evenData)
    });

    if (response.status === 404) {
        const errorData: BackendError = await response.json();
        return { error: errorData, cart: null, redirectTo: "/" };
    }

    if (!response.ok) {
        const errorData: BackendError = await response.json();
        return { error: errorData, cart: null, redirectTo: "/" };
    }

    let data: ILoginAction;
    try {
        data = await response.json();
    } catch (e) {
        console.error("Failed to parse login response", e);
        return { error: "Invalid server response", cart: null, redirectTo: "/" };
    }

    if (data.accessToken) {        
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken)
        console.log("Done Login, token stored");

        await syncGuestCart();

        const res = await fetchWithAuth(`${API_URL}/api/user/cart`);
        const serverCart = res.ok ? await res.json() : [];

        return { cart: serverCart, redirectTo: "/", error: null };
    } else {
        return { cart: null, redirectTo: "/", error: "No token returned from server" };
    }

}