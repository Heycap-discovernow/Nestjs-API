import { ProductDTO } from "src/domain/dtos/ProductDTO";
import { CreatePreferenceUseCase } from "src/domain/ports/in/MercadoPagoUseCases";
import { MercadoPagoRepositoryPort } from "src/domain/ports/out/MercadoPagoRepositoryPort";

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