import { Controller, Res } from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Body, Query } from "@nestjs/common";
import { Response } from "express";

import { v4 as uuidv4 } from 'uuid';

import { MercadoPagoService } from "src/application/services/MercadoPagoService";
import { Product } from "src/domain/models/Product";

@Controller('api/v1/mercadopago')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) { }

    @Get('/create-page')
    public async createPreference(
        @Query('name') name: string,
        @Query('price') price: number,
        @Query('quantity') quantity: number,
        @Query('currency') currency: string,
        @Res() res: Response,
    ): Promise<void> {
        try {
            const productId = uuidv4();
            const product = new Product(productId, name, Number(quantity), Number(price), currency);
            if (!product.isValid) {
                res.status(400).send('Invalid product data');
            }
            const init_point = await this.mercadoPagoService.createPreferenceImpl(product);
            res.status(200).send(`<a href=${init_point}> Comprar Producto </a>`)
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @Get('/success')
    public success(@Res() res: Response): void {
        res.status(200).send('Payment Success');
    }

    @Post('/notification')
    public async notification(@Query() query: any, @Res() res: Response): Promise<void> {
        try {
            console.log(query);
            const topic = query.topic || query.type;
            console.log(topic);
            switch (topic) {
                case 'payment':
                    const paymentId = query['data.id'];
                    const payment = await this.mercadoPagoService.getPaymentOrderImpl(paymentId);
                    console.log(payment);
                    break;
                case 'merchant_order':
                    const merchantOrderId = query.id;
                    const result = await this.mercadoPagoService.getMerchantOrderImpl(merchantOrderId as string);
                    console.log(result);
                    break;
                default:
                    break;
            }
            res.status(200).send('Notification received');
        } catch (error) {
            res.status(500).send(error);
        }
    }
}