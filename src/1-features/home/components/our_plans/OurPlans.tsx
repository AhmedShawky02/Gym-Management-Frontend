import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import classes from "../our_plans/OurPlans.module.css";
import LoadingSpinner from "../../../../2-shared/components/LoadingSpinner/LoadingSpinner";
import type { IPackageDto } from "../../../../2-shared/types/plan";

const API_URL = import.meta.env.VITE_API_URL;

const featuresMap: Record<number, string[]> = {
    1: [
        "Access to all gym equipment",
        "Unlimited online classes",
        "1 free personal trainer session",
        "Locker room & shower access",
        "Free fitness assessment",
        "Nutrition tips and meal plans",
        "Basic progress tracking"
    ],
    4: [
        "All Basic Plan features",
        "Weekly progress tracking",
        "5 free guest passes",
        "Access to advanced workout programs",
        "Monthly body composition analysis",
        "Exclusive group workshops",
        "Discounts on supplements & merchandise"
    ],
    5: [
        "All Standard Plan features",
        "Monthly nutrition consultation",
        "Priority booking for classes",
        "Dedicated progress coach check-in",
        "Extended gym hours access",
        "Exclusive training events",
        "Customized workout roadmap"
    ]
};

const OurPlans = () => {

    const [plans, setPlans] = useState<IPackageDto[]>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch(`${API_URL}/api/user/packages`);
                const data = await res.json();
                setPlans(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPlans();
    }, []);

    return (
        <div id="Plans" className={classes.Plans_section}>
            <h2 className={classes.title}>
                our <span className={classes.span_title}>Plans</span>
            </h2>
            <p className={classes.suptitle}>
                Select the plan that suits your fitness goals and let our expert coaches guide you every step of the way.
            </p>

            {plans.length > 0 ?
                <>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={30}
                        centeredSlides={false}
                        loop={false}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            848: { slidesPerView: 2 },
                            1243: { slidesPerView: 3 },
                        }}
                    >
                        {
                            [...Array(2)].flatMap((_, i) => (

                                plans.map((plan) => (
                                    <SwiperSlide key={plan.id + "_" + i}>
                                        <div className={classes.plan}>
                                            <p className={classes.staticTitle}>Package</p>
                                            <h2 className={classes.plan_title}>{plan.name}</h2>
                                            <p className={classes.staticTitle}>Description</p>
                                            <p className={classes.plan_suptitle}>{plan.description}</p>
                                            <p className={classes.staticTitle}>Features</p>
                                            <ul>
                                                {featuresMap[plan.id]?.map((p, i) => (
                                                    <li key={i}>{p}</li>
                                                ))}
                                            </ul>
                                            <p className={classes.plan_price}>{plan.price}<span className={classes.span_Price}>/EGP</span></p>
                                            <button className={classes.plan_btn}>Choose This Plan</button>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ))
                        }
                    </Swiper>
                </>
                :
                <>
                    <LoadingSpinner />
                </>
            }

        </div>
    );
};

export default OurPlans;
