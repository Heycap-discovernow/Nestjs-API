import { GenerateJwtUseCase } from "src/auth/domain/ports/in/GenerateJwtUseCase";
import { ValidateJwtUseCase } from "src/auth/domain/ports/in/ValidateJwtUseCase";
import { GenerateCodeTokenUseCase } from "src/auth/domain/ports/in/GenerateCodeTokenUseCase";
import { VerifyCodeTokenUseCase } from "src/auth/domain/ports/in/VerifyCodeTokenUseCase";

import { Inject, Injectable } from "@nestjs/common";

import { sign } from "jsonwebtoken";
import { createHash } from "crypto";

@Injectable()
export class TokenService implements GenerateJwtUseCase, ValidateJwtUseCase, GenerateCodeTokenUseCase, VerifyCodeTokenUseCase {
    constructor(
        @Inject('GenerateJwtUseCase') private readonly generateJwtUseCase: GenerateJwtUseCase,
        @Inject('ValidateJwtUseCase') private readonly validateJwtUseCase: ValidateJwtUseCase,
        @Inject('GenerateCodeTokenUseCase') private readonly generateCodeTokenUseCase: GenerateCodeTokenUseCase,
        @Inject('VerifyCodeTokenUseCase') private readonly verifyCodeTokenUseCase: VerifyCodeTokenUseCase
    ){}
    
    public async generateJwt(userUUID: string, payload: string, secretKey: string): Promise<string> {
        const data = JSON.parse(payload);
        const token = sign(data, secretKey, { expiresIn: '10m'})
        await this.generateJwtUseCase.generateJwt(userUUID, token, undefined);
        return token;
    }

    public async validateJwt(token: string, type: string, userUUID: string): Promise<string> {
        return this.validateJwtUseCase.validateJwt(token, type, userUUID);
    }

    public async generateCodeToken(userUUID: string): Promise<string> {
        const code =  Math.floor(1000 + Math.random() * 9000).toString();
        const token = createHash('sha256').update(code.concat(userUUID)).digest('hex');
        console.log("AQUI HASHEE", token);
        // const payload = JSON.stringify({ code: code });
        // const token = await this.generateJwt(userUUID, payload, (code + userUUID));
        const tokenCreated = await this.generateCodeTokenUseCase.generateCodeToken(token, userUUID);
        return tokenCreated;
    }

    public async verifyCodeToken(userUUID: string, code: string): Promise<string> {
        const token = createHash('sha256').update(code.concat(userUUID)).digest('hex');
        const tokenFound = await this.verifyCodeTokenUseCase.verifyCodeToken(token, userUUID);
        return tokenFound;
    }
}