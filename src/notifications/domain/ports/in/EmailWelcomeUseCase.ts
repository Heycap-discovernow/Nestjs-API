export interface EmailWelcomeUseCase {
    sendEmailWelcome(contactEmail: string): Promise<string>;
}