import { ContactCreatedListener } from "src/notifications/infraestructure/listeners/ContactCreatedListener";
import { VerifyPhoneEventListener } from "../listeners/VerifyPhoneEventListener";
import { NotificationService } from "src/notifications/application/services/NotificationService";
import { EmailWelcomeUseCaseImpl } from "src/notifications/application/usecases/EmailWelcomeUseCaseImpl";
import { MetaVerificationCodeUseCaseImpl } from "src/notifications/application/usecases/MetaVerificationCodeUseCaseImpl";
import { NotificationRepositoryAdapter } from "../adapters/repositories/NotificationRepositoryAdapter";
import { Module } from "@nestjs/common";

@Module({
    providers: [
        ContactCreatedListener,
        VerifyPhoneEventListener,
        NotificationService,
        {
            provide: 'EmailWelcomeUseCase',
            useClass: EmailWelcomeUseCaseImpl
        },
        {
            provide: 'MetaVerificationCodeUseCase',
            useClass: MetaVerificationCodeUseCaseImpl
        },
        {
            provide: 'NotificationRepository',
            useClass: NotificationRepositoryAdapter
        }
    ]
})
export class NotificationModule {}