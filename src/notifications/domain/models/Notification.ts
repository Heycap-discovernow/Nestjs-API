import { SendedAt } from "../value_objects/SendedAt";
import { NotificationType } from "../value_objects/NotificationType";

import { IsUUID, IsDate, IsEnum } from "class-validator";

export class Notification {
    @IsUUID()
    public uuid: string;

    @IsUUID()
    public user_uuid: string;

    @IsDate()
    public sendDate: Date;

    @IsEnum(NotificationType)
    public type: NotificationType;

    @IsEnum(SendedAt)
    public sendedAt: SendedAt;

    constructor(uuid: string, user_uuid: string, sendDate: Date, type: NotificationType) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.sendDate = sendDate;
        this.type = type;
    }
}