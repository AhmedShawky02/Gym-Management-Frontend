export interface ICreatePayment {
    id: number,
    user_id: number,
    package_id: number | null,
    booking_id: number | null,
    cart_id: number | null,
    amount: string,
    status_id: number,
    paymob_order_id: number | null,
    paid_at: Date | null,
}


export interface IPaymentLinkResponse {
    url: string;
    paymentData: ICreatePayment
}