
export class User {
    constructor(
        public userId: string,
        public uuid: string,
        public name: string,
        public lastName: string,
        public nickname: string,
        public email: string,
        public password: string,
        public phone: string,
        public phoneVerified?: boolean,
        public avatar?: string,
        public code?: string,
        public codeCreatedAt?: Date,
        public createdAt?: Date,
    ){}

    public phoneValid(): boolean {
        return this.phone.length === 10;
    }

    public emailValid(): boolean {
        return this.email.includes('@') && this.email.includes('.');
    }

    public passwordValid(): boolean {
        return this.password.length >= 8;
    }
}