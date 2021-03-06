import User from "../User";
import * as uuid from "uuid";


class UserDTO {

    private id: string;
    private username: string;

    constructor(id: string, username: string) {
        if (!id || !username) throw new Error("Neither ID nor username can be empty");
        if (!uuid.validate(id)) throw new Error("Invalid UUID was passed");
        if (id === uuid.NIL) throw new Error("The ID shouldn't be a NIL UUID");

        this.id = id;
        this.username = username;
    }

    public getId(): string {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public static fromUser(user: User): UserDTO {
        let id = user.getId().asString();
        let username = user.getUsername();
        return new UserDTO(id, username);
    }

}

export default UserDTO;