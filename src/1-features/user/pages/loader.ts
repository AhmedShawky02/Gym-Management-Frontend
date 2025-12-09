import { fetchWithAuth } from "../../../2-shared/auth/fetchWithAuth";
import type { IUserDto, IUserTrainerDto } from "../../../2-shared/types/user";

const API_URL = import.meta.env.VITE_API_URL;

type UserLoaderType = {
    userData: IUserDto | IUserTrainerDto | null,
    error: string | null
}

export async function loader(): Promise<UserLoaderType> {

    try {

        const res = await fetchWithAuth(`${API_URL}/api/user/profile`)

        if (!res.ok) throw new Error("Failed to fetch user data");

        const userData: IUserDto | IUserTrainerDto = await res.json();

        return { userData, error: null };

    } catch (err) {
        if (err instanceof Error) {
            return { userData: null, error: err.message };
        }
        return { userData: null, error: "Unknown error" };
    }
}