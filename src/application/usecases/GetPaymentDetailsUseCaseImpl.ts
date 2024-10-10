import { GetPaymentDetailsUseCase } from "src/domain/ports/in/MercadoPagoUseCases";
import { MercadoPagoRepositoryPort } from "src/domain/ports/out/MercadoPagoRepositoryPort";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class GetPaymentDetailsUseCaseImpl implements GetPaymentDetailsUseCase {
    constructor(
        @Inject('MercadoPagoRepositoryPort') private readonly mercadoPagoService: MercadoPagoRepositoryPort
    ){}

    public async getPaymentOrderImpl(payment_id: string): Promise<PaymentResponse> {
        return await this.mercadoPagoService.getPaymentOrder(payment_id);
    }
}