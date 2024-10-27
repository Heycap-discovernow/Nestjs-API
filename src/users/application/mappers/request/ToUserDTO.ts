import { UserRequest } from "../../dtos/request/UserRequest";
import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";

// export class UserMapper {
//     public static toUserDTO(userRequest: UserRequest): UserDTO {
//       const now = new Date();
//       return {
//         uuid: uuidv4(),
//         contact_uuid: userRequest.contact_uuid,
//         name: userRequest.name,
//         last_name: userRequest.last_name,
//         nickname: userRequest.nickname,
//         email: userRequest.email,
//         password: userRequest.password,
//         phone: userRequest.phone,
//         phone_verified: userRequest.phone_verified || PhoneVerified.INACTIVE,
//         avatar: userRequest.avatar,
//         code: userRequest.code || '',
//         code_created_at: now,
//         code_updated_at: now,
//         user_created_at: now,
//         user_updated_at: now,
//         user_deleted_at: null,
//       };
//     }
// }