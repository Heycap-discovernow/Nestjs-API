import { VerifyCodeTokenUseCase } from "src/auth/domain/ports/in/VerifyCodeTokenUseCase";
import { TokenRepository } from "src/auth/domain/ports/out/TokenRepository";

import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class VerifyCodeTokenUseCaseImpl implements VerifyCodeTokenUseCase {
    constructor(
        @Inject('TokenRepository') private readonly codeRepository: TokenRepository
    ){}

    public async verifyCodeToken(token: string, userUUID: string): Promise<string> {
        const tokenFound = await this.codeRepository.searchToken(token, userUUID);
        return tokenFound;
    }
}