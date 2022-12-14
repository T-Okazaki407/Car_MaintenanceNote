import { ThemeProvider } from "@emotion/react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  createTheme,
  Grid,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignInHeader } from "../Organisms/SignInHeader";
import db, { auth } from "../../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const StartUp: React.FC = () => {
  const [startdistance, setStartdistance] = useState<number>();
  const [uid, setUid] = useState("");

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
  const today = new Date();

  const handleSubmit = async () => {
    if (auth.currentUser !== null) {
      if (startdistance !== undefined) {
        await setDoc(doc(db, "data", uid), {
          startdistance: startdistance,
          totaldistance: startdistance,
          lastoilchange: startdistance,
          totalgasoline: 0,
          uid: uid,
          lastoilchangedate: today,
        });
        navigate("/MainMenu");
      } else {
        alert("全ての欄を記入してください。");
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUid(user.uid);
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      const docSnap = await getDoc(doc(db, "data", uid));
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        navigate("/MainMenu");
      } else {
        console.log("No such document");
      }
    })();
  }, [uid]);

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
            あなたの愛車の現在の走行距離を教えてください
          </Typography>
          <Box component="form" noValidate sx={{ mt: 20 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label=""
                  type="number"
                  fullWidth
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">km</InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setStartdistance(Number(e.target.value));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 10, mb: 0 }}
                  onClick={handleSubmit}
                >
                  登録
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
