import { GetPaymentDetailsUseCase } from "src/payments/domain/ports/in/GetPaymentDetailsUseCase";
import { MercadoPagoRepositoryPort } from "src/payments/domain/ports/out/MercadoPagoRepositoryPort";
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