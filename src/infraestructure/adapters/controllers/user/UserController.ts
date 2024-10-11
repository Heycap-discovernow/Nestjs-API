import { UserService } from 'src/application/services/UserService';
import { UserMapper } from 'src/application/mappers/UserMappers';
import { UserRequest } from 'src/application/dtos/request/UserRequest';
import { BaseResponse } from 'src/application/dtos/BaseResponse';
import { AccessTokenAuthGuard } from 'src/infraestructure/guards/AccesTokenAuthGuard';

import { Controller, Res, Body, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { Response } from 'express';

import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_KEY } from 'src/infraestructure/config';

@Controller('api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UseGuards(AccessTokenAuthGuard)
    @Get('/:uuid', )
    public async getById(@Param('uuid') uuid: string, @Res() res: Response) {
        try {
            const user = await this.userService.getById(uuid);
            const userResponse = UserMapper.toUserResponse(user);
            res.status(200).send(userResponse);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @Post("/login")
    public async login(@Body('email') email: string, @Body('password') password: string,  @Res() res: Response) {
        try {
            const user = await this.userService.login(email)
            
            if(!user) {
                throw new Error("User don't found");
            }
            const passwordMatch = await compare(password, user.password);
            console.log("llegue hasta aca")
            if(!passwordMatch) {
                res.status(401).send("invalid password");
            }

            const token = sign({user}, JWT_KEY as string, {expiresIn: '12h'})

            const userById = await this.userService.getById(user.uuid);
            const userResponse = UserMapper.toUserResponse(userById);
            const response = new BaseResponse({ user: userResponse, token: token }, true, "User logged in successfully");
            res.status(200).send(response.toResponseEntity());
        } catch (error) {
            res.status(500).send("something wrong happened");
        }
    }

    @Post("/")
    public async createUser(@Body() userRequest: UserRequest, @Res() res: Response) {
        try {
            if(userRequest.phone.trim().length !== 10) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "Phone number must have 10 digits" });
            }
            if (userRequest.password.trim().length < 8) {
                return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Password must be at least 8 characters long' });
            }
            const hashPassword = await hash(userRequest.password.trim(), 10)
            const user = await this.userService.createUser({...userRequest, password: hashPassword});
            const response = new BaseResponse(user, true, "");
            res.status(201).send(response.toResponseEntity());
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @UseGuards(AccessTokenAuthGuard)
    @Put("/:uuid")
    public async updateUser(@Param('uuid') uuid: string, @Body() updateUserDto: any, @Res() res: Response) {
        try {
            const user = await this.userService.updateUser(uuid, updateUserDto);
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @UseGuards(AccessTokenAuthGuard)
    @Delete("/:uuid")
    public async deleteUser(@Param('uuid') uuid: string, @Res() res: Response) {
        try {
            const user = await this.userService.deleteUser(uuid);
            if(!user) {
                throw new Error("User don't deleted")
            }
            res.status(204).send("User deleted");
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
