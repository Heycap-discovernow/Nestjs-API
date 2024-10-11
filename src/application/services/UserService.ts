import { UserDTO } from "src/domain/dtos/UserDTO";
import { UserRequest } from "../dtos/request/UserRequest";
import { GetUserByIdUseCase } from "src/domain/ports/in/UserUseCases";
import { CreateUserUseCase } from "src/domain/ports/in/UserUseCases";
import { UpdateUserUseCase } from "src/domain/ports/in/UserUseCases";
import { DeleteUserUseCase } from "src/domain/ports/in/UserUseCases";
import { LoginUserUseCase } from "src/domain/ports/in/UserUseCases";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class UserService implements GetUserByIdUseCase, CreateUserUseCase, UpdateUserUseCase, DeleteUserUseCase, LoginUserUseCase {
    constructor(
        @Inject('GetUserByIdUseCase') private readonly getUserByIdUseCase: GetUserByIdUseCase,
        @Inject('CreateUserUseCase') private readonly createUserUseCase: CreateUserUseCase,
        @Inject('UpdateUserUseCase') private readonly updateUserUseCase: UpdateUserUseCase,
        @Inject('DeleteUserUseCase') private readonly deleteUserUseCase: DeleteUserUseCase,
        @Inject('LoginUseCase') private readonly loginUserUseCase: LoginUserUseCase,
    ){}

    public async getById(uuid: string): Promise<UserDTO> {
        return await this.getUserByIdUseCase.getById(uuid);
    }

    public async createUser(user: UserRequest): Promise<string> {
        return await this.createUserUseCase.createUser(user);
    }

    public async updateUser(uuid: string, user: UserRequest ): Promise<string> {
        return await this.updateUserUseCase.updateUser(uuid, user);
    }

    public async deleteUser(uuid: string): Promise<boolean> {
        return await this.deleteUserUseCase.deleteUser(uuid);
    }

    public async login(email: string): Promise<UserDTO> {
        return await this.loginUserUseCase.login(email);
    }
}