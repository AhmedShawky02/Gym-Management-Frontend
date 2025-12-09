import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { useCart } from "../components/CartContext";
import classes from "./CartSlider.module.css"
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from "react-icons/io5";
import { useEffect } from "react";
import { getToken } from "../../../2-shared/auth/tokenLoader";
import { Link } from "react-router-dom";
import type { ISupplementFromCartDto } from "../../../2-shared/types/supplement";

const CartSlider = () => {

    const {
        setCartOpen,
        cartOpen,

        // GuestCart
        AddToGuestCart,
        RemoveFromGuestCart,
        guestCart,

        // UserCart
        AddToUserCart,
        RemoveFromUserCart,
        userCart

    } = useCart()

    const token = getToken();

    let CartLength;
    let totalSallery;
    if (token) {
        CartLength = userCart.length;
        totalSallery = userCart.reduce((acc, current) => acc + (Number(current.quantity) * Number(current.productDetails?.price)), 0).toLocaleString("en-US", { style: 'currency', currency: 'EGY' })
    } else {
        totalSallery = guestCart.reduce((acc, current) => acc + (Number(current.UserQuantity) * Number(current.price)), 0).toLocaleString("en-US", { style: 'currency', currency: 'EGY' })
        CartLength = guestCart.length;
    }

    const cartItems: ISupplementFromCartDto[] = token
        ? userCart.map(item => ({
            CartId: item.id,
            id: item.product_id,
            name: item.productDetails?.name ?? "",
            price: Number(item.productDetails?.price ?? 0),
            quantity: Number(item.quantity),
            image: item.productDetails?.image_url ?? "",
        }))
        : guestCart.map(item => ({
            id: item.id,
            name: item.name ?? "",
            price: Number(item.price ?? 0),
            quantity: Number(item.UserQuantity ?? 0),
            image: item.image_url ?? "",
        }));


    useEffect(() => {
        if (cartOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };

    }, [cartOpen])

    return (
        <>
            <AnimatePresence>

                {cartOpen &&
                    <>
                        <div className={classes.cartOverrideContainer}
                            onClick={() => setCartOpen(false)}
                        ></div>
                        <motion.div className={classes.CartContainer}
                            initial={{ x: 400 }}
                            animate={{ x: 0 }}
                            exit={{ x: 400 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={classes.cart}>
                                <h2>Cart Item <IoCloseOutline
                                    onClick={() => setCartOpen(false)}
                                />
                                </h2>
                                {CartLength > 0 ?
                                    <>
                                        <div className={classes.ListCart}>
                                            <div className={classes.oneCart}>

                                                {cartItems.map((supplement, index) => {
                                                    const sallery = (Number(supplement.quantity) * Number(supplement.price)).toLocaleString("en-US")
                                                    return (
                                                        <>

                                                            <div className={classes.cartItem} key={index}>
                                                                <img src={supplement.image} alt="img" />
                                                                <div className={classes.supplementDesc}>
                                                                    <p className={classes.name}>{supplement.name}</p>
                                                                    <p className={classes.type}>Supplement</p>
                                                                    <p className={classes.price}><span>per one :</span> {Number(supplement.price).toLocaleString('en-US')}</p>
                                                                    <p className={classes.totalPrice}><span> Total Price :</span> {sallery}</p>
                                                                </div>
                                                                <div className={classes.Count}>
                                                                    <IoMdAdd
                                                                        onClick={
                                                                            token ? () => AddToUserCart(supplement)
                                                                                : () => AddToGuestCart(supplement)
                                                                        }
                                                                    />
                                                                    {supplement.quantity}
                                                                    <IoIosRemove
                                                                        onClick={
                                                                            token ? () => RemoveFromUserCart(supplement)
                                                                                : () => RemoveFromGuestCart(supplement)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div className={classes.cartBtns}>
                                                <p><span>total Price</span> {totalSallery}</p>
                                                <Link to={token ? "/check-out" : "/auth/login"}
                                                    onClick={() => setCartOpen(false)}
                                                >Check out</Link>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <p className={classes.CartEmpty}>Your Cart Is empty.</p>
                                    </>
                                }

                            </div>
                        </motion.div>
                    </>
                }
            </AnimatePresence>

        </>
    );
}

export default CartSlider;