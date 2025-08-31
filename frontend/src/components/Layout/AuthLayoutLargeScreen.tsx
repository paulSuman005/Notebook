import React from "react";
import type { ReactNode } from "react";
import { Box, Grid, Typography} from "@mui/material";
import Logo from "../../assets/logo";
import mainImage from '../../assets/large_screen.jpg'

interface AuthLayoutProps {
  children?: ReactNode;
}


const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <Grid  container sx={{ width: { xs: "100%", sm: "90%", md: "1440px" }, height: "1024px", opacity: 1, borderRadius: "32px", display: "flex", flexDirection: "column", border: "1px solid var(--border-color)", m: "auto"}}>
        {/* left section */}
        <Box
            sx={{
                maxWidth: "591px",
                width: "100%",
                height: "100%",
                p: "32px",
            }}
        >
            {/* logo section */}
            <Box sx={{ maxWidth: "527px", height: "auto", minHeight: "32px", gap: "10px"}}>
                <Box sx={{width:"fit-content", height: "fit-content", gap: "10px", display: "flex", flexDirection: "row"}}>
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
            {/* children section */}
            {/* <Box sx={{flexGrow: 1}}> */}
                {children}
            {/* </Box> */}
        </Box>
        {/* right section */}
        <Box
            sx={{
                maxWidth: "849px",
                width: "100%",
                height: "100%",
                minHeight: "1024px",
                p: "12px",
            }}
        >
            <Box
                component="img"
                src={mainImage}
                alt="hero section image"
                sx={{
                    maxWidth: "825px",
                    maxHeight: "1000px",
                    width: "auto",
                    height: "100%",
                    borderRadius: "24px",
                    opacity: 1,
                    overflow: "hidden",
                    boxSizing: "border-box",
                    objectFit: "cover"
                }}
            />
        </Box>
    </Grid>
  );
};

export default AuthLayout;
