import { ProductDTO } from "src/payments/domain/dtos/ProductDTO";
import { CreatePreferenceUseCase } from "src/payments/domain/ports/in/CreatePreferenceUseCase";
import { MercadoPagoRepositoryPort } from "src/payments/domain/ports/out/MercadoPagoRepositoryPort";

import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreatePreferenceUseCaseImpl implements CreatePreferenceUseCase {
    constructor(
        @Inject('MercadoPagoRepositoryPort') private readonly mercadoPagoService: MercadoPagoRepositoryPort
    ){}

    public async createPreferenceImpl(productData: ProductDTO): Promise<string> {
        return this.mercadoPagoService.createPreferences(productData);
    }
}