import ApiError from "./ApiError";

class RequiredArgumentError extends ApiError {

    constructor() {
        super("RequiredArgumentError","Required argument is null or undefined");
        this.statusCode = 500;
    }

}

export default RequiredArgumentError;