import { UserRequest } from "src/application/dtos/request/UserRequest";
import { UpdateUserUseCase } from "src/domain/ports/in/UserUseCases";
import { UserRepository } from "src/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async updateUser(uuid: string, user: UserRequest): Promise<string> {
        return await this.userRepository.updateUser(uuid, user);
    }
}