export interface ITrainerAndUserDto {
    id: number;
    bio: string | null;
    specialization: string;
    experience_years: number;
    private_monthly_price: string;

    user: {
        id: number;
        name: string;
        date_of_birth: Date | null;
        gender: string;
        profile_picture: string | null;
    };
}
