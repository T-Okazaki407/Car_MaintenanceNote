import { Button } from "@mui/material";
import React from "react";

export const SignInButton: React.FC = () => {
  return (
    <div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        サインイン
      </Button>
    </div>
  );
};
