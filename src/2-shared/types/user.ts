import type { BackendError } from "./error.api";

export interface IUserDto {
    id: number;
    fullName: string;
    email: string;
    createdDate: string | null;
    gender: string;
    date_of_birth: Date | null
    profile_picture?: string;
}

export interface IUserTrainerDto {
    id: number;
    fullName: string;
    email: string;
    createdDate: string | null;
    gender: string;
    profile_picture?: string;
    date_of_birth: Date | null
    trainerInfo?: {
        trainer_Id: number;
        bio: string | null;
        specialization: string | null;
        experience_years: number | null;
        private_monthly_price: string
    };
}

export interface UserActionResult {
    data: IUserDto | null;
    errors: BackendError;
}