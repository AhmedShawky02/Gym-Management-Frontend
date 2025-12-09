import { useEffect, useState } from "react";
import classes from "./CheckOutPage.module.css";
import { fetchWithAuth } from "../../../2-shared/auth/fetchWithAuth";
import type { ICartItemDto } from "../../../2-shared/types/cart";
import type { IPaymentLinkResponse } from "../../../2-shared/types/payment";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const CheckOutPage = () => {
    const [cartItems, setCartItems] = useState<ICartItemDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await fetchWithAuth(`${API_URL}/api/user/cart`);
                if (!res.ok) {
                    throw new Error("Failed to load products");
                }
                const data = await res.json();
                setCartItems(data);
            } catch (err) {
                const error = err as Error;
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const [loadingPayment, setLoadingPayment] = useState<boolean>(false)
    const navigate = useNavigate();

    const handelCheckoutProcess = async () => {
        try {
            setLoadingPayment(true)

            const res = await fetchWithAuth(`${API_URL}/api/user/payment/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed in Payment");
            }

            const data: IPaymentLinkResponse = await res.json();

            if (data.url) {
                window.open(data.url, "_blank");
            }

            navigate("/");

        } catch (error) {
            console.error("Error Failed in Payment:", error);
        } finally {
            setLoadingPayment(false)
        }
    }

    if (loading) {
        return <div className={classes.loader}>Loading your cart...</div>;
    }

    if (cartItems.length === 0) {
        return <div className={classes.empty}>Your cart is empty 🛒</div>;
    }

    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + Number(item.productDetails?.price || 0) * item.quantity;
    }, 0);

    return (
        <div className={classes.CheckOutPage}>
            <div className={classes.container}>
                <h1 className={classes.title}>Checkout</h1>
                <div className={classes.cartList}>
                    {cartItems.map((item) => (
                        <div key={item.id} className={classes.cartItem}>
                            <img
                                src={item.productDetails?.image_url}
                                alt={item.productDetails?.name}
                                className={classes.image}
                            />
                            <div className={classes.details}>
                                <h2>{item.productDetails?.name}</h2>
                                <p className={classes.description}>
                                    {item.productDetails?.description}
                                </p>
                                <p className={classes.price}>
                                    ${item.productDetails?.price} × {item.quantity}
                                </p>
                                <p className={classes.subtotal}>
                                    Subtotal:<span>  </span>
                                    {(
                                        Number(item.productDetails?.price || 0) * item.quantity
                                    ).toLocaleString("en-us")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={classes.summary}>
                    <h2>Total: {totalPrice.toLocaleString("en-US", { style: 'currency', currency: 'EGY' })}</h2>
                    <button
                        className={classes.checkoutBtn}
                        onClick={handelCheckoutProcess}
                        disabled={loadingPayment}
                    >
                        {loadingPayment ? <span className={classes.loaderBtn}></span> : "Proceed to Payment"}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default CheckOutPage;
