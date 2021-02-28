import { json } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import Application from "./app/Application";
import UserController from "./controller/UserController";
import GenericErrorHandler from "./entities/middleware/GenericErrorHandler";
import JsonMiddleware from "./entities/middleware/JsonMiddleware";


function callback() {
    console.log("Express server running.")
}

async function init() {
    await createConnection();
    const application = new Application("localhost", 8000);
    application.addMiddlewareFunction(json());
    application.addMiddlewareClass(JsonMiddleware);
    application.addController("/users", UserController);
    application.addErrorHandler(GenericErrorHandler);
    application.start(callback);
}

init(); 