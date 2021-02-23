import { getRepository, Repository } from "typeorm";
import UserDTO from "../entities/dto/UserDTO";
import User from "../entities/User";

class UserService {

    private userRepository: Repository<User> = getRepository(User);

    public async findAll(): Promise<UserDTO[]> {
        let users: User[] = await this.userRepository.find();
        let dtos: UserDTO[] = [];
        
        users.forEach(user => 
            dtos.push(UserDTO.fromUser(user))
        );

        return dtos;
    }

    public async saveOrUpdate(username: string, password: string): Promise<UserDTO> {
        if (!username || !password)
            throw new Error("User fields are invalid")
        let user = new User(username, password);
        let saved: User = await this.userRepository.save(user);
        return UserDTO.fromUser(saved);
    }

}

export default UserService;