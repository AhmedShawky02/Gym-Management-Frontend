import { useActionData, useNavigation, Form, Link } from "react-router-dom"
import classes from "../Signup/index.module.css"
import logo from "../../../../3-assets/iron_zone_logo.png"
import { FiCalendar, FiEye, FiEyeOff } from "react-icons/fi"
import { useState } from "react"
import type { SignupActionResult } from "../../../../2-shared/types/auth"

function SignupPage() {
    const data = useActionData() as SignupActionResult
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";
    const [showPassword, setShowPassword] = useState(false);

    function changeType() {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <div className={classes.container}>

                <div className={data ? classes.mainAuto : classes.main}>
                    <div className={classes.form}>
                        <img className={classes.logo} src={logo} alt="" />

                        <Form className={classes.mainForm} method="POST">

                            <div className={classes.name_Data}>
                                <div className={classes.fullName}>
                                    <div className={classes.group}>
                                        <input className={classes.input}
                                            name="first_name"
                                            placeholder=" "
                                            required />

                                        <label className={classes.label}>First Name</label>
                                    </div>

                                    <div className={classes.group}>
                                        <input className={classes.input}
                                            name="middle_name"
                                            placeholder=" "
                                            required
                                        />
                                        <label className={classes.label}>Middle Name</label>
                                    </div>

                                    <div className={classes.group}>
                                        <input className={classes.input}
                                            name="last_name"
                                            placeholder=" "
                                            required
                                        />
                                        <label className={classes.label}>Last Name</label>
                                    </div>
                                </div>

                                <div className={classes.someData}>
                                    <div className={classes.group}>
                                        <input className={`${classes.input} ${classes.dateInput}`}
                                            type="date"
                                            name="date_of_birth"
                                            placeholder=" "
                                            required
                                        />
                                        <span className={classes.iconCalendar}><FiCalendar /></span>
                                        <label className={classes.label}>Date Of Birth</label>
                                    </div>

                                    <div className={classes.group}>
                                        <input className={classes.input}
                                            type="email"
                                            name="email"
                                            placeholder=" "
                                            required
                                        />
                                        <label className={classes.label}>Email</label>
                                    </div>

                                    <div className={classes.group}>
                                        <input className={classes.input}
                                            type={showPassword ? "text" : "password"}
                                            name="password_hash"
                                            placeholder=" "
                                            required
                                        />
                                        <label className={classes.label}>Password</label>

                                        <span className={classes.spanEye}
                                            onClick={changeType}>
                                            {showPassword ? <FiEye /> : <FiEyeOff />}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.radioContainer}>
                                <label className={classes.labelGender}>Gender</label>
                                <div className={classes.radioGroup}>
                                    <label className={classes.radioLabel}>
                                        <input
                                            type="radio"
                                            name="gender_type_id"
                                            value="1"
                                            required
                                        />
                                        Male
                                    </label>

                                    <label className={classes.radioLabel}>
                                        <input
                                            type="radio"
                                            name="gender_type_id"
                                            value="2"
                                            required
                                        />
                                        Female
                                    </label>
                                </div>
                            </div>

                            <button className={classes.btn} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Signing up..." : "Sign Up"}
                            </button>
                        </Form>

                        <div className={classes.login}>
                            <p>Already have an account?</p>
                            <Link to="/auth/login">Login now</Link>
                        </div>
                    </div>
                    {data && (
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

                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default SignupPage