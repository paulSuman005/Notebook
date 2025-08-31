import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "96px", fontWeight: 700, mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>
        Oops! Page Not Found
      </Typography>
      <Typography sx={{ mb: 4, color: "text.secondary" }}>
        The page you are looking for might have been removed or the URL is incorrect.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{ bgcolor: "var(--primary-color)", color: "var(--secondary-color)", textTransform: "none" }}
      >
        Go to back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
