import * as jwtLib from "jsonwebtoken";

import User from "../entities/User";
import BadCredentialsError from "../errors/BadCredentialsError";
import { JwtSecret } from "../types/JwtSecret.types";
import UserService from "./UserService";

class AuthService {

    private userService: UserService;

    constructor(userService?: UserService) {
        if (!userService) this.userService = new UserService();
        else this.userService = userService;
    }

    public async login(username: string, password: string): Promise<string> {
        const secret: JwtSecret = process.env.JWT_SECRET as JwtSecret;
        const exists = await this.userService.existsByUsername(username);
        if (!exists) throw new BadCredentialsError();
        
        
        const user: User = await this.userService.findByUsername(username);
        if (user.getUsername() == username && user.getPassword() == password)
            return jwtLib.sign({id: user.getId().asString(), username: user.getUsername()}, secret);
        else throw new BadCredentialsError();
    }

}

export default AuthService;