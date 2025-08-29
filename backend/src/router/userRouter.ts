import express from "express";
import { createNote, deleteNote, getAllNotes, getUser, logout, resendOtp, signin, signup, verifyEmail, verifyOtp } from "../controller/userController";
import { isLoggedIn } from "../middleware/authUser";

const userRouter = express.Router();


userRouter.post('/signup', signup);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/resend-otp', resendOtp);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/signin', signin);
userRouter.post('/logout', isLoggedIn,  logout );
userRouter.post('/create-note', isLoggedIn, createNote);

userRouter.get('/getUser', isLoggedIn, getUser );
userRouter.get('/getAllNotes', isLoggedIn, getAllNotes);

userRouter.delete('/delete-note', isLoggedIn, deleteNote);

export default userRouter;