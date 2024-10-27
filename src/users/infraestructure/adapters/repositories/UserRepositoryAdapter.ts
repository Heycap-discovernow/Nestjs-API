import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
import { Injectable } from "@nestjs/common";
import { prisma } from "src/users/infraestructure/config/db";
import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";
import { Timestamp } from "src/users/domain/value_objects/Timestamp";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {

    public async getById(uuid: string): Promise<UserDTO> {
        const user = await prisma.user.findUnique({
            where: {
                uuid: uuid
            }
        });

        if(user) {
            return new UserDTO(
                user.uuid,
                user.contact_uuid,
                user.name,
                user.last_name,
                user.nickname,
                user.email,
                user.password,
                user.phone,
                user.phone_verified as PhoneVerified,
                new Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at),
                user.avatar
            )
        }

        throw new Error("User not found");
    }

    public async getByEmail(email: string): Promise<UserDTO> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(user) {
            return new UserDTO(
                user.uuid,
                user.contact_uuid,
                user.name,
                user.last_name,
                user.nickname,
                user.email,
                user.password,
                user.phone,
                user.phone_verified as PhoneVerified,
                new Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at),
                user.avatar
            )
        }

        throw new Error("User not found");
    }

    public async createUser(user: UserDTO): Promise<string> {
        const create = await prisma.user.create({
            data: {
                uuid: user.uuid,
                contact_uuid: user.contact_uuid,
                name: user.name,
                last_name: user.last_name,
                nickname: user.nickname,
                email: user.email,
                password: user.password,
                phone: user.phone,
                phone_verified: user.phone_verified,
                avatar: user.avatar,
                user_created_at: user.timestamp.getUserCreatedAt(),
                user_updated_at: user.timestamp.getUserUpdatedAt(),
                user_deleted_at: user.timestamp.getUserDeletedAt(),
            }
        });

        if(!create) {
            throw new Error('Something wrong happened to create your user, please verify your info');
        }

        return "User created with uuid: " + create.uuid;
    }

    public async updateUser(uuid: string, user: UserDTO): Promise<string> {
        const userUpdated = await prisma.user.update({
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
        const deleteUser = await prisma.user.delete({
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