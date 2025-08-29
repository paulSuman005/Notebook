import express from "express";
import { getUser, resendOtp, signin, signup, verifyEmail, verifyOtp } from "../controller/userController";
import { isLoggedIn } from "../middleware/authUser";

const userRouter = express.Router();


userRouter.post('/signup', signup);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/resend-otp', resendOtp);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/signin', signin);

userRouter.get('/getUser', isLoggedIn, getUser );

export default userRouter;