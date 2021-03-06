import ApiError from "./ApiError";

class UserAlreadyExistsError extends ApiError {

    constructor() {
        super("AlreadyExistsError", "The user already exists");
        this.statusCode = 500;
    }

}

export default UserAlreadyExistsError;