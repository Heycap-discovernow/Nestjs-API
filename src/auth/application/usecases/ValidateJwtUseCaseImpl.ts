import { ValidateJwtUseCase } from "src/auth/domain/ports/in/ValidateJwtUseCase";
import { TokenRepository } from "src/auth/domain/ports/out/TokenRepository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ValidateJwtUseCaseImpl implements ValidateJwtUseCase {
    constructor(
        @Inject('TokenRepository') private readonly tokenRepository: TokenRepository
    ){}

    public async validateJwt(token: string): Promise<string> {
        // return await this.tokenRepository.validateToken(token);
        return "prueba";
    }
}