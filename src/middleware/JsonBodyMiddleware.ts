import { json, NextFunction, Request, Response } from "express";
import Middleware from "./types/Middleware";

class JsonBodyParserMiddleware implements Middleware {

    execute(request: Request, response: Response, next: NextFunction): void {
        const fn = json();
        fn(request, response, next);
    }

}

export default JsonBodyParserMiddleware;