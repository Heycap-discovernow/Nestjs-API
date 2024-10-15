import { AccessTokenAuthGuard } from "src/users/infraestructure/guards/AccesTokenAuthGuard";
import { UserService } from "src/users/application/services/UserService";
import { API_VERSION } from "src/config";

import { Controller, Delete, Res, Param, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller(`api/${API_VERSION}/users`)
export class DeleteUserController {
    constructor(
        private readonly userService: UserService
    ){}

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