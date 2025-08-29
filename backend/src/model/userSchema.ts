import {Schema, model, Document} from 'mongoose';
import JWT, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../utils/interface/modelInterfaces';

const userSchema = new Schema<IUser>({
    name: {
        type: String, 
        required: [ true, "name is required" ],
        maxLength: [50, "name should be less than 50 characters"],
        minLength: [5, "name should be greater that 5 characters"],
        trim: true
    },
    email: {
        type: String, 
        required: [ true, "email is required" ] , 
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please fill in a valid email address'
        ]
    },
    dateOfBirth: {
        type: Date, 
        required: [ true, "date of birth is required" ]
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    verificationOTP: String,
    VerificationOTPExpiry: Date,
    refreshToken: String,
}, 
{
    timestamps: true
}
);

userSchema.methods.generateAccessToken = function (keepLoggedIn: boolean = false): string {
    const ACCESS_TOKEN_SECRET = <string> process.env.ACCESS_TOKEN_SECRET;
    const ACCESS_TOKEN_SECRET_EXPIRY = <string> process.env.ACCESS_TOKEN_SECRET_EXPIRY;
    const LONG_ACCESS_TOKEN_SECRET_EXPIRY = <string> process.env.LONG_ACCESS_TOKEN_SECRET_EXPIRY;

    const options: SignOptions = {
        expiresIn: keepLoggedIn ? LONG_ACCESS_TOKEN_SECRET_EXPIRY as SignOptions["expiresIn"] : ACCESS_TOKEN_SECRET_EXPIRY as SignOptions["expiresIn"],
    };
    
    return JWT.sign(
        {id: this._id, email: this.email},
        ACCESS_TOKEN_SECRET,
        options
    );
};

userSchema.methods.generateRefreshToken = function(keepLoggedIn: boolean = false): string {
    const REFRESH_TOKEN_SECRET = <string> process.env.REFRESH_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET_EXPIRY = <string> process.env.REFRESH_TOKEN_SECRET_EXPIRY;
    const LONG_REFRESH_TOKEN_SECRET_EXPIRY = <string> process.env.LONG_REFRESH_TOKEN_SECRET_EXPIRY;

    const options: SignOptions = {
        expiresIn: keepLoggedIn ? LONG_REFRESH_TOKEN_SECRET_EXPIRY as SignOptions["expiresIn"] : REFRESH_TOKEN_SECRET_EXPIRY as SignOptions["expiresIn"],
    };

    return JWT.sign(
        {id: this._id},
        REFRESH_TOKEN_SECRET,
        options
    );
};

const User = model<IUser>('User', userSchema);
export default User;