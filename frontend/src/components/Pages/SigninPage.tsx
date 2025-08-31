import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import React from "react";
import SigninDestop from "../contentPages/SigninDesktop";
import SigninContent from "../contentPages/SigninContent";
import AuthLayout from "../Layout/AuthLayoutLargeScreen";

const SigninPage: React.FC = function () {
    const theme = useTheme();
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <div>
            {isDesktop?
                <AuthLayout>
                    <SigninDestop/>
                </AuthLayout> :
                <SigninContent/>
            }
        </div>
    )
}

export default SigninPage;
