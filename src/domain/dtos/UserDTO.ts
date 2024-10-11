export class UserDTO {
    constructor(
        public user_id: number,
        public uuid: string,
        public name: string,
        public last_name: string,
        public nickname: string,
        public email: string,
        public password: string,
        public phone: string,
        public phone_verified?: boolean,
        public avatar?: string,
        public code?: string,
        public code_created_at?: Date,
        public created_at?: Date,
    ){}
}