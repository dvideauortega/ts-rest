import UuidUtils from "../../utils/UuidUtils";
import User from "../User";


class UserDTO {

    private id: string;
    private username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

    public static fromUser(user: User): UserDTO {
        let id = UuidUtils.bufferToString(user.getId());
        let username = user.getUsername();
        return new UserDTO(id, username);
    }

}

export default UserDTO;