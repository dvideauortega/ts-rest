import ExpressApplication, { Express } from "express";
import Controller from "../controller/Controller";


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


    public addController(basePath: string, ControllerClass: { new (): Controller }): void {
        let router = new ControllerClass().getRouter();
        this.express.use(basePath, router);
    }

}

export default Application;
