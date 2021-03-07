import ApiError from "./ApiError";

class BadAuthorizationHeaderError extends ApiError {

    constructor() {
        super("BadAuthorizationError", "The Authorization header provided is malformed and couldn't be correctly parsed.");
        this.statusCode = 503;
    }

}

export default BadAuthorizationHeaderError;