import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export interface GetPaymentDetailsUseCase {
    getPaymentOrderImpl(payment_id: string): Promise<PaymentResponse>;
}