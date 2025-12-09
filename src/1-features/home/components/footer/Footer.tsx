import classes from "./Footer.module.css"
import logo from "../../../../3-assets/iron_zone_logo.png"
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div className={classes.Footer_section}>
                <div className={classes.container}>
                    <div className={classes.description}>
                        <div className={classes.descData}>
                            <div className={classes.logoData}>
                                <img src={logo} alt="logo" />
                                <strong>IRON ZONE</strong>
                            </div>
                            <p>Transform Your Body</p>
                        </div>
                        <p className={classes.descTitle}>Transform Your Body with IronZone, Your Trusted Partner in Fitness. With Over <span> 5 Years</span> of Experience, We Offer Expert Coaching, Tailored Workout Plans, and Comprehensive Nutritional Guidance. <span>Join Our Community</span> and Start Your Journey Towards a Healthier, Stronger You. Ready to Make a Change?</p>
                        <div className={classes.links}>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaXTwitter /></a>
                            <a href="#"><FaYoutube /></a>
                        </div>
                    </div>
                    <div className={classes.CompanyContactContainer}>

                        <div className={classes.Company}>
                            <h2>Company</h2>
                            <div className={classes.CompanyData}>
                                <a href="#Main"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const section = document.getElementById("Main");
                                        if (section) {
                                            const top =
                                                section.getBoundingClientRect().top + window.scrollY;
                                            window.scrollTo({ top, behavior: "smooth" });
                                        }
                                    }}>
                                    Main
                                </a>
                                <a href="#Achievement"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const section = document.getElementById("Achievement");
                                        if (section) {
                                            const top =
                                                section.getBoundingClientRect().top + window.scrollY;
                                            window.scrollTo({ top, behavior: "smooth" });
                                        }
                                    }}>
                                    Achievement
                                </a>
                                <a href="#Services"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const section = document.getElementById("Services");
                                        if (section) {
                                            const top =
                                                section.getBoundingClientRect().top + window.scrollY;
                                            window.scrollTo({ top, behavior: "smooth" });
                                        }
                                    }}>
                                    Services
                                </a>
                                <a href="#Plans"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const section = document.getElementById("Plans");
                                        if (section) {
                                            const top =
                                                section.getBoundingClientRect().top + window.scrollY;
                                            window.scrollTo({ top, behavior: "smooth" });
                                        }
                                    }}>
                                    Plans
                                </a>
                                <a href="#Trainers"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const section = document.getElementById("Trainers");
                                        if (section) {
                                            const top =
                                                section.getBoundingClientRect().top + window.scrollY;
                                            window.scrollTo({ top, behavior: "smooth" });
                                        }
                                    }}>
                                    Trainers
                                </a>
                                <a href="#FAQ"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const section = document.getElementById("FAQ");
                                        if (section) {
                                            const top =
                                                section.getBoundingClientRect().top + window.scrollY;
                                            window.scrollTo({ top, behavior: "smooth" });
                                        }
                                    }}>
                                    FAQ
                                </a>
                            </div>
                        </div>
                        <div className={classes.Contact}>
                            <h2>Contact Us</h2>
                            <div className={classes.ContactData}>
                                <p><FaMapMarkerAlt className={classes.ContactIcon} /> usa - Washington DC</p>
                                <p><FaPhoneAlt className={classes.ContactIcon} /> 1234-56789</p>
                                <p><FaEnvelope className={classes.ContactIcon} /> IronZone12@Gmail.com</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Footer;