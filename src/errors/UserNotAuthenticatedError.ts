import ApiError from "./ApiError";

class UserNotAuthenticatedError extends ApiError {

    constructor() {
        super("UserNotAuthenticatedError", "User is not authenticated and cannot access the specified resource.");
        this.statusCode = 401;
    }

}

export default UserNotAuthenticatedError;