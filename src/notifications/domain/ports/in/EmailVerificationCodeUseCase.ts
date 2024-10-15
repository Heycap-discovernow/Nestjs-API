export interface EmailVerificationCodeUseCase {
    sendEmailVerificationCode(email: string): Promise<string>;
}