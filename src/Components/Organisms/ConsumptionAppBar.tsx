import { createTheme, ThemeProvider, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5aff19",
      light: "#ffa2a3",
      dark: "#a34449",
    },
  },
});

export const ConsumptionAppBar: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color="#5aff19"
        >
          {"　" + "燃費"}
        </Typography>
      </AppBar>
    </ThemeProvider>
  );
};
