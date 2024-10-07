import { Injectable } from '@nestjs/common';
import { prisma } from 'src/config/db';

@Injectable()
export class UserService {
    public async getAllUsers() {
        try {
            return await prisma.users.findMany()
        } catch (error) {
            throw new Error('Error getting all users');
        }
    }

    public async createUser(data: any) {
        try {
            return await prisma.users.create({
                data: data
            })
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    public async updateUser(data: any, uuid: string) {
        try {
            return await prisma.users.update({
                where: {
                    uuid: uuid
                },
                data: data
            })
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    public async deleteUser(id: number) {
        try {
            return await prisma.users.delete({
                where: {
                    user_id: id
                }
            })
        } catch (error) {
            throw new Error('Error creating user');
        }
    }
}
