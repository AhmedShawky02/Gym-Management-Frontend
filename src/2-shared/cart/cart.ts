import { fetchWithAuth } from "../auth/fetchWithAuth";
import type { ISupplementDto } from "../types/supplement";
const API_URL = import.meta.env.VITE_API_URL;

export async function syncGuestCart() {
    const list = localStorage.getItem("guestCart");
    
    if (!list) {
        console.log("List Cart Is Empty in syncGuestCart")
        return;
    }

    const listCart: ISupplementDto[] = JSON.parse(list)

    for (const element of listCart) {
        try {
            await fetchWithAuth(`${API_URL}/api/user/cart/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_type: "supplement",
                    product_id: element.id,
                    quantity: element.UserQuantity,
                }),
            });
        } catch (err) {
            console.error(err);
        }
    }

    localStorage.removeItem("guestCart");
}