import { NotificationService } from "src/notifications/application/services/NotificationService";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class ContactCreatedListener {
    constructor(private readonly notificationService: NotificationService) {}
    @OnEvent('contact.created')
    handleContactCreated(email: string) {
        this.notificationService.sendEmailWelcome(email);
    }
}