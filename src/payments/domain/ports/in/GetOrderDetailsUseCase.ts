import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";

export interface GetOrderDetailsUseCase {
    getMerchantOrderImpl(order_id: string): Promise<MerchantOrderResponse>;
}