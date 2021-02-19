import "reflect-metadata";
import Application from "./app/Application";
import UserController from "./controller/UserController";


function callback() {
    console.log("Express server running.")
}

const application = new Application("localhost", 8000);
application.addController("/users", UserController);
application.start(callback);
