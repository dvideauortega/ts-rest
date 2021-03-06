import { Column, Entity, PrimaryColumn } from "typeorm";
import Uuid from "./Uuid";


@Entity({name: "users"})
class User {

    @PrimaryColumn({type: "binary", length: 16})
    private idField: Buffer;

    @Column({unique: true})
    private username: string;

    @Column()
    private password: string;

    constructor(username: string, password: string, idField?: Buffer) {
        
        if (idField) 
            this.idField = idField;
        else 
            this.idField = new Uuid().asBuffer();
        
        this.username = username;
        this.password = password;

    }

    public getId(): Uuid {
        return new Uuid(this.idField);
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