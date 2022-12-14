import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Header } from "../Organisms/Header";
import EngineOilDeposits from "../Morecules/EngineOilDeposits";
import EngineOilHistory from "../Morecules/EngineOilHistory";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { InputChangeEngineOil } from "../Organisms/InputEngineOil";

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

// interface ContextInterface {
//   count: string;
// }

// export const UserUid = createContext({} as ContextInterface);

export const EngineOil = () => {
  const [oilHistoryAction, setOilHistoryAction] = useState(false);
  const [oilDataAction, setOilDataAction] = useState(false);
  const [getDataAction, setGetDataAction] = useState(false);
  const [uid, setUid] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate("/");
      } else {
        setUid(user.uid);
      }
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <EngineOilDeposits
                    getDataAction={getDataAction}
                    setGetDataAction={setGetDataAction}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <InputChangeEngineOil
                  oilHistoryAction={oilHistoryAction}
                  setOilHistoryAction={setOilHistoryAction}
                  oilDataAction={oilDataAction}
                  setOilDataAction={setOilDataAction}
                  setGetDataAction={setGetDataAction}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* <UserUid.Provider value={uid}> */}
                  <EngineOilHistory
                    oilHistoryAction={oilHistoryAction}
                    setOilHistoryAction={setOilHistoryAction}
                    oilDataAction={oilDataAction}
                    setOilDataAction={setOilDataAction}
                    setGetDataAction={setGetDataAction}
                  />
                  {/* </UserUid.Provider> */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EngineOil;
