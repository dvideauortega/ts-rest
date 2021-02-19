import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { isNullOrUndefined } from "util";
import { v4 } from "uuid";

@Entity({name: "users"})
class User {
    // TODO: make this column binary(16) and use buffers instead of plain strings
    @PrimaryColumn({type: "varchar", length: 36})
    private id: string;

    @Column({unique: true})
    private username: string;

    @Column()
    private password: string;

    constructor(username: string, password: string) {
        //this.id = Buffer.alloc(32, v4().split("-").join(), "utf-8");
        this.id = v4();
        this.username = username;
        this.password = password;
    }

}

export default User;