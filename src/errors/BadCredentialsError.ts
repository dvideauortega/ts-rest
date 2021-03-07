import ApiError from "./ApiError";

class BadCredentialsError extends ApiError {

    constructor() {
        super("BadCredentialsError", "Credentials provided are wrong so user couldn't authenticate.");
        this.statusCode = 401;
    }

}

export default BadCredentialsError;