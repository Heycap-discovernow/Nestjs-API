import { Controller, Req, Res } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from 'src/users/services/user/user.service';

@Controller('api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    public async getAllUsers(@Req() req: Request, @Res() res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).send(users);
        } catch (error) {
            throw new Error('Error getting all users');
        }
    }

    @Post()
    public async createUser(@Body() createUser: any, @Res() res: Response) {
        try {
            const user = await this.userService.createUser(createUser);
            console.log("prueba de user", user);
            res.status(201).send("Created");
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    @Put("/:uuid")
    public async updateUser(@Param('uuid') uuid: string, @Body() updateUserDto: any, @Res() res: Response) {
        try {
            const user = await this.userService.updateUser(updateUserDto, uuid);
            res.status(200).send(user);
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    @Delete("/:id")
    public async deleteUser(@Param('id') id: string, @Res() res: Response) {
        try {
            const user = await this.userService.deleteUser(Number(id));
            res.status(204).send("User deleted");
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
}
