import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import classes from "../components/EditForm.module.css"
import { FiCalendar } from "react-icons/fi";
import { RiImageAiLine } from "react-icons/ri";
import React, { useState } from "react";
import { MdCancel, MdDoneOutline } from "react-icons/md";
import { getToken } from "../../../2-shared/auth/tokenLoader";
import type { IUserDto, IUserTrainerDto, UserActionResult } from "../../../2-shared/types/user";

const EditForm =
    ({ user, setIsEdit }:
        {
            user: IUserDto | IUserTrainerDto | null,
            setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
        }
    ) => {
        if (!user?.fullName) {
            return null
        }

        const parts = user.fullName.trim().split(" ").filter(Boolean);
        const first_name = parts[0] || "";
        const middle_name = parts.length > 2 ? parts.slice(1, parts.length - 1).join(" ") : parts[1] || "";
        const last_name = parts.length > 1 ? parts[parts.length - 1] : "";

        const navigation = useNavigation()
        const isSubmitting = navigation.state === "submitting";

        const formatDateForInput = (date: Date | null) => {
            if (!date) return "";
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const actionData: UserActionResult | undefined = useActionData()
        const navigate = useNavigate();


        const [showErrors, setShowErrors] = useState(false)
        const [preview, setPreview] = useState<string | undefined>();
        const [formData, setFormData] = useState({
            first_name,
            middle_name,
            last_name,
            date_of_birth: formatDateForInput(user.date_of_birth),
            gender_type_id: user.gender,
            profile_picture: user.profile_picture
        })

        const [showMessage, setShowMessage] = useState(false);
        function handleSaveClick(event: React.MouseEvent<HTMLButtonElement>) {
            event.preventDefault();
            setShowErrors(!showErrors)
            const token = getToken();

            if (!token) {

                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false);
                    setIsEdit(false)
                    navigate("/auth/login");
                }, 2000);

                return
            }

            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false);
                setIsEdit(false)
                navigate(`/user`);
            }, 2000);
        }

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        };

        const handleCancel = () => {
            setIsEdit(false);
            setShowErrors(!showErrors)
        };

        const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }

        return (
            <>
                <div className={classes.form}>
                    <Form method="PUT" action="/user" encType="multipart/form-data">
                        <div className={classes.groupImage}>
                            <input
                                type="file"
                                name="profile_picture"
                                id="profile_picture"
                                accept="image/*"
                                className={classes.fileInput}
                                onChange={handleImageChange}
                            />

                            {preview ? (
                                <div className={classes.imageContainer}>
                                    <label
                                        htmlFor="profile_picture"
                                    >
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className={classes.previewImage}
                                        />
                                        <RiImageAiLine className={classes.AddImageIcon} size={30} />
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <div className={classes.imageContainer}>

                                        <label
                                            htmlFor="profile_picture"
                                        >
                                            <img
                                                src={formData.profile_picture}
                                                alt="Preview"
                                                className={classes.previewImage}
                                            />
                                            <RiImageAiLine className={classes.AddImageIcon} size={30} />
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className={classes.group}>
                            <input className={classes.input}
                                name="first_name"
                                placeholder=" "
                                value={formData.first_name}
                                onChange={(e) => handelChange(e)}
                                required />

                            <label className={classes.label}>First Name</label>
                        </div>

                        <div className={classes.group}>
                            <input className={classes.input}
                                name="middle_name"
                                placeholder=" "
                                value={formData.middle_name}
                                onChange={(e) => handelChange(e)}
                                required
                            />
                            <label className={classes.label}>Middle Name</label>
                        </div>

                        <div className={classes.group}>
                            <input className={classes.input}
                                name="last_name"
                                placeholder=" "
                                value={formData.last_name}
                                onChange={(e) => handelChange(e)}
                                required
                            />
                            <label className={classes.label}>Last Name</label>
                        </div>

                        <div className={classes.group}>
                            <input className={`${classes.input} ${classes.dateInput}`}
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={(e) => handelChange(e)}
                                placeholder=" "
                                required
                            />
                            <span className={classes.iconCalendar}><FiCalendar /></span>
                        </div>

                        <div className={classes.radioGroup}>
                            <label className={classes.radioLabel}>
                                <input
                                    type="radio"
                                    name="gender_type_id"
                                    value="1"
                                    defaultChecked={user.gender === "male"}
                                    required
                                />
                                Male
                            </label>

                            <label className={classes.radioLabel}>
                                <input
                                    type="radio"
                                    name="gender_type_id"
                                    value="2"
                                    defaultChecked={user.gender !== "male"}
                                    required
                                />
                                Female
                            </label>
                        </div>

                        <div className={classes.btnsContainer}>
                            <button
                                className={classes.cancelBtn}
                                onClick={handleCancel}
                            >
                                <MdCancel />
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className={classes.saveBtn}
                                disabled={isSubmitting}
                                onClick={(e) => handleSaveClick(e)}
                            >
                                {isSubmitting ? "Saving..." :
                                    <>
                                        <MdDoneOutline />
                                        Save
                                    </>}
                            </button>
                        </div>

                    </Form>

                    {showErrors && actionData && actionData?.errors && Array.isArray(actionData.errors) &&
                        <div className={classes.errors}>
                            <ul>
                                {actionData.errors.map((err, index) => (
                                    <li key={index}>{err.msg}</li>
                                ))}
                            </ul>
                        </div>
                    }

                    {showErrors && actionData?.errors && typeof actionData?.errors === "string" && (
                        <p className={classes.errorMessage}>{actionData.errors}</p>
                    )}

                    {showMessage &&
                        <div className={classes.containerMessage}>
                            <div className={classes.showMessage}>
                                <p>Changes saved successfully!</p>
                                <div className={classes.progressBar}>
                                    <div className={classes.progress}></div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }

export default EditForm;