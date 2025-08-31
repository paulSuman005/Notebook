import { Box, Button, Grid, TextField, Typography, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import Logo from "../../assets/logo";

const SignupContent: React.FC = function () {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);


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
    <Grid container sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", padding: "30px 15px" }}>
        <Box sx={{ maxWidth: "550px", height: "auto", minHeight: "32px", gap: "10px", display: "flex", justifyContent: "center", alignItems: "center", m:"0 auto" }}>
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
      <Box sx={{ maxWidth: "550px", height: "auto", minHeight: "32px", gap: "10px", display: "flex", justifyContent: "center", alignItems: "center" , m: "0 auto"}}>
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
          Sign up
        </Typography>
      </Box>
      <Box sx={{ maxWidth: "550px", height: "auto", minHeight: "32px", gap: "10px", display: "flex", justifyContent: "center", alignItems: "center", m:"0 auto"}}>
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
          width: "92%",
          maxWidth: "550px",
          margin: "auto",
          mt: 2,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
            label="Name"
            type="text"
            slotProps={{ 
                inputLabel: { shrink: true },
                input: {readOnly: otpSent}
            }}
            disabled={otpSent}
            sx={{ 
                height: "52px", 
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
                input: {readOnly: otpSent}
            }}
            disabled={otpSent}
            sx={{ 
                height: "52px", 
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
                input: {readOnly: otpSent}
            }}
            disabled={otpSent}
            sx={{ 
                height: "52px", 
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
                onChange={(e) =>{ 
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                        setOtp(val);
                    }
                }}
                sx={{ 
                    height: "52px", 
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
                        inputMode: "numeric", // mobile numeric keyboard
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
                height: "52px",
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
            <Typography sx={{ color: "var(--secondary-color)", fontWeight: 600, fontSize: "16px", lineHeight: "120%"}}>
              {otpSent ? "Sign up" : "Get OTP"}
            </Typography>
          )}
        </Button>

        <Typography sx={{ textAlign: "center", fontWeight: 400, fontSize: "14px", letterSpacing: "150%", height: "21px", color: "var(--light-text-color)" }}>
          Already have an account??
          <Typography component="span" sx={{ textAlign: "center", fontWeight: 600, fontSize: "14px", letterSpacing: "150%", height: "21px", color: "var(--primary-color)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Grid>
  )
}

export default SignupContent;
