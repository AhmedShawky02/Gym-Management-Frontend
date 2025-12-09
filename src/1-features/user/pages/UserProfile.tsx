import { useLoaderData } from "react-router-dom";
import classes from "../pages/UserProfile.module.css"
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import EditForm from "../components/EditForm";
import type { IUserDto, IUserTrainerDto } from "../../../2-shared/types/user";

const UserProfile = () => {
    const data = useLoaderData();
    const { userData, error }: { userData: IUserDto | IUserTrainerDto | null, error: string | null } = data;
    const [isEdit, setIsEdit] = useState(false);

    if (!userData) {
        return <p className={classes.error}>{error || "No user data available"}</p>;
    }

    console.log(userData)

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.card}>
                    <div className={classes.header}>
                        <img
                            src={userData.profile_picture}
                            alt={userData.fullName}
                            className={classes.avatar}
                        />
                        <div>
                            <h2 className={classes.name}>{userData.fullName}</h2>
                            <p className={classes.sub}>ID: {userData.id}</p>
                        </div>
                    </div>

                    <div className={classes.details}>
                        <p><span>Email:</span> {userData.email}</p>
                        <p><span>Gender:</span> {userData.gender}</p>
                        <p><span>Joined:</span> {" "}
                            {userData.createdDate && new Date(userData.createdDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <p>
                            <span>Date Of Birth:</span>{" "}
                            {userData.date_of_birth && new Date(userData.date_of_birth).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <button
                        onClick={() => setIsEdit(!isEdit)}
                        className={classes.editBtn}
                    >
                        <BiPencil size={16} />
                        <span>Edit Profile</span>
                    </button>


                </div>
                {isEdit && (
                    <>
                        <div className={classes.overlayForm}></div>
                        <div className={classes.containerForm}>
                            <EditForm user={userData} setIsEdit={setIsEdit} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default UserProfile;