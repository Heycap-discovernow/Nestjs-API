export interface NotificationRepository  {
    generateCode(): Promise<string>;
    verifyCode(): Promise<boolean>;
    sendCodeByMeta(message: string, phone: string): Promise<string>;    
    sendCodeByEmail(message: string, email: string): Promise<string>;
}