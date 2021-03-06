import { Column, Entity, PrimaryColumn } from "typeorm";
import Uuid from "./Uuid";


@Entity({name: "users"})
class User {

    @PrimaryColumn({type: "binary", length: 16, name: "id"})
    private id: Buffer;

    @Column({unique: true})
    private username: string;

    @Column()
    private password: string;

    constructor(username: string, password: string, bufferId?: Buffer) {
        
        if (bufferId) 
            this.id = bufferId;
        else 
            this.id = new Uuid().asBuffer();
        
        this.username = username;
        this.password = password;

    }

    public getId(): Uuid {
        return new Uuid(this.id);
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