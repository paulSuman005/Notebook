import { NextFunction, Request, Response } from 'express';
import successResponse from '../utils/common/success_response';
import { StatusCodes } from 'http-status-codes';
import { generateOTP } from '../utils/common/helper';
import emailValidator from 'validator';
import AppError from '../utils/errors/app.error';
import User from '../model/userSchema';
import { AuthRequest } from '../utils/interface/interface';
import Note from '../model/noteSchema';

const signup = async (req: Request, res: Response, next: NextFunction ) => {
    const { name, email, dateOfBirth } = req.body;
    try {
        if (!name || !email || !dateOfBirth) {
            return next(new AppError('All fields are required!', StatusCodes.BAD_REQUEST));
        }

        const isValidEmail = emailValidator.isEmail(email);
        if (!isValidEmail) {
            return next(new AppError('Invalid email', StatusCodes.BAD_REQUEST));
        }
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

        const isExist = await User.findOne({ email });
        if(isExist && isExist.isEmailVerified) {
            return next(new AppError('Email already exists. Please login.', StatusCodes.BAD_REQUEST));
        }
        //sending otp to user email

        if (isExist) {
            isExist.name = name;
            isExist.dateOfBirth = dateOfBirth;
            isExist.verificationOTP = otp;
            isExist.VerificationOTPExpiry = otpExpiry;
            await isExist.save();
        } else {
            await User.create({
                name,
                email,
                dateOfBirth,
                verificationOTP: otp,
                VerificationOTPExpiry: otpExpiry
            });
        }
        successResponse.message = 'OTP sent to email successfully';
        successResponse.data = { email };
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        next(new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    try {
        if (!email || !otp) {
            return next(new AppError('All fields are required!', StatusCodes.BAD_REQUEST));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('User not found', StatusCodes.NOT_FOUND));
        }
        if (user.isEmailVerified) {
            return next(new AppError('Email is already verified. Please login.', StatusCodes.BAD_REQUEST));
        }
        if (user.verificationOTP !== otp || !user.VerificationOTPExpiry || user.VerificationOTPExpiry < new Date()) {
            return next(new AppError('Invalid or expired OTP', StatusCodes.BAD_REQUEST));
        }

        user.isEmailVerified = true;
        user.verificationOTP = undefined;
        user.VerificationOTPExpiry = undefined;

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save();
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        user.refreshToken = undefined;
        successResponse.message = 'Email verified successfully';
        successResponse.data = user;
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        next(new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
        if (!email) {
            return next(new AppError('Email is required!', StatusCodes.BAD_REQUEST));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('User not found', StatusCodes.NOT_FOUND));
        }
        if (user.isEmailVerified) {
            return next(new AppError('Email is already verified. Please login.', StatusCodes.BAD_REQUEST));
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

        user.verificationOTP = otp;
        user.VerificationOTPExpiry = otpExpiry;

        await user.save();
        //sending otp to user email

        successResponse.message = 'OTP sent to email successfully';
        successResponse.data = { email };
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        next(new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
        if (!email) {
            return next(new AppError('Email is required!', StatusCodes.BAD_REQUEST));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('User not found', StatusCodes.NOT_FOUND));
        }
        if (!user.isEmailVerified) {
            return next(new AppError('Email is not verified. Please verify your email.', StatusCodes.BAD_REQUEST));
        }
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

        user.verificationOTP = otp;
        user.VerificationOTPExpiry = otpExpiry;

        await user.save();
        //sending otp to user email

        successResponse.message = 'OTP sent to email successfully';
        successResponse.data = { email };
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        next(new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp, keepLoggedIn } = req.body;
    try {
        if (!email || !otp) {
            return next(new AppError('Email and Otp are required!', StatusCodes.BAD_REQUEST));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('User not found', StatusCodes.NOT_FOUND));
        }
        if (user.verificationOTP !== otp || !user.VerificationOTPExpiry || user.VerificationOTPExpiry < new Date()) {
            return next(new AppError('Invalid or expired OTP', StatusCodes.BAD_REQUEST));
        }
        const accessToken = await user.generateAccessToken(keepLoggedIn);
        const refreshToken = await user.generateRefreshToken(keepLoggedIn);

        user.refreshToken = refreshToken;
        user.verificationOTP = undefined;
        user.VerificationOTPExpiry = undefined;
        await user.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: true,
            sameSite: "strict",
            maxAge: keepLoggedIn ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true,
            sameSite: "strict",
            maxAge: keepLoggedIn ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
        });

        user.refreshToken = undefined;
        successResponse.message = 'User signed in successfully';
        successResponse.data = user;
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        next(new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    try {
        const user = await User.findById(userId).select('-refreshToken -__v -verificationOTP -VerificationOTPExpiry');
        if (!user) {
            return next(new AppError('User not found', StatusCodes.NOT_FOUND));
        }
        successResponse.message = 'User fetched successfully';
        successResponse.data = user;
        res.status(StatusCodes.OK).json(successResponse);
    } catch (err: any) {
        next(new AppError(err.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }

}

const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(new AppError('User not found', StatusCodes.NOT_FOUND));
        }
        user.refreshToken = undefined;
        await user.save();
        res.clearCookie("accessToken", {
            httpOnly: true,
            // secure: true,
            sameSite: "strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            // secure: true,
            sameSite: "strict",
        });
        successResponse.message = 'User logged out successfully';
        res.status(StatusCodes.OK).json(successResponse);
    } catch (err: any) {
        next(new AppError(err.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const createNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { content } = req.body;
    try {
        if (!content) {
            return next(new AppError('All fields are required!', StatusCodes.BAD_REQUEST));
        }
        const user = await User.findById(userId);
        if (!user) {
            return next(new AppError('User not found', StatusCodes.NOT_FOUND));
        }
        
        const newNote = await Note.create({
            userId: userId,
            content
        });

        successResponse.message = 'Note created successfully';
        successResponse.data = newNote;
        res.status(StatusCodes.OK).json(successResponse);
    } catch (err: any) {
        next(new AppError(err.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const deleteNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const noteId = req.body.noteId;
    try {
        if (!noteId) {
            return next(new AppError('Note ID is required!', StatusCodes.BAD_REQUEST));
        }
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if (!note) {
            return next(new AppError('Note not found', StatusCodes.NOT_FOUND));
        }
        const deletedNote = await Note.findByIdAndDelete(noteId);

        successResponse.message = 'Note deleted successfully';
        successResponse.data = <Object>deletedNote;
        res.status(StatusCodes.OK).json(successResponse);
    }
    catch (err: any) {
        next(new AppError(err.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const getAllNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    try {
        const notes = await Note.find({ userId: userId }).sort({ createdAt: -1 }).lean();
        successResponse.message = 'Notes fetched successfully';
        successResponse.data = notes;
        res.status(StatusCodes.OK).json(successResponse);
    } catch (err: any) {
        next(new AppError(err.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

export { signup , verifyOtp, resendOtp, verifyEmail, signin, getUser, logout, deleteNote, createNote, getAllNotes };