import { IsInt, IsString, IsBoolean, IsDate } from "class-validator"; // Type validators
import { IsUUID, IsEmail, IsMobilePhone, MaxLength, MinLength } from "class-validator"; // String validators
import { IsOptional } from "class-validator"; // Optional validators

import { v4 as uuidv4 } from 'uuid';

export class User {
    @IsOptional()
    @IsInt()
    public userId: number | undefined;
    
    @IsString()
    @IsUUID()
    public uuid: string;
    
    @IsString()
    public name: string;
    
    @IsString()
    public last_name: string;

    @IsString()
    @MaxLength(30)
    public nickname: string;
    
    @IsString()
    @IsEmail()
    public email: string;
    
    @IsString()
    @MinLength(8)
    public password: string;
    
    @IsString()
    @IsMobilePhone('es-MX')
    public phone: string;
    
    @IsOptional()
    @IsBoolean()
    public phone_verified?: boolean | undefined;
    
    @IsOptional()
    @IsString()
    public avatar?: string | undefined;
    
    @IsOptional()
    @IsString()
    @MaxLength(4)
    public code?: string | undefined;
    
    @IsOptional()
    @IsDate()
    public code_created_at?: Date | undefined;
    
    @IsOptional()
    @IsDate()
    public created_at?: Date | undefined;

    constructor(
        name: string,
        last_name: string,
        nickname: string,
        email: string,
        password: string,
        phone: string,
        phone_verified?: boolean,
        avatar?: string,
        code?: string,
        code_created_at?: Date,
        created_at?: Date,
    ){
        this.name = name;
        this.last_name = last_name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.phone_verified = phone_verified;
        this.avatar = avatar;
        this.code = code;
        this.code_created_at = code_created_at;
        this.created_at = created_at;
    }

    public generate(): void {
        this.uuid = uuidv4();
    }
}