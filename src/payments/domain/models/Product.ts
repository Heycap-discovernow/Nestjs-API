import { IsString, IsInt, IsNumber, IsPositive, Min, Max, Length, } from "class-validator";
import { v4 as uuidv4 } from 'uuid';

export class Product {
    @IsString()
    public productId: string;

    @Length(1, 200)
    public title: string;

    @IsInt()
    @Min(1)
    @Max(10)
    public quantity: number

    @IsNumber()
    @IsPositive()
    public unitPrice: number;

    @IsString()
    public currencyId: string

    constructor(title: string, quantity: number, unitPrice: number, currencyId: string) {
        this.title = title;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.currencyId = currencyId;
    }

    public generate(): void {
        this.productId = uuidv4();
    }

    public total(): number {
        return this.unitPrice * this.quantity;
    }
}