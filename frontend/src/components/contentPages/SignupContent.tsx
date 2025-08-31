import { Box, Button, Grid, TextField, Typography, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import Logo from "../../assets/logo";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createAccount, verifyEmail } from "../Redux/slices/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";

const SignupContent: React.FC = function () {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState({
    name:"",
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
    if(response.payload.success === true){
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!userData.name || !userData.email || !userData.dateOfBirth){
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
      if(res.payload.success === true){
        navigate('/');
      }
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
            name="name"
            value={userData.name}
            onChange={handleChange}
            type="text"
            slotProps={{ 
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
            name="dateOfBirth"
            type="date"
            value={userData.dateOfBirth}
            onChange={handleChange}
            slotProps={{
                inputLabel: {shrink: true},
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
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            slotProps={{ 
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
                name="otp"
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
          <Typography component={Link} to={'/signin'} sx={{ textAlign: "center", fontWeight: 600, fontSize: "14px", letterSpacing: "150%", height: "21px", color: "var(--primary-color)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Grid>
  )
}

export default SignupContent;
