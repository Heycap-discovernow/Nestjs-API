import { API_VERSION } from "src/config";

import { ContactService } from "src/auth/application/services/ContactService";

import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";

@Controller(`api/${API_VERSION}/contacts`)
export class SearchContactController {
    constructor(
        private readonly contactService: ContactService,
    ){}

    @Get("/:uuid")
    public async searchContact(@Param("uuid") uuid: string, @Res() res: Response) {
        try {
            const contact = await this.contactService.searchContact(uuid);
            res.status(200).send(contact);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}