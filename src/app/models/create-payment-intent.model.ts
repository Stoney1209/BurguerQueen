export interface ICreatePaymentIntent {
    secretKey: string
    amount: number
    currency: string
    customer_id: string
}