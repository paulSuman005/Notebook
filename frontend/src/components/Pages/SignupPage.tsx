import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import React from "react";
import SignupContent from "../contentPages/SignupContent";
import SignupDestop from "../contentPages/SignupDesktop";
import AuthLayout from "../Layout/AuthLayoutLargeScreen";

const SignupPage: React.FC = function () {
    const theme = useTheme();
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <div>
            {isDesktop?
                <AuthLayout>
                    <SignupDestop/>
                </AuthLayout> :
                <SignupContent/>
            }
        </div>
    )
}

export default SignupPage;
