import { MetaVerificationCodeUseCase } from "src/notifications/domain/ports/in/MetaVerificationCodeUseCase";
import { NotificationRepository } from "src/notifications/domain/ports/out/NotificationRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class MetaVerificationCodeUseCaseImpl implements MetaVerificationCodeUseCase {
    constructor(
        @Inject("NotificationRepository") private readonly notificationRepository: NotificationRepository
    ){}
    public async sendMetaVerificationCode(email: string): Promise<string> {
        return 'Meta verification code sent successfully';
    }
}