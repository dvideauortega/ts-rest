import { Express, Request, Response, NextFunction, Router } from "express";

import Controller from "./Controller";

class UserController extends Controller {

    private findAll(request: Request, response: Response, next: NextFunction): void {
        response.end("Hello from users controller");
    }

    public configure(router: Router): void {
        router.get("/", this.findAll);
    }

}

export default UserController;
