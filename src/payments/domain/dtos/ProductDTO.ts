export class ProductDTO {
    constructor(
        public productId: string,
        public title: string,
        public quantity: number,
        public unitPrice: number,
        public currencyId: string,
    ){}
}