class InvalidUuidError extends Error {

    constructor() {
        super("Invalid UUID");
        this.name = "InvalidUuidError";
    }

}

export default InvalidUuidError;