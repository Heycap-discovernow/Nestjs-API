import { SMTP_SERVER, EMAIL_ADDRESS, EMAIL_PASSWORD, SMTP_PORT, META_KEY, META_URL } from "src/config";

import { EmailWelcomeUseCase } from "src/notifications/domain/ports/in/EmailWelcomeUseCase";
import { MetaVerificationCodeUseCase } from "src/notifications/domain/ports/in/MetaVerificationCodeUseCase";

import { Injectable, Inject } from "@nestjs/common";

import * as nodemailer from "nodemailer";
import axios from "axios";

@Injectable()
export class NotificationService implements EmailWelcomeUseCase, MetaVerificationCodeUseCase {
    private transporter: nodemailer.Transporter;
    constructor(
        @Inject('EmailWelcomeUseCase') private readonly emailWelcomeUseCase: EmailWelcomeUseCase,
        @Inject('MetaVerificationCodeUseCase') private readonly metaVerificationCodeUseCase: MetaVerificationCodeUseCase
    ){
        this.transporter = nodemailer.createTransport({
            host: SMTP_SERVER,
            port: parseInt(SMTP_PORT),
            secure: false,
            auth: {
                user: EMAIL_ADDRESS,
                pass: EMAIL_PASSWORD
            },
            logger: true,
            debug: true,
            tls: {
                rejectUnauthorized: true,
            },
        });
    }

    public async sendEmailWelcome(contacEmail: string): Promise<string> {
        const sendInfo = {
            from: EMAIL_ADDRESS,
            to: contacEmail,
            subject: "Welcome to our platform",
            text: "Welcome to our platform, we are glad to have you here, please complete your register process in the module users to use all the features"
        };
        await this.transporter.sendMail(sendInfo);
        return await this.emailWelcomeUseCase.sendEmailWelcome(contacEmail);
    }

    public async sendMetaVerificationCode(phone: string, code: string): Promise<string> {
        const response = await axios.post(
            META_URL,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: `+52${phone}`,
                type: "template",
                template: {
                    name: "authentication",
                    language: {
                        code: "en_US"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: code
                                }
                            ]
                        },
                        {
                            type: "button",
                            sub_type: "url",
                            index: "0",
                            parameters: [
                                {
                                    type: "text",
                                    text: code
                                }
                            ]
                        }
                    ]
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${META_KEY}`  // Token de acceso de Meta
                }
            }
        );
        console.log(response)
        return response.data;
        // return await this.metaVerificationCodeUseCase.sendMetaVerificationCode(phone);
    }
}