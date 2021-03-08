import ExpressApplication, { Express } from "express";
import Controller from "../controller/Controller";
import ErrorMiddleware from "../middleware/types/ErrorMiddleware";
import Middleware from "../middleware/types/Middleware";
import { ClassReference } from "../types/Middleware.types";


class Application {

    private host: string;
    private port: number;
    private express: Express;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        this.express = ExpressApplication();
    }

    public start(callbackFunction: () => void): void {
        this.express.listen({ host: this.host, port: this.port }, callbackFunction);
    }
    
    public addMiddleware(T: ClassReference<Middleware> | ClassReference<ErrorMiddleware> | ClassReference<Controller>, paths: string[] = ["/"]) {
        
        const instance: Middleware | ErrorMiddleware | Controller = new T();

        for (let i = 0; i < paths.length; i++) {
            if (instance instanceof Controller) this.express.use(paths[i], instance.getRouter());
            else this.express.use(paths[i], instance.execute);
        }
        
    }

}

export default Application;
