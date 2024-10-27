import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";
export class UserRequest {
    constructor(
        public contact_uuid: string,
        // public name: string, // se debe jalar de contact
        // public last_name: string, // se debe jalar de contact
        public nickname: string,
        // public email: string, // se debe jalar de contact
        public password: string,
        // public phone: string, // se debe jalar de contact
        // public code?: string | null, // se debe generar, guardar en la BD y enviar en un hilo al momento de crear el usuario
        // public code_created_at?: Date | null, // se debe inicializar con la fecha actual al momento de crear el codigo
        // public phone_verified?: PhoneVerified | null, // se debe inicalizar en INACTIVE hasta que se verifique el código (hace peticion path)
        public avatar?: string | null,
        // public user_created_at?: Date | null, // se debe inicializar con la fecha actual al momento de crear el usuario
    ){}
}