import { GetByIdController } from 'src/users/infraestructure/adapters/controllers/GetByIdController';
import { CreateUserController } from 'src/users/infraestructure/adapters/controllers/CreateUserController';
import { DeleteUserController } from 'src/users/infraestructure/adapters/controllers/DeleteUserController';
import { LoginController } from 'src/users/infraestructure/adapters/controllers/LoginController';
import { UpdateUserController } from 'src/users/infraestructure/adapters/controllers/UpdateUserController';
import { UserRepositoryAdapter } from 'src/users/infraestructure/adapters/repositories/UserRepositoryAdapter';

import { UserService } from 'src/users/application/services/UserService';
import { GetUserByIdUseCaseImpl } from 'src/users/application/usecases/GetUserByIdUseCaseImpl';
import { CreateUserUseCaseImpl } from 'src/users/application/usecases/CreateUserUseCaseImpl';
import { UpdateUserUseCaseImpl } from 'src/users/application/usecases/UpdateUserUseCaseImpl';
import { DeleteUserUseCaseImpl } from 'src/users/application/usecases/DeleteUserUseCaseImpl';
import { LoginUserUseCaseImpl } from 'src/users/application/usecases/LoginUseCase';

import { ContactModule } from 'src/auth/infraestructure/modules/ContactModule';
import { TokenModule } from 'src/auth/infraestructure/modules/TokenModule';

import { Module } from '@nestjs/common';

@Module({
    imports: [ContactModule, TokenModule], // Only if you want to import other modules to use their services
    controllers: [GetByIdController, CreateUserController, DeleteUserController, LoginController, UpdateUserController],
    providers: [
        UserService,
        {
            provide: 'GetUserByIdUseCase',
            useClass: GetUserByIdUseCaseImpl
        },
        {
            provide: 'CreateUserUseCase',
            useClass: CreateUserUseCaseImpl
        },
        {
            provide: 'UpdateUserUseCase',
            useClass: UpdateUserUseCaseImpl
        },
        {
            provide: 'DeleteUserUseCase',
            useClass: DeleteUserUseCaseImpl
        },
        {
            provide: "LoginUseCase",
            useClass: LoginUserUseCaseImpl
        },
        {
            provide: 'UserRepository',
            useClass: UserRepositoryAdapter
        }
    ],
    // exports: [UserService,], // Only if you want to export the service so that other modules can use it
})
export class UserModule {}
