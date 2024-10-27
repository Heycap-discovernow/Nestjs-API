import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { ContactService } from "src/auth/application/services/ContactService";
import { TokenService } from "src/auth/application/services/TokenService";

import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { GetUserByIdUseCase } from "src/users/domain/ports/in/GetUseByIdUseCase";
import { CreateUserUseCase } from "src/users/domain/ports/in/CreateUserUseCase";
import { UpdateUserUseCase } from "src/users/domain/ports/in/UpdateUserUseCase";
import { DeleteUserUseCase } from "src/users/domain/ports/in/DeleteUserUseCase";
import { LoginUserUseCase } from "src/users/domain/ports/in/LoginUserUseCase";
import { User } from "src/users/domain/models/User";
import { Timestamp } from "src/users/domain/value_objects/Timestamp";
import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";

import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

import { validateOrReject } from "class-validator";
import { hash, compare } from "bcrypt";

@Injectable()
export class UserService implements GetUserByIdUseCase, CreateUserUseCase, UpdateUserUseCase, DeleteUserUseCase, LoginUserUseCase {
    constructor(
        @Inject('GetUserByIdUseCase') private readonly getUserByIdUseCase: GetUserByIdUseCase,
        @Inject('CreateUserUseCase') private readonly createUserUseCase: CreateUserUseCase,
        @Inject('UpdateUserUseCase') private readonly updateUserUseCase: UpdateUserUseCase,
        @Inject('DeleteUserUseCase') private readonly deleteUserUseCase: DeleteUserUseCase,
        @Inject('LoginUseCase') private readonly loginUserUseCase: LoginUserUseCase,
        private readonly eventEmmitter: EventEmitter2,
        private readonly contactService: ContactService,
        private readonly tokenService: TokenService
    ) { }

    public async getById(uuid: string): Promise<UserDTO> {
        return await this.getUserByIdUseCase.getById(uuid);
    }

    public async createUser(data: UserRequest): Promise<string> {
        const contact = await this.contactService.searchContact(data.contact_uuid);
        if (!contact) {
            throw new Error("Contact not found");
        }
        const date = new Date();
        const timestamp = new Timestamp().setUserCreatedAt(date).setUserUpdatedAt(date).setUserDeletedAt(undefined);
        const user = new User(
            contact.uuid,
            contact.name,
            contact.last_name,
            data.nickname,
            contact.email,
            data.password,
            contact.phone,
            PhoneVerified.INACTIVE,
            timestamp,
            data.avatar
        );
        await validateOrReject(user);
        const hashPassword = await hash(user.password.trim(), 10);
        const result = await this.createUserUseCase.createUser({ ...user, password: hashPassword });
        if (!result) {
            throw new Error("User not created");
        }
        
        const code = await this.tokenService.generateCodeToken(user.uuid);
        this.eventEmmitter.emit("verify.phone", user.phone, code);
        return result;
    }

    public async updateUser(uuid: string, user: UserDTO): Promise<string> {
        return await this.updateUserUseCase.updateUser(uuid, user);
    }

    public async deleteUser(uuid: string): Promise<boolean> {
        return await this.deleteUserUseCase.deleteUser(uuid);
    }

    public async login(email: string, password: string): Promise<UserDTO> {
        const user = await this.loginUserUseCase.login(email, password);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("invalid password");
        }
        return user;
    }

    public async verifyPhone(uuid: string, code: string): Promise<string> {
        const user = await this.getById(uuid);
        if (!user) {
            throw new Error("User not found");
        }
        console.log("status phone found", user.phone_verified, typeof user.phone_verified);
        console.log("status phone expected", PhoneVerified.ACTIVE, typeof PhoneVerified.ACTIVE);
        const token = await this.tokenService.verifyCodeToken(uuid, code);
        // MANDAR A LLAMAR AL SERVICIO DE Token PARA VERIFICAR EL CODIGO (Cambiar)
        return "true";
    }
}