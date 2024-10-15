import { EmailVerificationCodeUseCase } from "src/notifications/domain/ports/in/EmailVerificationCodeUseCase";
import { NotificationRepository } from "src/notifications/domain/ports/out/NotificationRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class EmailVerificationCodeUseCaseImpl implements EmailVerificationCodeUseCase {
    constructor(
        @Inject("NotificationRepository") private readonly notificationRepository: NotificationRepository
    ){}
    public async sendEmailVerificationCode(email: string): Promise<string> {
        return 'Email verification code sent successfully';
    }
}