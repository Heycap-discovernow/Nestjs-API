import { ContactDTO } from "../../dtos/ContactDTO";

export interface SearchContactUseCase {
    searchContact(contact_uuid: string): Promise<ContactDTO>;
}