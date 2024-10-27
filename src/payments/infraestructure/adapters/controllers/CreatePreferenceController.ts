import { API_VERSION } from "src/config";

import { Product } from "src/payments/domain/models/Product";
import { MercadoPagoService } from "src/payments/application/services/MercadoPagoService";

import { BaseResponse } from "src/payments/application/dtos/BaseResponse";

import { Controller, Get, Query, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { validateOrReject } from "class-validator";

@Controller(`api/${API_VERSION}/mercadopago`)
export class CreatePreferenceController {
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
            const product = new Product(name, Number(quantity), Number(price), currency)
            product.generate();
            await validateOrReject(product)
            const init_point = await this.mercadoPagoService.createPreferenceImpl(product);
            res.status(200).send(`<a href=${init_point}> Comprar Producto </a>`)
        } catch (error) {
            const response = new BaseResponse(null, false, 'Error creating product', error);
            res.status(HttpStatus.BAD_REQUEST).send(response.toResponseEntity());
        }
    }
}