import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { ProductDTO } from "src/payments/domain/dtos/ProductDTO";

export interface MercadoPagoRepositoryPort {
    createPreferences(product: ProductDTO): Promise<string>;
    getPaymentOrder(id_payment: string): Promise<PaymentResponse>;
    getMerchantOrder(id_order: string): Promise<MerchantOrderResponse>;
}