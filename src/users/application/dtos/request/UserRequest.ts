export class UserRequest {
    constructor(
        public name: string,
        public last_name: string,
        public nickname: string,
        public email: string,
        public password: string,
        public phone: string,
        public phone_verified?: boolean | null,
        public avatar?: string | null,
        public code?: string | null,
        public code_created_at?: Date | null,
        public created_at?: Date | null,
    ){}
}