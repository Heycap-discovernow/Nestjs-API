import { API_VERSION } from "src/config/index";

import { UserService } from "src/users/application/services/UserService";
import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { BaseResponse } from "src/users/application/dtos/BaseResponse";

import { User } from "src/users/domain/models/User";

import { Controller, Post, Res, Body, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { hash } from "bcrypt";
import { validateOrReject } from "class-validator";

@Controller(`api/${API_VERSION}/users`)
export class CreateUserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("/")
    public async createUser(@Body() req: UserRequest, @Res() res: Response) {
        try {
            const user = new User(req.name, req.last_name, req.nickname, req.email, req.password, req.phone);
            user.generate();
            const hashPassword = await hash(user.password.trim(), 10)
            await validateOrReject(user);
            const result = await this.userService.createUser({...user, password: hashPassword});
            const response = new BaseResponse(result, true, "User created succesfully");
            res.status(201).send(response.toResponseEntity());
        } catch (error) {
            const response = new BaseResponse(null, false, "User not created", error);
            res.status(HttpStatus.BAD_REQUEST).send(response.toResponseEntity());
        }
    }
}