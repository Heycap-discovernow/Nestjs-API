import { Module } from '@nestjs/common';
import { MercadoPagoController } from '../adapters/controllers/mercadopago/MercadoPagoController';
import { MercadoPagoService } from 'src/application/services/MercadoPagoService';

import { CreatePreferenceUseCaseImpl } from 'src/application/usecases/mercadopago/CreatePreferenceUseCaseImpl';
import { GetPaymentDetailsUseCaseImpl } from 'src/application/usecases/mercadopago/GetPaymentDetailsUseCaseImpl';
import { GetMerchantDetailsUseCaseImpl } from 'src/application/usecases/mercadopago/GetMerchantDetailsUseCaseImpl';
import { MercadoPagoRepositoryAdapter } from '../adapters/repositories/MercadoPagoRepositoryAdapter';

@Module({
    controllers: [MercadoPagoController],
    providers: [MercadoPagoService,
        {
            provide: 'CreatePreferenceUseCase',
            useClass: CreatePreferenceUseCaseImpl
        },
        {
            provide: 'GetPaymentDetailsUseCase',
            useClass: GetPaymentDetailsUseCaseImpl
        },
        {
            provide: 'GetMerchantDetailsUseCase',
            useClass: GetMerchantDetailsUseCaseImpl
        },
        {
            provide: 'MercadoPagoRepositoryPort',
            useClass: MercadoPagoRepositoryAdapter
        }
     ],
})
export class MercadoPagoModule {}
