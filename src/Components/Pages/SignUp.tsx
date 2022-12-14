import { ThemeProvider } from "@emotion/react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  createTheme,
} from "@mui/material";
import { EmailInput } from "../Atoms/EmailInput";
import { PasswordInput } from "../Atoms/PasswordInput";
import { SignUpButton } from "../Atoms/SignUpButton";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { SignInHeader } from "../Organisms/SignInHeader";

export const SignUp: React.FC = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/MainMenu");
      }
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#5aff19",
        light: "#98ff5d",
        dark: "#00ca00",
      },
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => any }) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      if (auth.currentUser !== null) {
        sendEmailVerification(auth.currentUser);
      }
      console.log(auth.currentUser);
      navigate("/StartUp");
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <SignInHeader />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            サインアップ
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <EmailInput email={email} setEmail={setEmail} />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput password={password} setPassword={setPassword} />
              </Grid>
            </Grid>
            <SignUpButton />
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
