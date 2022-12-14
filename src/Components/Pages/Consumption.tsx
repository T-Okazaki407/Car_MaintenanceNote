import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../Morecules/ConsumptionChart";
import Deposits from "../Morecules/ConsumptionDeposits";
import { Header } from "../Organisms/Header";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { InputGasolineAndDistanse } from "../Organisms/InputGasolineAndDistanse";
import { ConsumptionHistory } from "../Morecules/ConsumptionHistory";

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

export const Consumption: React.FC = () => {
  const [historyAction, setHistoryAction] = useState(false);
  const [getDataAction, setGetDataAction] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
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
              {/* Chart */}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits
                    getDataAction={getDataAction}
                    setGetDataAction={setGetDataAction}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <InputGasolineAndDistanse
                  historyAction={historyAction}
                  setHistoryAction={setHistoryAction}
                  getDataAction={getDataAction}
                  setGetDataAction={setGetDataAction}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <ConsumptionHistory
                    historyAction={historyAction}
                    setHistoryAction={setHistoryAction}
                    getDataAction={getDataAction}
                    setGetDataAction={setGetDataAction}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Consumption;
