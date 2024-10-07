import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
    // imports: [], // Only if you want to import other modules to use their services
    controllers: [UserController,],
    providers: [UserService,],
    // exports: [UserService,], // Only if you want to export the service so that other modules can use it
})
export class UserModule {}
