import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Uuid from "./Uuid";

@Entity({name: "users"})
class User {

    private idObject = new Uuid();

    @PrimaryColumn({type: "binary", length: 16})
    private id;

    @Column({unique: true})
    private username: string;

    @Column()
    private password: string;

    constructor(username: string, password: string) {
        this.idObject = new Uuid();    
        this.id = this.idObject.getBuffer();
        this.username = username;
        this.password = password;
    }

    public getId(): Uuid {
        return this.idObject;
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