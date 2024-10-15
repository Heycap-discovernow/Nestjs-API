export interface MetaVerificationCodeUseCase {
    sendMetaVerificationCode(phone: string): Promise<string>;
}