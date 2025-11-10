import React, { memo } from "react";
import { Box } from "@mui/joy";
import logo from "../images/medlogo.png";

const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "#fceff1", // light pink background
            }}
        >
            <Box
                component="img"
                src={logo}
                alt="Loading..."
                className="shake"
                sx={{ width: 120, height: 120 }}
            />
        </Box>
    );
};

export default memo(Loading);
