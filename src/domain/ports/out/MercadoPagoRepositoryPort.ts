import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { ProductDTO } from "src/domain/dtos/ProductDTO";

// This is the interface that defines all operations that the application waits from external services
export interface MercadoPagoRepositoryPort {
    createPreferences(product: ProductDTO): Promise<string>;
    getPaymentOrder(id_payment: string): Promise<PaymentResponse>;
    getMerchantOrder(id_order: string): Promise<MerchantOrderResponse>;
}