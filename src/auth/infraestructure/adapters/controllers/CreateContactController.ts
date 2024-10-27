import { API_VERSION } from "src/config";

import { ContactService } from "src/auth/application/services/ContactService";

import { Controller, Post, Body, Res } from "@nestjs/common";
import { Response } from "express";
import { ContactRequestDTO } from "src/auth/application/dtos/request/ContactRequestDTO";

@Controller(`api/${API_VERSION}/contacts`)
export class CreateContactController {
    constructor(
        private readonly contactService: ContactService,
    ){}

    @Post("/")
    public async createContact(@Body() createContactDto: ContactRequestDTO, @Res() res: Response) {
        try {
            const contact = await this.contactService.createContact(createContactDto);
            res.status(201).send(contact);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}