import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
import { Injectable } from "@nestjs/common";
import { prisma } from "src/users/infraestructure/config/db";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {

    public async getById(uuid: string): Promise<UserDTO> {
        const user: UserDTO = await prisma.users.findUnique({
            where: {
                uuid: uuid
            }
        });

        return user;
    }

    public async getByEmail(email: string): Promise<UserDTO> {
        const user: UserDTO = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        return user;
    }

    public async createUser(user: UserRequest): Promise<string> {
        const create = await prisma.users.create({
            data: user
        });

        if(!create) {
            throw new Error('Something wrong happened to create your user, please verify your info');
        }

        return "uuid: " + create.uuid;
    }

    public async updateUser(uuid: string, user: UserDTO): Promise<string> {
        const userUpdated = await prisma.users.update({
            where: {
                uuid: uuid
            },
            data: user
        });

        if(!userUpdated) {
            throw new Error("Something wrong happened to the moment of update")
        }

        return "User updated successfully";
    }

    public async deleteUser(uuid: string): Promise<boolean> {
        const deleteUser = await prisma.users.delete({
            where: {
                uuid: uuid
            }
        });

        if (!deleteUser) {
            return false;
        }

        return true;
    }
}