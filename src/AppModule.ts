import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/infraestructure/modules/UserModule';
import { MercadoPagoModule } from 'src/payments/infraestructure/modules/MercadoPagoModule';

@Module({
  imports: [UserModule, MercadoPagoModule],
})
export class AppModule {}
