import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { ISupplementDto, ISupplementFromCartDto } from "../../../2-shared/types/supplement";
import type { ICartItemDto } from "../../../2-shared/types/cart";
import { fetchWithAuth } from "../../../2-shared/auth/fetchWithAuth";
const API_URL = import.meta.env.VITE_API_URL;

type CartContextType = {
    setCartOpen: Dispatch<SetStateAction<boolean>>
    cartOpen: boolean

    // GuestCart
    AddToGuestCart: Function,
    RemoveFromGuestCart: Function,
    guestCart: ISupplementDto[],
    setGuestCart: Dispatch<SetStateAction<ISupplementDto[]>>,

    // UserCart
    AddToUserCart: Function
    RemoveFromUserCart: Function,
    setUserCart: Dispatch<SetStateAction<ICartItemDto[]>>,
    userCart: ICartItemDto[],
}

const CartContext = createContext<CartContextType>({
    setCartOpen: () => { },
    cartOpen: false,

    // GuestCart
    AddToGuestCart: () => { },
    RemoveFromGuestCart: () => { },
    setGuestCart: () => { },
    guestCart: [],

    // UserCart
    AddToUserCart: () => { },
    RemoveFromUserCart: () => { },
    setUserCart: () => { },
    userCart: []
})

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartOpen, setCartOpen] = useState<boolean>(false)

    // GuestCart 
    const [guestCart, setGuestCart] = useState<ISupplementDto[]>(() => {
        const listCart = localStorage.getItem("guestCart");
        if (listCart !== null) {
            return JSON.parse(listCart);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
    }, [guestCart]);

    const AddToGuestCart = (supplement: ISupplementDto) => {
        const theSplement = guestCart.find((i) => i.id === supplement.id);

        if (theSplement) {
            theSplement.UserQuantity = theSplement.UserQuantity ? theSplement.UserQuantity + 1 : 1
            return setGuestCart((prev) => [...prev].map((el) => el.id === supplement.id ? theSplement : el))
        }

        supplement.UserQuantity = 1
        return setGuestCart((prev) => [...prev, supplement])
    }

    const RemoveFromGuestCart = (supplement: ISupplementDto) => {
        const theSplement = guestCart.find((i) => i.id === supplement.id)

        if (!theSplement) {
            return;
        }

        if (Number(theSplement.UserQuantity) === 0) {
            setGuestCart((prev) => [...prev.filter((i) => i.id !== theSplement.id)])
        } else {
            const newQuantity = Number(theSplement.UserQuantity) - 1;
            if (newQuantity <= 0) {
                setGuestCart((prev) => [...prev.filter((i) => i.id !== theSplement.id)])
            }
            theSplement.UserQuantity = newQuantity
            setGuestCart((prev) => [...prev.map((i) => i.id === theSplement.id ? theSplement : i)])
        }

    }

    //--------------------------------------------------------

    // UserCart
    const [userCart, setUserCart] = useState<ICartItemDto[]>(() => {
        const listCart = localStorage.getItem("userCart");
        if (listCart !== null) {
            return JSON.parse(listCart);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("userCart", JSON.stringify(userCart));
    }, [userCart]);

    const AddToUserCart = async (supplement: ISupplementFromCartDto) => {
        try {

            const res = await fetchWithAuth(`${API_URL}/api/user/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_type: "supplement",
                    product_id: supplement.id,
                    quantity: 1,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to add item to cart");
            }

            const data: ICartItemDto = await res.json();

            return setUserCart((prev) => {
                const exists = prev.find((el) => el.product_id === data.product_id);

                if (exists) {
                    return prev.map((el) =>
                        el.id === exists.id ? data : el
                    );
                }

                return [...prev, data];
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const RemoveFromUserCart = async (supplement: ISupplementFromCartDto) => { // if quantity 0 fetch to remove cart else fetch ro update cart
        try {

            const TheSupplement = { ...supplement, quantity: supplement.quantity - 1 }

            const res = await fetchWithAuth(`${API_URL}/api/user/cart/${TheSupplement.CartId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    quantity: TheSupplement.quantity,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to Remove item From cart");
            }

            const data: ICartItemDto = await res.json();

            return setUserCart((prev) => {
                const exists = prev.find((el) => el.product_id === data.product_id);

                if (exists) {
                    return prev.map((el) =>
                        el.id === exists.id ? data : el
                    );
                }

                return [...prev, data];
            });

        } catch (error) {
            console.error("Error Remove to cart:", error);
        }
    }

    return (
        <CartContext.Provider value={{
            setCartOpen,
            cartOpen,

            // GuestCart
            AddToGuestCart,
            RemoveFromGuestCart,
            setGuestCart,
            guestCart,

            // UserCart
            AddToUserCart,
            RemoveFromUserCart,
            setUserCart,
            userCart

        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}