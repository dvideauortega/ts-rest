import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";

interface ErrorMiddleware {

    execute(error: ApiError, request: Request, response: Response, next: NextFunction): void;

}

export default ErrorMiddleware;