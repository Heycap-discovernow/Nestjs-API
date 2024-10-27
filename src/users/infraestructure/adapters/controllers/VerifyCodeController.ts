import { API_VERSION } from "src/config";

import { AccessTokenAuthGuard } from "src/users/infraestructure/guards/AccesTokenAuthGuard";
import { UserService } from "src/users/application/services/UserService";

import { Controller, Post, Body, Res, Req, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

@Controller(`api/${API_VERSION}/users/verify-code`)
export class VerifyCodeController {
    constructor(
        private readonly userServices: UserService
    ) {}

    @Post()
    public async verifyCode(
        @Body("code") code: string, 
        @Body("uuid") uuid: string, 
        @Res() res: Response, 
        @Req() req: Request
    ) {
        try {
            await this.userServices.verifyPhone(uuid, code)
            res.status(200).json({ message: 'Number verified' });
        } catch (error) {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}