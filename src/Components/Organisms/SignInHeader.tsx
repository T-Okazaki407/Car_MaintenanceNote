import { Box, List, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React from "react";

export const SignInHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Box>
        <List>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color="#5aff19"
            align="center"
          >
            車のメンテナンスノート（仮）
          </Typography>
        </List>
      </Box>
    </AppBar>
  );
};
