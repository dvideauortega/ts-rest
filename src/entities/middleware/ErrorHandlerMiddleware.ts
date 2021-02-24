import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../../entities/errors/ApiError";

class ErrorHandlerMiddleware {

    public fn(error: ApiError, request: Request, response: Response, next: NextFunction) {
        response.status(error.statusCode).end(JSON.stringify({reason: error.name}));
    }

}

export default ErrorHandlerMiddleware