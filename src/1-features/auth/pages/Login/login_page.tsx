import { Form, Link, useActionData, useNavigate, useNavigation } from "react-router-dom"
import classes from "../Login/index.module.css"
import logo from "../../../../3-assets/iron_zone_logo.png"
import type { LoginActionResult } from "../../../../2-shared/types/auth";
import { useCart } from "../../../cart/components/CartContext";
import { useEffect } from "react";


function LoginPage() {
    const data = useActionData() as LoginActionResult
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const navigate = useNavigate();
    const { setGuestCart, setUserCart } = useCart()

    useEffect(() => {
        if (data?.cart) {
            setUserCart(data.cart)
            setGuestCart([])
        }
        if (data?.redirectTo) {
            navigate(data.redirectTo)
        }
    }, [data])

    return (
        <>
            <div className={classes.container}>
                <div className={classes.main}>
                    <div className={classes.form}>
                        <img className={classes.logo} src={logo} alt="" />
                        <h2 className={classes.text}>Welcome!</h2>

                        <div className={classes.errors}>
                            {data && data.error && Array.isArray(data.error) &&
                                <ul>
                                    {data.error.map((err, index) => (
                                        <li key={index}>{err.msg}</li>
                                    ))}
                                </ul>
                            }

                            {data && typeof data.error === "string" && (
                                <p className={classes.errorMessage}>{data.error}</p>
                            )}
                        </div>

                        <Form method="POST">

                            <div className={classes.group}>
                                <input className={classes.input}
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    required />
                                <label className={classes.label}>Email</label>
                            </div>

                            <div className={classes.group}>
                                <input className={classes.input}
                                    type="password"
                                    name="password"
                                    placeholder=" "
                                    required
                                />
                                <label className={classes.label}>Password</label>
                            </div>

                            <button className={classes.btn} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                        <div className={classes.signup}>
                            <p>Still don't hace an account?</p>
                            <Link to="/auth/signup">Regiser now</Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LoginPage