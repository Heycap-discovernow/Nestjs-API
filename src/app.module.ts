import { Module } from '@nestjs/common';
import { UserModule } from './infraestructure/modules/user.module';
import { MercadoPagoModule } from './infraestructure/modules/MercadoPagoModule';

@Module({
  imports: [UserModule, MercadoPagoModule],
})
export class AppModule {}
