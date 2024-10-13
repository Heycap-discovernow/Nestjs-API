import { UserDTO } from "src/domain/dtos/UserDTO";

export interface GetUserByIdUseCase {
    getById(uuid: string): Promise<UserDTO>;
}

export interface CreateUserUseCase {
    createUser(user: UserDTO): Promise<string>;
}

export interface UpdateUserUseCase {
    updateUser(uuid: string, user: UserDTO): Promise<string>;
}

export interface DeleteUserUseCase {
    deleteUser(uuid: string): Promise<boolean>;
}

export interface LoginUserUseCase {
    login(email: string): Promise<UserDTO>;
}