import { Module } from "@nestjs/common";

import { CreateContactController } from "../adapters/controllers/CreateContactController";
import { SearchContactController } from "../adapters/controllers/SearchContactController";
import { ContactRepositoryAdapter } from "../adapters/repositories/ContactRepositoryAdapter";

import { ContactService } from "src/auth/application/services/ContactService";
import { CreateContactUseCaseImpl } from "src/auth/application/usecases/CreateContactUseCaseImpl";
import { SearchContactUseCaseImpl } from "src/auth/application/usecases/SearchContactUseCaseImpl";

@Module({
    controllers: [CreateContactController, SearchContactController],
    providers: [
        ContactService,
        {
            provide: "CreateContactUseCase",
            useClass: CreateContactUseCaseImpl
        },
        {
            provide: "SearchContactUseCase",
            useClass: SearchContactUseCaseImpl
        },
        {
            provide: "ContactRepository",
            useClass: ContactRepositoryAdapter
        }
    ],
    exports: [ContactService]
})
export class ContactModule { }