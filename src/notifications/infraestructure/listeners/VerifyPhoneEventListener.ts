import { NotificationService } from "src/notifications/application/services/NotificationService";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class VerifyPhoneEventListener {
    constructor(private readonly notificationService: NotificationService) {}
    @OnEvent('verify.phone')
    async handleVerifyPhone(phone: string, code: string) {
        await this.notificationService.sendMetaVerificationCode(phone, code);
        console.log(`Message sent for Whatsapp to ${phone}`);
    }
}