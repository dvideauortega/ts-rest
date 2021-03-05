class RequiredArgumentError extends Error {

    constructor() {
        super("Required argument is null or undefined");
        this.name = "RequiredArgumentError";
    }

}

export default RequiredArgumentError;