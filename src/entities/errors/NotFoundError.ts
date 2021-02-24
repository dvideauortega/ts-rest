import ApiError from "./ApiError";

class NotFoundError extends ApiError {

    constructor() {
        super("Not found", "The resource specified couldn't be found in the server.");
        this.statusCode = 404;
    }
}

export default NotFoundError;