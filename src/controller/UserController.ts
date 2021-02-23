import { Request, Response, NextFunction, Router } from "express";
import UserDTO from "../entities/dto/UserDTO";
import UserService from "../service/UserService";
import Controller from "./Controller";


class UserController extends Controller {

    private userService: UserService = new UserService();

    private async findAll(request: Request, response: Response, next: NextFunction): Promise<void> {
        let users = await this.userService.findAll();
        let data = JSON.stringify({ data: users });
        response.end(data);
    }

    private findById(request: Request, response: Response, next: NextFunction): void {
        response.end(`${request.method} ${request.url}`);
    }

    private async save(request: Request, response: Response, next: NextFunction): Promise<void> {
        let savedUserDto: UserDTO = await this.userService.saveOrUpdate(request.body.username, request.body.password);
        let jsonUserDto: string = JSON.stringify(savedUserDto);
        response.status(201).end(jsonUserDto);
    }

    private replace(request: Request, response: Response, next: NextFunction): void {
        response.end(`${request.method} ${request.url}`);
    }

    private update(request: Request, response: Response, next: NextFunction): void {
        response.end(`${request.method} ${request.url}`);
    }

    private delete(request: Request, response: Response, next: NextFunction): void {
        response.end(`${request.method} ${request.url}`);
    }

    public configure(router: Router): void {

        /* Note: I can't reference private properties of this class without binding,
         * because doing that results on that property being undefined, so I necessarily
         * need to do an explicit binding so that 'this' inside these methods references
         * the current class
         */

        router.get("/", this.findAll.bind(this));
        router.get("/:id", this.findById.bind(this));
        router.post("/", this.save.bind(this));
        router.put("/", this.replace.bind(this));
        router.patch("/", this.update.bind(this));
        router.delete("/", this.delete.bind(this));

    }

}

export default UserController;
