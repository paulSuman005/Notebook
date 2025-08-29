import { NextFunction, Request, Response } from "express";

const errorMeddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "something went to wrong";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

export default errorMeddleware;