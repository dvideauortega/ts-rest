import "reflect-metadata";
import { createConnection } from "typeorm";
import Application from "./app/Application";
import UserController from "./controller/UserController";


function callback() {
    console.log("Express server running.")
}

async function init() {
    await createConnection();
    const application = new Application("localhost", 8000);
    application.addController("/users", UserController);
    application.start(callback);
}

init();