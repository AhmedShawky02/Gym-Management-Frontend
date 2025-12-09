import { useEffect, useState } from "react";
import classes from "../our_trainers/OurTrainers.module.css"
import LoadingSpinner from "../../../../2-shared/components/LoadingSpinner/LoadingSpinner";
import type { ITrainerAndUserDto } from "../../../../2-shared/types/trainer";
const API_URL = import.meta.env.VITE_API_URL;
import Profile_Image from "../../../../3-assets/profile_image.png"
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const OurTrainers = () => {

    const [trainers, setTrainers] = useState<ITrainerAndUserDto[]>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch(`${API_URL}/api/public/trainers`);
                const data = await res.json();
                setTrainers(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPlans();
    }, []);

    return (
        <>
            <div id="Trainers" className={classes.Trainers_section}>
                <h2 className={classes.title}>
                    Meet Our <span className={classes.span_title}>Trainers</span>
                </h2>
                <p className={classes.suptitle}>
                    At this part you can see few of our expert trainers ready to guide you
                </p>

                {trainers.length > 0 ?
                    <>
                        <div className={classes.trainers_list}>
                            {trainers.slice(0, 4).map((trainer) => (
                                <div key={trainer.id} className={classes.trainer}>
                                    <div className={classes.trainer_image_Wrapper}>
                                        <img
                                            className={classes.trainer_image}
                                            src={trainer.user.profile_picture || Profile_Image}
                                            alt={trainer.user.name}
                                        />
                                    </div>
                                    <div className={classes.trainerData}>
                                        <h3 className={classes.trainer_name}>{trainer.user.name}</h3>
                                        <p className={classes.trainer_specialization}>
                                            {trainer.specialization}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link 
                            to={"/trainers"}
                        className={classes.btnViewAll}
                        >
                            
                            View All
                            <MdKeyboardArrowRight />
                        </Link>
                    </>
                    :
                    <>
                        <LoadingSpinner />
                    </>
                }

            </div>
        </>
    );
}

export default OurTrainers;