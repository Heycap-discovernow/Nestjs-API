import { ContactDTO } from "../../dtos/ContactDTO";

export interface CreateContactUseCase {
    createContact(contact: ContactDTO): Promise<string>;
}