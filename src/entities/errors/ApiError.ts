class ApiError extends Error {

    public statusCode: number = 500;

    constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }

}

export default ApiError;