import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react"


const SignupDestop: React.FC = function () {

    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [name, setName] = useState("");


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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!otpSent) {
            handleGetOtp();
        } else {
            console.log("Submit form with OTP:", otp);
            // submit form with OTP here
        }
    };

    return (
        <Grid container sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", p:"0 64px"}}>
            <Box sx={{ maxWidth: "550px",mb: 5, height: "auto", minHeight: "32px", gap: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    type="email"
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

                {/* OTP Field */}
                {otpSent && (
                    <TextField
                        label="OTP"
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
                <Typography component="span" sx={{ textAlign: "center", fontWeight: 600, fontSize: "14px", letterSpacing: "150%", height: "21px", color: "var(--primary-color)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                    Sign in
                </Typography>
            </Typography>
        </Grid>
    )
}


export default SignupDestop;