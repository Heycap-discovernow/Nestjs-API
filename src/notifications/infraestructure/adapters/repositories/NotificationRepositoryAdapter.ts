import { NotificationRepository } from "src/notifications/domain/ports/out/NotificationRepository";

import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationRepositoryAdapter implements NotificationRepository {
    public async generateCode(): Promise<string> {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        return await code;
    }

    public async verifyCode(): Promise<boolean> {
        return await true
    }

    public async sendCodeByEmail(message: string, email: string): Promise<string> {
        return await "hola"
    }

    public async sendCodeByMeta(message: string, phone: string): Promise<string> {
        return await "hola"
    }
}