import "reflect-metadata";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";

import Application from "./app/Application";
import UserController from "./controller/UserController";
import GenericErrorHandler from "./middleware/error/GenericErrorHandler";
import JsonBodyParserMiddleware from "./middleware/JsonBodyMiddleware";
import JsonContentTypeMiddleware from "./middleware/JsonContentTypeMiddleware";
import JwtAuthenticationMiddleware from "./middleware/JwtAuthenticationMiddleware";


function callback() {
    console.log("Express server running.")
}

async function init() {
    
    // Load environment variables
    dotenv.config();

    // Create database connection
    await createConnection();

    // Setup middleware and controllers
    const application = new Application("localhost", 8000);
    application.addMiddleware(JsonBodyParserMiddleware);
    application.addMiddleware(JsonContentTypeMiddleware);
    application.addMiddleware(JwtAuthenticationMiddleware, ["/users"]);
    application.addMiddleware(UserController, ["/users"]);
    application.addMiddleware(GenericErrorHandler);
    application.start(callback);

}

init(); 