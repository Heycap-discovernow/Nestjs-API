import { ProductDTO } from "src/payments/domain/dtos/ProductDTO";

export interface CreatePreferenceUseCase {
    createPreferenceImpl(productData: ProductDTO): Promise<string>;
}