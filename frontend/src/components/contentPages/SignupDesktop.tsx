import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../Redux/store";
import { createAccount, verifyEmail } from "../Redux/slices/authSlice";
import toast from "react-hot-toast";


const SignupDestop: React.FC = function () {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [otpSent, setOtpSent] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        dateOfBirth: "",
    });


    const handleGetOtp = async () => {
        setLoading(true);
        const payload = {
            ...userData,
            dateOfBirth: new Date(userData.dateOfBirth)
        };

        const response = await dispatch(createAccount(payload));
        if (response.payload.success === true) {
            setOtpSent(true);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userData.name || !userData.email || !userData.dateOfBirth) {
            toast.error("every fields are required!");
            return;
        }
        if (!otpSent) {
            handleGetOtp();

        } else {
            const payload = {
                email: userData.email,
                otp: otp
            }
            const res = await dispatch(verifyEmail(payload));
            if (res.payload.success === true) {
                navigate('/');
            }
        }
    };

    return (
        <Grid container sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", p: "0 64px" }}>
            <Box sx={{ maxWidth: "550px", mb: 5, height: "auto", minHeight: "32px", gap: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}>
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: "32px",
                    lineHeight: "110%",
                    letterSpacing: "-0.04em",
                    textAlign: "center",
                    alignContent: "center",
                }}>
                    Sign up
                </Typography>
                <Typography sx={{
                    fontWeight: 400,
                    color: "var(--light-text-color)",
                    fontSize: "16px",
                    lineHeight: "110%",
                    letterSpacing: "-0.04em",
                    textAlign: "center",
                    alignContent: "center"
                }}>
                    Sign up to enjoy the feature of HD
                </Typography>
            </Box>

            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    width: "100%",
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Name"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    slotProps={{
                        input: { readOnly: otpSent }
                    }}
                    disabled={otpSent}
                    sx={{
                        height: "59px",
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                        }
                    }}
                />

                <TextField
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={userData.dateOfBirth}
                    onChange={handleChange}
                    type="date"
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { readOnly: otpSent }
                    }}
                    disabled={otpSent}
                    sx={{
                        height: "59px",
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                        }
                    }}
                />

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    slotProps={{
                        input: { readOnly: otpSent }
                    }}
                    disabled={otpSent}
                    sx={{
                        height: "59px",
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                        }
                    }}
                />

                {/* OTP Field */}
                {otpSent && (
                    <TextField
                        label="OTP"
                        name="otp"
                        type={showOtp ? "text" : "password"}
                        value={otp}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                                setOtp(val);
                            }
                        }}
                        sx={{
                            height: "59px",
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            }
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowOtp((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showOtp ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                            htmlInput: {
                                inputMode: "numeric",
                            },
                        }}
                    />
                )}

                <Button
                    type="submit"
                    variant="contained"
                    onSubmit={handleSubmit}
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
                        <Typography sx={{ color: "var(--secondary-color)", fontWeight: 600, fontSize: "16px", lineHeight: "120%" }}>
                            {otpSent ? "Sign up" : "Get OTP"}
                        </Typography>
                    )}
                </Button>
            </Box>
            <Typography sx={{ textAlign: "center", fontWeight: 400, fontSize: "14px", letterSpacing: "150%", height: "21px", color: "var(--light-text-color)", mt: 4 }}>
                Already have an account??
                <Typography component={Link} to={'/signin'} sx={{ textAlign: "center", fontWeight: 600, fontSize: "14px", letterSpacing: "150%", height: "21px", color: "var(--primary-color)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                    Sign in
                </Typography>
            </Typography>
        </Grid>
    )
}


export default SignupDestop;