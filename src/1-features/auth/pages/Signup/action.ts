import type { ActionFunctionArgs } from "react-router-dom"
import type { BackendError } from "../../../../2-shared/types/error.api"
import type { SignupActionResult } from "../../../../2-shared/types/auth"

const API_URL = import.meta.env.VITE_API_URL

export async function action({ request }: ActionFunctionArgs): Promise<SignupActionResult> {

    const formdata = await request.formData()

    const dataSend = {
        first_name: formdata.get("first_name"),
        middle_name: formdata.get("middle_name"),
        last_name: formdata.get("last_name"),
        date_of_birth: formdata.get("date_of_birth"),
        password_hash: formdata.get("password_hash"),
        email: formdata.get("email"),
        gender_type_id: Number(formdata.get("gender_type_id"))
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataSend)
    })

    if (response.status === 400) {
        const errorData: BackendError = await response.json();
        return { error: errorData };
    }

    if (!response.ok) {
        const errorData: BackendError = await response.json();
        return { error: errorData };
    }
    
    return { error: null };
}