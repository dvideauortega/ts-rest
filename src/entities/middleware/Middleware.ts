import { NextFunction, Request, Response } from "express";

interface Middleware {

    execute(request: Request, response: Response, next: NextFunction): void;

}

export default Middleware;