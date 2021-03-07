import { getConnection, getRepository, QueryBuilder, QueryFailedError, Repository, SelectQueryBuilder } from "typeorm";
import UserDTO from "../entities/dto/UserDTO";
import NotFoundError from "../errors/NotFoundError";
import User from "../entities/User";
import UserAlreadyExistsError from "../errors/UserAlreadyExistsError";
import Uuid from "../entities/Uuid";


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
        let id: Buffer = new Uuid(uuidString).asBuffer();
        let user = await this.userRepository.findOne( { where: { id } } );
        if (user)
            return UserDTO.fromUser(user);
        else
            throw new NotFoundError();
    }

    public async existsByUsername(username: string): Promise<boolean> {
        const exists = await this.userRepository.count({ where: { username }});
        if (exists) 
            return true;
        else 
            return false
    }

    public async findByUsername(username: string): Promise<User> {
        let user: User | undefined = await this.userRepository.findOne( { where: { username } } );
        if (user)
            return user;
        else
            throw new NotFoundError();
    }

    public async saveOrUpdate(username: string, password: string): Promise<UserDTO> {
        
        // Check existence
        const exists = await this.existsByUsername(username);
        if (exists) throw new UserAlreadyExistsError();

        // If doesn't exist, insert.
        let user: User = new User(username, password);
        user = await this.userRepository.save(user);
        
        // Return DTO result
        return UserDTO.fromUser(user);
        
    }
    
}

export default UserService;