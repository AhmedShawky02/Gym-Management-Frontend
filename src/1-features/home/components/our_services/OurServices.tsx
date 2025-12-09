import classes from "../our_services/OurServices.module.css"
import services_1 from "../../../../3-assets/our-services-1.png"
import services_2 from "../../../../3-assets/our-services-2.png"
import services_3 from "../../../../3-assets/our-services-3.png"
import services_4 from "../../../../3-assets/our-services-4.png"

const OurServices = () => {
    return (
        <>
            <div id="Services" className={classes.Services_section}>
                <h2>our <span>Services</span></h2>
                <p>At This Part You Can Easily access all of our servises. take a look at them and chose wich ever you want.</p>
                <div className={classes.images}>
                    <div className={classes.imageWrapper}>
                        <img src={services_1} alt="services_1" />
                    </div>
                    <div className={classes.imageWrapper}>
                        <img src={services_2} alt="services_2" />
                    </div>
                    <div className={classes.imageWrapper}>
                        <img src={services_3} alt="services_3" />
                    </div>
                    <div className={classes.imageWrapper}>
                        <img src={services_4} alt="services_4" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurServices;