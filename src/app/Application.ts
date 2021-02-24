import ExpressApplication, { ErrorRequestHandler, Express, json, NextFunction, Request, Response } from "express";
import Controller from "../controller/Controller";
import ApiError from "../entities/errors/ApiError";


class Application {

    private host: string;
    private port: number;
    private express: Express;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        this.express = ExpressApplication();

        // Adding middleware. Should refactor this
        this.express.use(json());
    }

    public start(callbackFunction: () => void): void {
        this.express.listen({ host: this.host, port: this.port }, callbackFunction);
    }


    public addController(basePath: string, ControllerClass: { new (): Controller }): void {
        let router = new ControllerClass().getRouter();
        this.express.use(basePath, router);
    }

    public addErrorHandler(errorHandler: (error: ApiError, request: Request, response: Response, next: NextFunction) => void) {
        this.express.use(errorHandler);
    }

}

export default Application;
