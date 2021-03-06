import ApiError from "./ApiError";

class InvalidUuidError extends ApiError {

    constructor() {
        super("InvalidUuidError", "UUID provided is not valid");
        this.statusCode = 500;
    }

}

export default InvalidUuidError;