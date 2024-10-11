import { Module } from '@nestjs/common';
import { UserController } from '../adapters/controllers/user/UserController';
import { UserService } from '../../application/services/UserService';
import { GetUserByIdUseCaseImpl } from '../../application/usecases/user/GetUserByIdUseCaseImpl';
import { CreateUserUseCaseImpl } from '../../application/usecases/user/CreateUserUseCaseImpl';
import { UpdateUserUseCaseImpl } from 'src/application/usecases/user/UpdateUserUseCaseImpl';
import { DeleteUserUseCaseImpl } from 'src/application/usecases/user/DeleteUserUseCaseImpl';
import { LoginUserUseCaseImpl } from 'src/application/usecases/user/LoginUseCase';
import { UserRepositoryAdapter } from '../adapters/repositories/UserRepositoryAdapter';

@Module({
    // imports: [], // Only if you want to import other modules to use their services
    controllers: [UserController,],
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
