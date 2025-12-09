import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/main/Navbar"
import CartSlider from "../../1-features/cart/pages/CartSlider"

function RootLayout() {
    return (
        <>
            <Navbar />
            <CartSlider />
            <Outlet />

        </>
    )
}

export default RootLayout