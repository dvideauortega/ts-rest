import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

class UserService {

    private userRepository: Repository<User> = getRepository(User);

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async saveOrUpdate(user: User): Promise<User> {
        return await this.userRepository.save(user);
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