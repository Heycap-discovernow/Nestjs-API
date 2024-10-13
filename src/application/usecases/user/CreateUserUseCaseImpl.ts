import { UserRequest } from "src/application/dtos/request/UserRequest";
import { CreateUserUseCase } from "src/domain/ports/in/UserUseCases";
import { UserRepository } from "src/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async createUser(user: UserRequest): Promise<string> {
        return await this.userRepository.createUser(user);
    }
}