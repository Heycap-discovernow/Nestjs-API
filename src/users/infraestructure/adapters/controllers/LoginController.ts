import { API_VERSION } from "src/config";
import { JWT_KEY } from "src/config";

import { UserService } from "src/users/application/services/UserService";
import { ToUserResponse } from "src/users/application/mappers/response/ToUserResponse";
import { BaseResponse } from "src/users/application/dtos/BaseResponse";

import { Controller, Post, Res, Body, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { sign } from "jsonwebtoken";

@Controller(`api/${API_VERSION}/users`)
export class LoginController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("/login")
    public async login(@Body('email') email: string, @Body('password') password: string,  @Res() res: Response) {
        try {
            const user = await this.userService.login(email, password)
            if(!user) {
                throw new Error("User don't found");
            }
            const token = sign({ user }, JWT_KEY as string, { expiresIn: '1h' })
            const userResponse = ToUserResponse.toUserResponse(user);
            const response = new BaseResponse({ user: userResponse, token: token }, true, "User logged in successfully");
            res.status(HttpStatus.ACCEPTED).send(response.toResponseEntity());
        } catch (error) {
            const response = new BaseResponse(null, false, "User not logged in", error);
            res.status(HttpStatus.BAD_REQUEST).send(response.toResponseEntity());
        }
    }
}