import JWT, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/errors/app.error';
import { AuthRequest } from '../utils/interface/interface';


const isLoggedIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) return next(new AppError('Unauthenticated, please login again', 401));

    const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

    try {
        const userDetails = JWT.verify(accessToken, JWT_SECRET) as JwtPayload & { id: string; email: string };
        req.user = userDetails;
        next();
    } catch (err) {
        return next(new AppError('Invalid or expired token, please login again', 401));
    }
};

export {
    isLoggedIn
}