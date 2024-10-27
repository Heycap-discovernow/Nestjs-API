export interface MetaVerificationCodeUseCase {
    sendMetaVerificationCode(phone: string, code: string): Promise<string>;
}