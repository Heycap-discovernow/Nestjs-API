import { Token } from "src/auth/domain/models/Token";
import { Type } from "src/auth/domain/value_objects/TokenType";
import { Status } from "src/auth/domain/value_objects/TokenStatus";
import { GenerateCodeTokenUseCase } from "src/auth/domain/ports/in/GenerateCodeTokenUseCase";
import { TokenRepository } from "src/auth/domain/ports/out/TokenRepository";

import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GenerateCodeTokenUseCaseImpl implements GenerateCodeTokenUseCase {
    constructor(
        @Inject('TokenRepository') private readonly tokenRepository: TokenRepository
    ){}

    public async generateCodeToken(token: string, user_uuid: string): Promise<string> {
        const create_at = new Date();
        const expires_at = new Date(create_at.getTime() + 600000);
        const newToken = new Token(
            token, 
            user_uuid,
            Type.CODE,
            create_at,
            expires_at,
            Status.ACTIVE
        );
        return await this.tokenRepository.createToken(newToken);
    }
}