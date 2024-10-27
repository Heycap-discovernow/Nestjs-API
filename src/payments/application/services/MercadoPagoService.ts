//this file is to define the use cases and meet the single responsibility principle and the dependency inversion principle
import { ProductDTO } from "src/payments/domain/dtos/ProductDto";
import { CreatePreferenceUseCase } from "src/payments/domain/ports/in/CreatePreferenceUseCase";
import { GetOrderDetailsUseCase } from "src/payments/domain/ports/in/GetOrderDetailsUseCase";
import { GetPaymentDetailsUseCase } from "src/payments/domain/ports/in/GetPaymentDetailsUseCase";

import { Injectable, Inject } from "@nestjs/common";
import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

@Injectable()
export class MercadoPagoService implements CreatePreferenceUseCase, GetOrderDetailsUseCase, GetPaymentDetailsUseCase {
    constructor(
       @Inject('CreatePreferenceUseCase') private readonly createPreferenceUseCase: CreatePreferenceUseCase,
       @Inject('GetPaymentDetailsUseCase') private readonly getOrderDetailsUseCase: GetOrderDetailsUseCase,
       @Inject('GetMerchantDetailsUseCase') private readonly getPaymentDetailsUseCase: GetPaymentDetailsUseCase
    ){}

    public createPreferenceImpl(productData: ProductDTO): Promise<string> {
        return this.createPreferenceUseCase.createPreferenceImpl(productData);
    }

    public getMerchantOrderImpl(order_id: string): Promise<MerchantOrderResponse> {
        return this.getOrderDetailsUseCase.getMerchantOrderImpl(order_id);
    }

    public getPaymentOrderImpl(payment_id: string): Promise<PaymentResponse> {
        return this.getPaymentDetailsUseCase.getPaymentOrderImpl(payment_id);
    }
}