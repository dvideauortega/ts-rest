import ApiError from "./ApiError";

class BadAuthorizationHeaderError extends ApiError {

    constructor() {
        super("BadAuthorizationError", "The Authorization header provided is invalid or couldn't be parsed.");
        this.statusCode = 503;
    }

}

export default BadAuthorizationHeaderError;