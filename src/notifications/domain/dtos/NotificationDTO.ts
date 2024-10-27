export class NotificationDTO {
    constructor(
        public uuid: string,
        public user_uuid: string,
        public sendDate: Date,
        public type: string,
        public sendedAt: string
    ){}
}