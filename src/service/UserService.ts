import { getRepository, Repository } from "typeorm";
import UserDTO from "../entities/dto/UserDTO";
import NotFoundError from "../errors/NotFoundError";
import User from "../entities/User";
import UuidUtils from "../utils/UuidUtils";


class UserService {

    private userRepository: Repository<User>;

    constructor(userRepository?: Repository<User>) {
        if (!userRepository) this.userRepository = getRepository(User);
        else this.userRepository = userRepository;
    }

    public async findAll(): Promise<UserDTO[]> {
        let users: User[] = await this.userRepository.find();
        let dtos: UserDTO[] = [];
        users.forEach(user => 
            dtos.push(UserDTO.fromUser(user))
        );

        return dtos;
    }

    public async findById(uuidString: string): Promise<UserDTO> {
        let id: Buffer = UuidUtils.stringToBuffer(uuidString);
        let user = await this.userRepository.findOne( { where: { id } } );
        if (user)
            return UserDTO.fromUser(user);
        else
            throw new NotFoundError();
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