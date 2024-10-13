import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";
import { GetOrderDetailsUseCase } from "src/domain/ports/in/MercadoPagoUseCases";
import { MercadoPagoRepositoryPort } from "src/domain/ports/out/MercadoPagoRepositoryPort";

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