import { Box, Button, Grid, TextField, Typography, CircularProgress, InputAdornment, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";
import { userLogin, verifyOTP } from "../Redux/slices/authSlice";
import toast from "react-hot-toast";

const SigninContent: React.FC = function () {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [otpSent, setOtpSent] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);


    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);


    const handleGetOtp = async () => {
        setLoading(true);
        const payload = {
            email: email
        };

        const response = await dispatch(userLogin(payload));
        if (response.payload.success === true) {
            setOtpSent(true);
            setResendTimer(60);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("email is required!");
            return;
        }
        if (!otpSent) {
            handleGetOtp();

        } else {
            const payload = {
                email: email,
                otp: otp,
                keepLoggedIn
            }
            const res = await dispatch(verifyOTP(payload));
            console.log("login res : ", res);
            if (res.meta.requestStatus === "fulfilled") {
                navigate('/');
            }
        }
    };

    return (
        <Grid container sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", padding: "30px 15px", alignItems: "center" }}>
            <Box sx={{ maxWidth: "550px", height: "auto", minHeight: "32px", gap: "10px", display: "flex", justifyContent: "center", alignItems: "center", m: "0 auto" }}>
                <Box sx={{ width: "fit-content", height: "fit-content", gap: "10px", display: "flex", flexDirection: "row" }}>
                    <Logo />
                    <Typography sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "24px",
                        lineHeight: "110%",
                        letterSpacing: "-0.04em",
                        textAlign: "center",
                        alignContent: "center",
                    }}>
                        HD
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ maxWidth: "550px", height: "auto", minHeight: "32px", gap: "10px", display: "flex", justifyContent: "center", alignItems: "center", m: "0 auto" }}>
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: "32px",
                    lineHeight: "110%",
                    letterSpacing: "-0.04em",
                    textAlign: "center",
                    alignContent: "center",
                    mt: "30px",
                    mb: "10px"
                }}>
                    Sign in
                </Typography>
            </Box>
            <Box sx={{ maxWidth: "550px", height: "auto", minHeight: "32px", gap: "10px", display: "flex", justifyContent: "center", alignItems: "center", m: "0 auto", mb: "30px" }}>
                <Typography sx={{
                    fontWeight: 400,
                    color: "var(--light-text-color)",
                    fontSize: "16px",
                    lineHeight: "110%",
                    letterSpacing: "-0.04em",
                    textAlign: "center",
                    alignContent: "center"
                }}>
                    Please login to continue to your account.
                </Typography>
            </Box>

            <Box sx={{ maxWidth: "550px", display: "flex", flexDirection: "column", gap: 3, width: "100%", mb: "20px" }}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                    sx={{
                        height: "59px",
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" }
                    }}
                />

                {otpSent && (
                    <TextField
                        label="OTP"
                        name="otp"
                        type={showOtp ? "text" : "password"}
                        value={otp}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) setOtp(val);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowOtp((prev) => !prev)} edge="end">
                                        {showOtp ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            inputMode: "numeric",
                        }}
                        sx={{
                            height: "59px",
                            "& .MuiOutlinedInput-root": { borderRadius: "10px" }
                        }}
                    />
                )}

                {otpSent && (
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: resendTimer > 0 ? "grey" : "var(--primary-color)",
                            textDecoration: "underline",
                            textUnderlineOffset: 2,
                            cursor: resendTimer > 0 ? "not-allowed" : "pointer"
                        }}
                        onClick={() => { if (resendTimer === 0) handleGetOtp(); }}
                    >
                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                    </Typography>
                )}
                {otpSent &&
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={keepLoggedIn}
                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                sx={{
                                    color: "var(--text-color)",
                                    "&.Mui-checked": { color: "var(--text-color)" },
                                }}
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "var(--text-color)" }}>
                                Keep me logged in
                            </Typography>
                        }
                    />
                }
            </Box>

            <Box sx={{ maxWidth: "550px", display: "flex", flexDirection: "column", width: "100%", gap: "30px" }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        color: "var(--secondary-color)",
                        backgroundColor: "var(--primary-color)",
                        height: "54px",
                        borderRadius: "10px",
                        textTransform: "none",
                        "&:disabled": {
                            backgroundColor: "var(--primary-color)",
                            color: "var(--secondary-color)",
                            opacity: 0.8,
                        },
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: "var(--secondary-color)" }} />
                    ) : (
                        <Typography sx={{ color: "var(--secondary-color)", fontWeight: 600, fontSize: "16px" }}>
                            {otpSent ? "Sign in" : "Get OTP"}
                        </Typography>
                    )}
                </Button>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontWeight: 400,
                        fontSize: "14px",
                        letterSpacing: "150%",
                        height: "21px",
                        color: "var(--light-text-color)",
                    }}
                >
                    Need an account?
                    <Typography
                        component={Link}
                        to={'/signup'}
                        sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "var(--primary-color)",
                            textDecoration: "underline",
                            textUnderlineOffset: 2,
                            ml: 1
                        }}
                    >
                        Create one
                    </Typography>
                </Typography>
            </Box>
        </Grid>
    )
}

export default SigninContent;
