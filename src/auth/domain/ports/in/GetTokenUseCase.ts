import { TokenDTO } from "src/auth/domain/dtos/TokenDTO";

export interface GetTokenUseCase {
    getToken(token: string, type: string): Promise<TokenDTO>;
}