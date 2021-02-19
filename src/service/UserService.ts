import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

class UserService {

    private userRepository: Repository<User> = getRepository(User); // TODO: inject repository from TypeORM here.

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

}

export default UserService;