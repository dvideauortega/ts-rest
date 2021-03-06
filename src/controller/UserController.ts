import { Request, Response, NextFunction, Router } from "express";
import UserDTO from "../entities/dto/UserDTO";
import InvalidUuidError from "../errors/InvalidUuid.error";
import RequiredArgumentError from "../errors/RequiredArgument.error";
import UserService from "../service/UserService";
import UuidUtils from "../utils/UuidUtils";
import Controller from "./Controller";


class UserController extends Controller {

    private userService: UserService = new UserService();

    private async findAll(request: Request, response: Response, next: NextFunction): Promise<void> {
        let users = await this.userService.findAll();
        let data = JSON.stringify({ data: users });
        response.end(data);
    }

    private async findById(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let user: UserDTO = await this.userService.findById(request.params.id);
            response.status(203).end(JSON.stringify(user));
        } catch (error) {
            next(error);
        }
        
    }

    private async save(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let savedUserDto: UserDTO = await this.userService.saveOrUpdate(request.body.username, request.body.password);
            let jsonUserDto: string = JSON.stringify(savedUserDto);
            response.status(201).end(jsonUserDto);
        } catch(error) {
            next(error);
        }
        
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

    private validateUserCreationFields(request: Request, response: Response, next: NextFunction) {
        if (!request.body.username || !request.body.password)
            throw new RequiredArgumentError();
        next();
    }

    private validateUserUuid(request: Request, response: Response, next: NextFunction) {
        if (!request.params.id)
            throw new RequiredArgumentError();
        
        if (!UuidUtils.isValid(request.params.id))
            throw new InvalidUuidError();
        
        next();
    }

    public configure(router: Router): void {

        /* Note: I can't reference private properties of this class without binding,
         * because doing that results on that property being undefined, so I necessarily
         * need to do an explicit binding so that 'this' inside these methods references
         * the current class
         */

        router.get("/", this.findAll.bind(this));
        router.get("/:id", this.validateUserUuid, this.findById.bind(this));
        router.post("/", this.validateUserCreationFields, this.save.bind(this));
        router.put("/", this.replace.bind(this));
        router.patch("/", this.update.bind(this));
        router.delete("/", this.delete.bind(this));

    }

}

export default UserController;
