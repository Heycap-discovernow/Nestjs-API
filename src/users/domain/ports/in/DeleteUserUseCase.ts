import { UserDTO } from "src/users/domain/dtos/UserDTO";

export interface DeleteUserUseCase {
    deleteUser(uuid: string): Promise<boolean>;
}