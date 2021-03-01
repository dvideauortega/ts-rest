import { NextFunction, Request, Response } from "express";
import Middleware from "./types/Middleware";

class JsonContentTypeMiddleware implements Middleware {

    execute(request: Request, response: Response, next: NextFunction): void {
        response.setHeader("Content-Type", "application/json");
        next();
    }

}

export default JsonContentTypeMiddleware;