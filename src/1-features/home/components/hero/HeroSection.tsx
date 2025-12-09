import classes from "../../../home/components/hero/HeroSection.module.css"
import photo from "../../../../3-assets/HeroGym.png"
import { Link } from "react-router-dom"

function HeroSection() {
    return (
        <>
            <div id="Main" className={classes.container}>
                <div className={classes.innerContainer}>
                    <div className={classes.data}>
                        <div className={classes.text}>
                            <div className={classes.title}>
                                <h2>achive your</h2>
                                <h1>fitness goals</h1>
                                <h2>with IronZone</h2>
                            </div>
                            <div className={classes.supTitle}>
                                <p>Join the IronZone community and take your fitness to the next level. Our expert coaches and custom programs are here to help you reach your goals and push beyond your limits. Ready to transform?</p>
                            </div>
                        </div>
                        <div className={classes.btns}>
                            <Link to="/offers">View Latest Offers</Link>
                            <Link to="/offers">Join IronZone Now</Link>
                        </div>
                    </div>
                    <div className={classes.image}>
                        <div className={classes.imageWrapper}>
                            <div className={classes.inerImage}>

                                <img className={classes.heroImage} src={photo} alt="hero" />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="Achievement" className={classes.someInfo}>
                    <div className={classes.info}>
                        <h3>96% <span>Client Satisfaction</span></h3>
                        <p>Our members love their results and experience</p>
                    </div>
                    <div className={classes.info}>
                        <h3>+5 <span>years of Experience</span></h3>
                        <p>Trust in our proven track record of transforming</p>
                    </div>
                    <div className={classes.info}>
                        <h3>+800 <span>Active Members</span></h3>
                        <p>Join our thriving fitness community</p>
                    </div>
                    <div className={classes.info}>
                        <h3>24/7 <span>Support Available</span></h3>
                        <p>Expert assistance whenever you need it</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection