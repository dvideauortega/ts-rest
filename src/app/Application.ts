import ExpressApplication, { Express } from "express";
import Controller from "../controller/Controller";
import ErrorMiddleware from "../middleware/types/ErrorMiddleware";
import Middleware from "../middleware/types/Middleware";
import { ExpressHandlerFunction, ClassReference, ExpressErrorHandlerFunction } from "../types/Middleware.types";


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
    
    public addMiddleware(T: ClassReference<Middleware> | ClassReference<ErrorMiddleware> | ClassReference<Controller>, path: string = "/") {
        const instance: Middleware | ErrorMiddleware | Controller = new T();
        if (instance instanceof Controller) this.express.use(path, instance.getRouter());
        else this.express.use(instance.execute);
    }

}

export default Application;
