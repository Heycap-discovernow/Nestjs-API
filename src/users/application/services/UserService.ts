import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { GetUserByIdUseCase } from "src/users/domain/ports/in/GetUseByIdUseCase";
import { CreateUserUseCase } from "src/users/domain/ports/in/CreateUserUseCase";
import { UpdateUserUseCase } from "src/users/domain/ports/in/UpdateUserUseCase";
import { DeleteUserUseCase } from "src/users/domain/ports/in/DeleteUserUseCase";
import { LoginUserUseCase } from "src/users/domain/ports/in/LoginUserUseCase";

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

    public async createUser(user: UserDTO): Promise<string> {
        return await this.createUserUseCase.createUser(user);
    }

    public async updateUser(uuid: string, user: UserDTO ): Promise<string> {
        return await this.updateUserUseCase.updateUser(uuid, user);
    }

    public async deleteUser(uuid: string): Promise<boolean> {
        return await this.deleteUserUseCase.deleteUser(uuid);
    }

    public async login(email: string): Promise<UserDTO> {
        return await this.loginUserUseCase.login(email);
    }
}