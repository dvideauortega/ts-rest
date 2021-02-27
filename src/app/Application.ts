import ExpressApplication, { Express, json, NextFunction, Request, Response } from "express";
import Controller from "../controller/Controller";


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
        this.express.use((req: Request, res: Response, next: NextFunction) => { res.setHeader("Content-Type", "application/json"); next()});
    }

    public start(callbackFunction: () => void): void {
        this.express.listen({ host: this.host, port: this.port }, callbackFunction);
    }


    public addController(basePath: string, ControllerClass: { new (): Controller }): void {
        let router = new ControllerClass().getRouter();
        this.express.use(basePath, router);
    }

}

export default Application;
