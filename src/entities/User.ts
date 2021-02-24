import { Column, Entity, PrimaryColumn } from "typeorm";
import UuidUtils from "../utils/UuidUtils";


@Entity({name: "users"})
class User {

    @PrimaryColumn({type: "binary", length: 16})
    private id: Buffer;

    @Column({unique: true})
    private username: string;

    @Column()
    private password: string;

    constructor(username: string, password: string, id?: Buffer) {
        if (!id) 
            this.id = UuidUtils.randomBufferUuid();
        else 
            this.id = id;
        this.username = username;
        this.password = password;
    }

    public getId(): Buffer {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(newUsername: string): void {
        this.username = newUsername;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(newPassword: string): void {
        this.username = newPassword;
    }

}

export default User;