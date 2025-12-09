export interface ISupplementDto {
    id: number;
    name: string;
    description: string;
    image_url: string;
    capacity: number;
    price: string;
    created_at: Date | null;
    remaining_quantity: number;
    UserQuantity?: number
}

export interface ISupplementFromCartDto {
    CartId?: number,
    id: number,
    name: string,
    price: number,
    quantity: number,
    image: string,
}

export interface supplementLoaderType {
    supplementData: ISupplementDto | null,
    error: string | null
}