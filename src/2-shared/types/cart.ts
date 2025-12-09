export interface ICartItemDto {
    id: number,
    cart: {
        id: number,
        userId: number
    },
    product_id: number
    product_type: string
    quantity: number,
    created_at: Date | null
    productDetails?: {
        id: number,
        name: string,
        price: string,
        description: string,
        image_url: string
    }
}