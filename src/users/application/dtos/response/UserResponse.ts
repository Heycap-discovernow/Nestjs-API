export class UserResponse {
    constructor(
        public uuid:string,
        public name: string,
        public last_name: string,
        public nickname: string,
        public email: string,
        public phone: string | null,
        public phone_verified?: boolean | null,
        public avatar?: string | null
    ) {}
}