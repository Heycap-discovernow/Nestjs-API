import { API_VERSION } from "src/config/index";

import { UserService } from "src/users/application/services/UserService";
import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { BaseResponse } from "src/users/application/dtos/BaseResponse";

import { Controller, Post, Res, Body, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Controller(`api/${API_VERSION}/users`)
export class CreateUserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("/")
    public async createUser(@Body() req: UserRequest, @Res() res: Response) {
        try {
            const result = await this.userService.createUser(req);
            const response = new BaseResponse(result, true, "User created succesfully");
            res.status(201).send(response.toResponseEntity());
        } catch (error) {
            const response = new BaseResponse(null, false, "Something Went Wrong", error);
            res.status(HttpStatus.BAD_REQUEST).send(response.toResponseEntity());
        }
    }
}