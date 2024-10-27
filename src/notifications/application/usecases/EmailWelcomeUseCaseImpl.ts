import { EmailWelcomeUseCase } from "src/notifications/domain/ports/in/EmailWelcomeUseCase";
import { NotificationRepository } from "src/notifications/domain/ports/out/NotificationRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class EmailWelcomeUseCaseImpl implements EmailWelcomeUseCase {
    constructor(
        @Inject("NotificationRepository") private readonly notificationRepository: NotificationRepository
    ){}
    public async sendEmailWelcome(contactEmail: string): Promise<string> {
        return `Welcome message sent to ${contactEmail} successfully`;
    }
}