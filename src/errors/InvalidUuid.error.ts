import ApiError from "./ApiError";

class InvalidUuidError extends ApiError {

    constructor() {
        super("InvalidUuid", "UUID provided is not valid");
        this.statusCode = 500;
    }

}

export default InvalidUuidError;