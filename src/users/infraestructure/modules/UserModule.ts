import { Module } from '@nestjs/common';

import { GetByIdController } from '../adapters/controllers/GetByIdController';
import { CreateUserController } from '../adapters/controllers/CreateUserController';
import { DeleteUserController } from '../adapters/controllers/DeleteUserController';
import { LoginController } from '../adapters/controllers/LoginController';
import { UpdateUserController } from '../adapters/controllers/UpdateUserController';

import { UserService } from '../../application/services/UserService';
import { GetUserByIdUseCaseImpl } from '../../application/usecases/GetUserByIdUseCaseImpl';
import { CreateUserUseCaseImpl } from '../../application/usecases/CreateUserUseCaseImpl';
import { UpdateUserUseCaseImpl } from '../../application/usecases/UpdateUserUseCaseImpl';
import { DeleteUserUseCaseImpl } from '../../application/usecases/DeleteUserUseCaseImpl';
import { LoginUserUseCaseImpl } from '../../application/usecases/LoginUseCase';

import { UserRepositoryAdapter } from '../adapters/repositories/UserRepositoryAdapter';

@Module({
    // imports: [], // Only if you want to import other modules to use their services
    controllers: [GetByIdController, CreateUserController, DeleteUserController, LoginController, UpdateUserController],
    providers: [UserService,
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
