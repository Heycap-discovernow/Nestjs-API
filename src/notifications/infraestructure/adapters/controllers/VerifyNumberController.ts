import { API_VERSION } from "src/config";

import { Controller, Post, Body, Res, HttpStatus} from "@nestjs/common";
import { Response } from "express";

@Controller(`api/${API_VERSION}/notifications`)
export class VerifyNumberController {
    @Post("/verify-number")
    public async generateCode(@Body("email") email: string, @Body() code: string, @Res() res: Response) {
        try {
            
        } catch (error) {
            
        }
    }
}