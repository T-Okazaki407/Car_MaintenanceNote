import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ThemeProvider } from "@emotion/react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  createTheme,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "../Atoms/EmailInput";
import { PasswordInput } from "../Atoms/PasswordInput";
import { SignInButton } from "../Atoms/SignInButton";
import { useEffect, useState } from "react";
import { Header } from "../Organisms/Header";
import { SignInHeader } from "../Organisms/SignInHeader";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // サインイン
  const navigate = useNavigate();
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        navigate("/MainMenu");
      }
    });
  }, []);
  const handleSignIn = async (event: { preventDefault: () => any }) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(() => {
      console.log(auth.currentUser);
      navigate("/MainMenu");
    });
  };
  const handleSignUp = () => {
    navigate("/SignUp");
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
            サインイン
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <EmailInput email={email} setEmail={setEmail} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PasswordInput password={password} setPassword={setPassword} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SignInButton />
              </Grid>
              <Grid>
                アカウントをお持ちでない方は
                <Button onClick={handleSignUp}>こちら</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
