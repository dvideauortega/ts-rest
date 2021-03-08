import { NextFunction, Request, Response, Router } from "express";
import UserDTO from "../entities/dto/UserDTO";
import AuthService from "../service/AuthService";
import Controller from "./Controller";

class AuthController extends Controller {

    private authService: AuthService;

    constructor(authService?: AuthService) {
        
        super();
        
        if (!authService) this.authService = new AuthService();
        else this.authService = authService;
        
    }

    private async login(request: Request, response: Response, next: NextFunction): Promise<void> {
        
        let jwt: string;
        
        try {
            jwt = await this.authService.login(request.body.username, request.body.password);
            const json = JSON.stringify({ token: jwt });
            response.end(json);
        } catch (error) {
            next(error);
        }
        
    }

    public async register(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let user: Promise<UserDTO> = this.authService.register(request.body.username, request.body.password);
            response.end(JSON.stringify(user));
        } catch (error) {
            next(error);
        }
    }

    public configure(router: Router): void {
        router.post("/login", this.login.bind(this));
        router.post("/register", this.register.bind(this));
    }

}

export default AuthController;