import { ContactDTO } from "../../dtos/ContactDTO";

export interface ContactRepository {
    createContact(contact: ContactDTO): Promise<string>;
    searchContact(contact_uuid: string): Promise<ContactDTO>;
}