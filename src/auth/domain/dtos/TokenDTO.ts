import { Type } from "src/auth/domain/value_objects/TokenType";
import { Status } from "src/auth/domain/value_objects/TokenStatus";

export class TokenDTO {
    constructor(
        public token: string,
        public user_uuid: string,
        public type: Type,
        public created_at: Date,
        public expires_at: Date,
        public status: Status
    ) {}
}