import { Express, Request, Response, NextFunction, Router } from "express";

import Controller from "./Controller";

class UserController extends Controller {

    private findAll(request: Request, response: Response, next: NextFunction): void {
        response.end(`${request.method} ${request.url}`);
    }

    private findById(request: Request, response: Response, next: NextFunction): void {
        response.end(`${request.method} ${request.url}`);
    }

    private save(request: Request, response: Response, next: NextFunction): void {
        response.end(`${request.method} ${request.url}`);
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
        router.get("/", this.findAll);
        router.get("/:id", this.findById);
        router.post("/", this.save);
        router.put("/", this.replace);
        router.patch("/", this.update);
        router.delete("/", this.delete);
    }

}

export default UserController;
