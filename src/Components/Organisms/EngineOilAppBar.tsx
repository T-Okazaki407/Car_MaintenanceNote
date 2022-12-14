import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React from "react";

export const EngineOilAppBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        color="#5aff19"
      >
        {"　" + "エンジンオイル"}
      </Typography>
    </AppBar>
  );
};
