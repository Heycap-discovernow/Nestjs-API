export interface NotificationRepository  {
    sendCodeByMeta(message: string, phone: string): Promise<string>;    
    sendCodeByEmail(message: string, email: string): Promise<string>;
}