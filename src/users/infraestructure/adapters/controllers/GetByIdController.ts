import { API_VERSION } from "src/config";

import { AccessTokenAuthGuard } from "src/users/infraestructure/guards/AccesTokenAuthGuard";
import { UserService } from "src/users/application/services/UserService";
import { UserMapper } from "src/users/application/mappers/UserMappers";
import { BaseResponse } from "src/users/application/dtos/BaseResponse";

import { Controller, Get, Res, Param, HttpStatus, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller(`api/${API_VERSION}/users`)
export class GetByIdController {
    constructor(
        private readonly userService: UserService
    ){}

    @UseGuards(AccessTokenAuthGuard)
    @Get('/:uuid', )
    public async getById(@Param('uuid') uuid: string, @Res() res: Response) {
        try {
            const user = await this.userService.getById(uuid);
            const userResponse = UserMapper.toUserResponse(user);
            const response = new BaseResponse(userResponse, true, "User found successfully");
            res.status(HttpStatus.OK).send(response.toResponseEntity());
        } catch (error) {
            const response = new BaseResponse(error, false, "User not found");
            res.status(HttpStatus.BAD_REQUEST).send(response.toResponseEntity());
        }
    }
}