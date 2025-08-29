class AppError extends Error {
    statusCode: number;
    explanation: string;
    constructor(message: any, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;
    }
}

export default AppError;