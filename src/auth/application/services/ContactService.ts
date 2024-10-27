
import { ContactRequestDTO } from "src/auth/application/dtos/request/ContactRequestDTO";

import { CreateContactUseCase } from "src/auth/domain/ports/in/CreateContactUseCase";
import { SearchContactUseCase } from "src/auth/domain/ports/in/SearchContactUseCase";
import { Contact } from "src/auth/domain/models/Contact";
import { ContactDTO } from "src/auth/domain/dtos/ContactDTO";

import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

import { validateOrReject } from "class-validator";

@Injectable()
export class ContactService implements CreateContactUseCase {
    constructor(
        @Inject("CreateContactUseCase") private readonly createContactUseCase: CreateContactUseCase,
        @Inject("SearchContactUseCase") private readonly searchContactUseCase: SearchContactUseCase,
        private readonly eventEmitter: EventEmitter2
    ){}

    public async createContact(data: ContactRequestDTO): Promise<string> {
        const contact = new Contact(data.name, data.last_name, data.email, data.phone);
        await validateOrReject(contact);
        const result = await this.createContactUseCase.createContact(contact);
        this.eventEmitter.emit("contact.created", contact.email);
        return result;
    }

    public async searchContact(uuid: string): Promise<ContactDTO> {
        return await this.searchContactUseCase.searchContact(uuid);
    }
}