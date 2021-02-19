import { Request, Response, NextFunction, Router } from "express";
import User from "../entities/User";
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
        let user = new User(request.body.username, request.body.password);
        user = await this.userService.saveOrUpdate(user);
        response.end(JSON.stringify(user));
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
