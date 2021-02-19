import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

}

export default User;