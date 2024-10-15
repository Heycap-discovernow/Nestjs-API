import { Module } from '@nestjs/common';

import { CreatePreferenceController } from 'src/payments/infraestructure/adapters/controllers/CreatePreferenceController';
import { SuccessController } from 'src/payments/infraestructure/adapters/controllers/SuccessController';
import { NotificationController } from 'src/payments/infraestructure/adapters/controllers/NotificationController';

import { MercadoPagoService } from 'src/payments/application/services/MercadoPagoService';
import { CreatePreferenceUseCaseImpl } from 'src/payments/application/usecases/CreatePreferenceUseCaseImpl';
import { GetPaymentDetailsUseCaseImpl } from 'src/payments/application/usecases/GetPaymentDetailsUseCaseImpl';
import { GetMerchantDetailsUseCaseImpl } from 'src/payments/application/usecases/GetMerchantDetailsUseCaseImpl';
import { MercadoPagoRepositoryAdapter } from 'src/payments/infraestructure/adapters/repositories/MercadoPagoRepositoryAdapter';

@Module({
    controllers: [CreatePreferenceController, SuccessController, NotificationController],
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
