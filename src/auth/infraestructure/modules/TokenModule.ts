import { TokenService } from "src/auth/application/services/TokenService";
import { GenerateJwtUseCaseImpl } from "src/auth/application/usecases/GenerateJwtUseCaseImpl";
import { ValidateJwtUseCaseImpl } from "src/auth/application/usecases/ValidateJwtUseCaseImpl";
import { GenerateCodeTokenUseCaseImpl } from "src/auth/application/usecases/GenerateCodeTokenUseCaseImpl";
import { VerifyCodeTokenUseCaseImpl } from "src/auth/application/usecases/VerifyCodeTokenUseCaseImpl";
import { TokenRepositoryAdapter } from "../adapters/repositories/TokenRepositoryAdapter";

import { Module } from "@nestjs/common";

@Module({
    providers: [
        TokenService,
        {
            provide: "GenerateJwtUseCase",
            useClass: GenerateJwtUseCaseImpl
        },
        {
            provide: "ValidateJwtUseCase",
            useClass: ValidateJwtUseCaseImpl
        },
        {
            provide: "GenerateCodeTokenUseCase",
            useClass: GenerateCodeTokenUseCaseImpl
        },
        {
            provide: "VerifyCodeTokenUseCase",
            useClass: VerifyCodeTokenUseCaseImpl
        },
        {
            provide: "TokenRepository",
            useClass: TokenRepositoryAdapter
        }
    ],
    exports: [TokenService]
})
export class TokenModule {}