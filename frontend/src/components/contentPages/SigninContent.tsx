import { Box, Button, Grid, TextField, Typography, CircularProgress, InputAdornment, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import Logo from "../../assets/logo";

const SigninContent: React.FC = function () {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const handleGetOtp = async () => {

        setLoading(true);
        try {
            // simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setOtpSent(true); // OTP sent successfully
        } catch (error) {
            console.error("Failed to send OTP:", error);
            alert("Failed to send OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!otpSent) {
            await handleGetOtp();
        } else {
            if (!otp) {
                alert("Please enter OTP.");
                return;
            }
            console.log("Submit form with OTP:", otp);
            // TODO: submit OTP to server
        }
    };

    return (
        <Grid container sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", padding: "30px 15px", alignItems:"center" }}>
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
            <Box sx={{ maxWidth: "550px", height: "auto", minHeight: "32px", gap: "10px", display: "flex", justifyContent: "center", alignItems: "center", m: "0 auto" , mb: "30px"}}>
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
                        type={showOtp ? "text" : "password"}
                        value={otp}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) setOtp(val);
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowOtp((prev) => !prev)} edge="end">
                                            {showOtp ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                inputMode: "numeric"
                            }
                        }}
                        sx={{
                            height: "59px",
                            "& .MuiOutlinedInput-root": { borderRadius: "10px" }
                        }}
                    />
                )}

                {otpSent &&
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "var(--primary-color)",
                            textDecoration: "underline",
                            textUnderlineOffset: 2,
                        }}
                    >
                        Resend OTP
                    </Typography>
                }
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

            <Box sx={{maxWidth: "550px", display: "flex", flexDirection: "column", width: "100%", gap: "30px" }}>
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
                        component="span"
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
