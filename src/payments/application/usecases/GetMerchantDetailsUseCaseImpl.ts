import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";
import { GetOrderDetailsUseCase } from "src/payments/domain/ports/in/GetOrderDetailsUseCase";
import { MercadoPagoRepositoryPort } from "src/payments/domain/ports/out/MercadoPagoRepositoryPort";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class GetMerchantDetailsUseCaseImpl implements GetOrderDetailsUseCase {
    constructor(
        @Inject('MercadoPagoRepositoryPort') private readonly mercadoPagoService: MercadoPagoRepositoryPort
    ){}

    public async getMerchantOrderImpl(order_id: string): Promise<MerchantOrderResponse> {
        return await this.mercadoPagoService.getMerchantOrder(order_id);
    }
}