import User from "../User";
import Uuid from "../Uuid";

class UserDTO {

    private id: string;
    private username: string;

    constructor(id: Uuid, username: string) {
        this.id = id.getDashedString();
        this.username = username;
    }

    public static fromUser(user: User): UserDTO {
        let id = user.getId();
        let username = user.getUsername();
        return new UserDTO(id, username);
    }

}

export default UserDTO;