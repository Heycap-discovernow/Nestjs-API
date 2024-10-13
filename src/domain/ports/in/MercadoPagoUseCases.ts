//this file is for define the use cases and meet the single responsibility principle
import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { ProductDTO } from "src/domain/dtos/ProductDTO";

export interface CreatePreferenceUseCase {
    createPreferenceImpl(productData: ProductDTO): Promise<string>;
}

export interface GetPaymentDetailsUseCase {
    getPaymentOrderImpl(payment_id: string): Promise<PaymentResponse>;
}

export interface GetOrderDetailsUseCase {
    getMerchantOrderImpl(order_id: string): Promise<MerchantOrderResponse>;
}