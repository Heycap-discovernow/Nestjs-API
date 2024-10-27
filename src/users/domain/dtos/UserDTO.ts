import { PhoneVerified } from "../value_objects/PhoneVerified";
import { Timestamp } from "../value_objects/Timestamp";

export class UserDTO {
    constructor(
        public uuid: string,
        public contact_uuid: string,
        public name: string,
        public last_name: string,
        public nickname: string,
        public email: string,
        public password: string,
        public phone: string,
        public phone_verified: PhoneVerified,
        public timestamp: Timestamp,
        public avatar?: string,
        // public code?: string, //codigo debe estar relacionado con otra entidad CODIGO
        // public code_created_at?: Date, //se mueve a la entidad CODIGO
        // public code_updated_at?: Date, //se mueve a la entidad CODIGO
    ){}
}