import { API_VERSION } from 'src/config';

import { MercadoPagoService } from 'src/payments/application/services/MercadoPagoService';

import { Controller, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller(`api/${API_VERSION}/mercadopago`)
export class NotificationController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) { }

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