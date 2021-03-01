import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";

export type ExpressHandlerFunction = (request: Request, response: Response, next: NextFunction) => void;
export type ExpressErrorHandlerFunction = (error: ApiError, request: Request, response: Response, next: NextFunction) => void;
export type ClassReference<T> = new () => T;