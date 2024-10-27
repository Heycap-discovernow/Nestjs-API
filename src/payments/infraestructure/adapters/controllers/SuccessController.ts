import { API_VERSION } from 'src/config';

import { MercadoPagoService } from 'src/payments/application/services/MercadoPagoService';

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller(`api/${API_VERSION}/mercadopago`)
export class SuccessController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) { }

    @Get('/success')
    public success(@Res() res: Response): void {
        res.status(200).send('Payment Success');
    }
}