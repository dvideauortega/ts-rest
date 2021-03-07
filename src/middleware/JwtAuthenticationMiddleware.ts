import * as process from "process";

import { NextFunction, Request, Response } from "express";
import BadAuthorizationHeaderError from "../errors/BadAuthorizationHeaderError";
import UserNotAuthenticatedError from "../errors/UserNotAuthenticatedError";
import Middleware from "./types/Middleware";

import * as jwtLib from "jsonwebtoken";

class JwtAuthenticationMiddleware implements Middleware {

    public execute(request: Request, response: Response, next: NextFunction) {
        if (!request.headers.authorization) 
            throw new UserNotAuthenticatedError();
        
        // Parse header
        
        const header = request.headers.authorization.split(" ");
        if (header.length != 2 || header[0] != "Bearer") throw new BadAuthorizationHeaderError();
        const token = header[1];

        // Validate token and continue if succeded, otherwise throw

        try {
            const secret = process.env.JWT_SECRET as (string | Buffer | { key: string | Buffer; passphrase: string });
            request.body.authToken = jwtLib.verify(token, secret);
            next();    
        } catch (error) {
            throw new BadAuthorizationHeaderError();
        }
        
    }

}

export default JwtAuthenticationMiddleware;