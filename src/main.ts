import "reflect-metadata";
import { createConnection } from "typeorm";
import Application from "./app/Application";
import UserController from "./controller/UserController";
import GenericErrorHandler from "./middleware/error/GenericErrorHandler";
import JsonBodyParserMiddleware from "./middleware/JsonBodyMiddleware";
import JsonContentTypeMiddleware from "./middleware/JsonContentTypeMiddleware";


function callback() {
    console.log("Express server running.")
}

async function init() {
    await createConnection();
    const application = new Application("localhost", 8000);
    application.addMiddleware(JsonBodyParserMiddleware);
    application.addMiddleware(JsonContentTypeMiddleware);
    application.addMiddleware(UserController, "/users");
    application.addMiddleware(GenericErrorHandler);
    application.start(callback);
}

init(); 