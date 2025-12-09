import type { ActionFunctionArgs } from "react-router-dom";
import { fetchWithAuth } from "../../../2-shared/auth/fetchWithAuth";
import type { IUserDto, UserActionResult } from "../../../2-shared/types/user";

const API_URL = import.meta.env.VITE_API_URL;

export async function action({ request }: ActionFunctionArgs): Promise<UserActionResult> {
    const formData = await request.formData();

    const file = formData.get("profile_picture");
    const fileObj = file instanceof File ? file : null;

    const dataToSend = new FormData();
    dataToSend.append("first_name", formData.get("first_name") as string);
    dataToSend.append("middle_name", formData.get("middle_name") as string);
    dataToSend.append("last_name", formData.get("last_name") as string);
    dataToSend.append("date_of_birth", formData.get("date_of_birth") as string);
    dataToSend.append("gender_type_id", formData.get("gender_type_id") as string);

    if (fileObj && fileObj.size > 0) {
        dataToSend.append("profile_picture", fileObj);
    }

    try {
        const response = await fetchWithAuth(`${API_URL}/api/user/profile`, {
            method: "PUT",
            body: dataToSend,
        });

        if (response.status === 400) {
            const errorData = await response.json();
            return { data: null, errors: errorData };
        }

        if (!response.ok) {
            const errorData = await response.json();
            return { data: null, errors: errorData };
        }

        const data: IUserDto = await response.json();
        return { data, errors: null };
    } catch (err) {
        const errors = err as Error;
        console.log("Action errors:", errors.message);
        return { data: null, errors: errors.message || "Something went wrong..." }
    }
}
