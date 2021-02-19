import { Router } from "express";

abstract class Controller {

    private router: Router = Router();

    constructor() {
        this.configure(this.router);
    }

    public getRouter(): Router {
        return this.router;
    }

    public abstract configure(router: Router): void;

}

export default Controller;
