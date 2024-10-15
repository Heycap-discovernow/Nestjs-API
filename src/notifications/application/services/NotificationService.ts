import { EmailVerificationCodeUseCase } from "src/notifications/domain/ports/in/EmailVerificationCodeUseCase";
import { MetaVerificationCodeUseCase } from "src/notifications/domain/ports/in/MetaVerificationCodeUseCase";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class NotificationService implements EmailVerificationCodeUseCase, MetaVerificationCodeUseCase {
    constructor(
        @Inject('EmailVerificationCodeUseCase') private readonly emailVerificationCodeUseCase: EmailVerificationCodeUseCase,
        @Inject('MetaVerificationCodeUseCase') private readonly metaVerificationCodeUseCase: MetaVerificationCodeUseCase
    ){}

    public async sendEmailVerificationCode(email: string): Promise<string> {
        return await 'Email verification code sent successfully';
    }

    public async sendMetaVerificationCode(email: string): Promise<string> {
        return await 'Meta verification code sent successfully';
    }
}