import ExpressApplication, { ErrorRequestHandler, Express, json, NextFunction, Request, Response } from "express";
import Controller from "../controller/Controller";
import ApiError from "../entities/errors/ApiError";
import ErrorMiddleware from "../entities/middleware/ErrorMiddleware";
import Middleware from "../entities/middleware/Middleware";


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

    public addMiddleware(MiddlewareClass: { new (): Middleware}, path?: string): void {
        const handler = new MiddlewareClass().execute;
        if (!path) this.express.use(handler);
        else this.express.use(path, handler);
    }

    public addErrorHandler(ErrorMiddlewareClass: { new (): ErrorMiddleware }): void {
        let handler = new ErrorMiddlewareClass().execute;
        this.express.use(handler);
    }

}

export default Application;
