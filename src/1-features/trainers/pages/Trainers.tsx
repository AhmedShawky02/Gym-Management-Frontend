import { useEffect, useState } from "react";
import classes from "./Trainers.module.css"
import type { ITrainerAndUserDto } from "../../../2-shared/types/trainer";
const API_URL = import.meta.env.VITE_API_URL

import TrainerImageIFNotFound from "../../../3-assets/TrainerImageIFNotFound.png"

const Trainers = () => {

    const [trainers, setTrainers] = useState<ITrainerAndUserDto[]>([]);
    const [allTrainers, setAllTrainers] = useState<ITrainerAndUserDto[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState("");

    const [sortBy, setSortBy] = useState<"Nutrition" | "Strength Training" | "Cardio Training" | "Flexibility & Mobility" | "">("");

    // Fetch Trainers
    useEffect(() => {
        const trainersFetch = async () => {
            try {
                const res = await fetch(`${API_URL}/api/public/trainers`);
                if (!res.ok) {
                    throw new Error("Failed to load products");
                }
                const data = await res.json();
                setTrainers(data)
            } catch (err) {
                const error = err as Error
                console.log(error.message)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }

        trainersFetch()
    }, [])

    // Search
    useEffect(() => {
        if (searchTerm.trim() !== "") {
            setLoading(true)
            const delay = setTimeout(() => {
                let filtered = trainers.filter((i) =>
                    i.user.name.toLowerCase().includes(searchTerm.toLowerCase())
                );

                setAllTrainers(filtered)
                setLoading(false)
            }, 300);


            return () => clearTimeout(delay);

        } else {
            setAllTrainers(trainers)
        }
    }, [trainers, searchTerm])

     // Sort by
    useEffect(() => {
        if (sortBy) {
            setAllTrainers(
                trainers.filter((i) =>
                    i.specialization.toLowerCase() === sortBy.toLowerCase()
                )
            );
        } else {
            setAllTrainers(trainers);
        }
    }, [trainers, sortBy]);

    return (
        <>
            <div className={classes.container}>
                <div className={classes.SearchAndSort}>
                    <div className={classes.search}>
                        <input type="text"
                            placeholder="Search for any Coach..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className={classes.sort}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                        >
                            <option value="">Sort by Specialization</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Strength Training">Strength Training</option>
                            <option value="Cardio Training">Cardio Training</option>
                            <option value="Flexibility & Mobility">Flexibility & Mobility</option>
                        </select>
                    </div>
                </div>
                <div
                    className={`${classes.TrainersSection} ${allTrainers && allTrainers.length < 3 ? classes.centered : ""}`}
                >
                    {(allTrainers && allTrainers?.length > 0) ?
                        <>
                            {allTrainers.map((trainer) => (
                                <div key={trainer.id} className={classes.TrainerCard}>
                                    <img
                                        src={trainer.user.profile_picture || TrainerImageIFNotFound}
                                        alt={trainer.user.name}
                                        className={classes.TrainerImage}
                                    />
                                    <div className={classes.TrainerInfo}>
                                        <h3>C. {trainer.user.name}</h3>
                                        <p className={classes.Specialization}>
                                            {trainer.specialization}
                                        </p>
                                        <p>Experience: {trainer.experience_years} years</p>
                                        <div className={classes.LinksBtn}>
                                            <button>Booking Now</button>
                                            <button>Learn More</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                        :
                        <>
                            {loading ?
                                <p className={classes.loading}>Loading trainers...</p>
                                : <p className={classes.error}>We couldn't find any trainers matching your search. ( {searchTerm} )</p>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default Trainers;

{/* {trainer.bio && <p className={classes.Bio}>{trainer.bio}</p>}
                        <p className={classes.Price}>
                            <RiMoneyDollarCircleFill />
                            {trainer.private_monthly_price} / month
                        </p> */}