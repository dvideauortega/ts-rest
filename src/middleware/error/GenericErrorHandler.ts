import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import ErrorMiddleware from "../types/ErrorMiddleware";


class GenericErrorHandler implements ErrorMiddleware {

    public execute(error: ApiError, request: Request, response: Response, next: NextFunction) {
        response.status(error.statusCode).end(JSON.stringify({reason: error.name}));
    }

}

export default GenericErrorHandler;