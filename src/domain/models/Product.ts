export class Product {
    constructor(
        public productId: string,
        public title: string,
        public quantity: number,
        public unitPrice: number,
        public currencyId: string
    ){}

    public isValid(): boolean {
        return this.title != '' && this.unitPrice > 0 && this.quantity > 0;
    }

    public totalPlace(): number {
        return this.unitPrice * this.quantity;
    }
}