import { API_VERSION } from "src/config";

import { AccessTokenAuthGuard } from "src/users/infraestructure/guards/AccesTokenAuthGuard";
import { UserService } from "src/users/application/services/UserService";
import { BaseResponse } from "src/users/application/dtos/BaseResponse";

import { Controller, Put, Res, Param, Body, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller(`api/${API_VERSION}/users`)
export class UpdateUserController {
    constructor(
        private readonly userService: UserService
    ){}

    @UseGuards(AccessTokenAuthGuard)
    @Put("/:uuid")
    public async updateUser(@Param('uuid') uuid: string, @Body() updateUserDto: any, @Res() res: Response) {
        try {
            const user = await this.userService.updateUser(uuid, updateUserDto);
            const response = new BaseResponse(user, true, "User updated successfully");
            res.status(200).send(response.toResponseEntity());
        } catch (error) {
            const response = new BaseResponse(error, false, "User not updated");
            res.status(500).send(response.toResponseEntity());
        }
    }
}