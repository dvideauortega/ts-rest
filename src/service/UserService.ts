import { getRepository, Repository } from "typeorm";
import UserDTO from "../entities/dto/UserDTO";
import User from "../entities/User";

class UserService {

    private userRepository: Repository<User> = getRepository(User);

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async saveOrUpdate(username: string, password: string): Promise<UserDTO> {
        if (!username || !password)
            throw new Error("User fields are invalid")
        let user = new User(username, password);
        let saved: User = await this.userRepository.save(user);
        return UserDTO.fromUser(saved);
    }

    /*public async updateById(id: number, newUsername: string): Promise<any> {
        let result = await this.userRepository.update({ id }, { username: newUsername });
        return result
    }

    public async deleteById(id: number): Promise<void> {
        let result = await this.userRepository.delete({id});
    }*/

}

export default UserService;