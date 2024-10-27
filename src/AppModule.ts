import { ContactModule } from 'src/auth/infraestructure/modules/ContactModule';
import { UserModule } from 'src/users/infraestructure/modules/UserModule';
import { MercadoPagoModule } from 'src/payments/infraestructure/modules/MercadoPagoModule';
import { NotificationModule } from 'src/notifications/infraestructure/modules/NotificationModule';
import { TokenModule } from 'src/auth/infraestructure/modules/TokenModule';

import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModule, 
    MercadoPagoModule, 
    ContactModule,
    NotificationModule,
    TokenModule
  ],
})
export class AppModule {}