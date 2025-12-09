import { FaCapsules, FaDumbbell, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FiHome, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { IoMdLogIn } from "react-icons/io";
import { Link, useRouteLoaderData } from "react-router-dom";
import classes from "../../../components/navbar/main/Navbar.module.css";
import logo from "../../../../3-assets/iron_zone_logo.png";
import { useEffect, useState } from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import DropDownList from "../dropDownList/DropDownList";
import { CgProfile } from "react-icons/cg";
import { useCart } from "../../../../1-features/cart/components/CartContext";


function Navbar() {
    const token = useRouteLoaderData("root")

    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const { guestCart, setCartOpen, cartOpen, userCart } = useCart();

    let allItemQuantity = token
        ? userCart.reduce((acc, current) => acc + Number(current.quantity), 0)
        : guestCart.reduce((acc, current) => acc + Number(current.UserQuantity), 0);

    useEffect(() => {
        if (menuOpen) {
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
    }, [menuOpen]);

    const hanelCartButton = () => {
        setCartOpen(!cartOpen)
    }


    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <Link to="/" className={classes.logoLink}>
                        <img src={logo} alt="logo" />
                        <strong>IRON ZONE</strong>
                    </Link>
                </div>

                {menuOpen && <div className={classes.overrideMenuOpenBlack} onClick={() => setMenuOpen(false)}></div>}
                <nav className={classes.nav}>
                    <ul className={`${classes.navbar_menu} ${menuOpen ? classes.open : ""}`} >
                        <li>
                            <Link to="/" className={classes.navbar_link}
                                onClick={() => setMenuOpen(false)}
                            >
                                <FiHome className={classes.icon} />
                                <span>Home</span>
                            </Link>
                        </li>

                        <li>
                            <DropDownList
                                label="Services"
                                Icon={{ Icon: GiWeightLiftingUp, fontSize: 30 }}
                                Links={[
                                    { To: "/trainers", Icon: { Icon: FaUsers, fontSize: 25 }, Label: "Trainers", onClick: () => setMenuOpen(false) },
                                    { To: "/2", Icon: { Icon: FaDumbbell, fontSize: 25 }, Label: "Classes", onClick: () => setMenuOpen(false) },
                                    { To: "/supplement", Icon: { Icon: FaCapsules, fontSize: 25 }, Label: "Supplements", onClick: () => setMenuOpen(false) },
                                ]}
                            />
                        </li>

                        {!token && (
                            <>
                                <li>
                                    <Link to="auth/login" className={classes.navbar_link}>
                                        <IoMdLogIn className={classes.icon} />
                                        <span>Login</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        {token && (
                            <>
                                <li>
                                    <DropDownList
                                        label="Account"
                                        Icon={{ Icon: CgProfile, fontSize: 30 }}
                                        Links={[
                                            { To: "/user", Icon: { Icon: CgProfile, fontSize: 25 }, Label: "My Profile", onClick: () => setMenuOpen(false) },
                                            { To: "/logout", Icon: { Icon: FiLogOut, fontSize: 25 }, Label: "Logout", onClick: () => setMenuOpen(false), Form: { isForm: true, FormAction: "/logout", method: "post" } },
                                        ]}
                                    />
                                </li>

                            </>
                        )}

                        <li>
                            <div className={classes.CartContainer}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                }}
                            >
                                <button
                                    onClick={hanelCartButton}
                                    className={classes.Cart}
                                >
                                    <FaShoppingCart className={classes.icon} />
                                    <span>Cart</span>
                                    {allItemQuantity > 0 && <p className={classes.allItemQuantity}>{allItemQuantity}</p>}
                                </button>
                            </div>
                        </li>

                    </ul>

                    <button
                        className={classes.burger}
                        onClick={() => { setMenuOpen(!menuOpen), window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                        {menuOpen ? <FiX className={classes.IconX} /> : <FiMenu className={classes.Icon} />}
                    </button>
                </nav>
            </header >
        </>
    );
}

export default Navbar;
