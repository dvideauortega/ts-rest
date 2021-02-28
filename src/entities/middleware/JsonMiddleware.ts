import { NextFunction, Request, Response } from "express";
import Middleware from "./Middleware";

class JsonMiddleware implements Middleware {

    execute(request: Request, response: Response, next: NextFunction): void {
        response.setHeader("Content-Type", "application/json");
        next();
    }

}

export default JsonMiddleware;