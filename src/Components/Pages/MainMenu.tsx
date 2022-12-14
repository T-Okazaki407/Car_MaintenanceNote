import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Deposits from "../Morecules/ConsumptionDeposits";
import ConsumptionDepositsHeadline from "../Morecules/ConsumptionDepositsHeadline";
import EngineOilDeposits from "../Morecules/EngineOilDeposits";
import EngineOilDepositsHeadline from "../Morecules/EngineOilDepositsHeadline";
import { ConsumptionAppBar } from "../Organisms/ConsumptionAppBar";
import { EngineOilAppBar } from "../Organisms/EngineOilAppBar";
import { Header } from "../Organisms/Header";

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

export const MainMenu: React.FC = () => {
  const [getDataAction, setGetDataAction] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate("/");
      }
    });
  }, []);
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <List
        component="nav"
        aria-label="mailbox folders"
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
        <ConsumptionAppBar />
        <ListItem
          button
          onClick={() => {
            navigate("/Consumption");
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <ConsumptionDepositsHeadline
              getDataAction={getDataAction}
              setGetDataAction={setGetDataAction}
            />
          </Container>
          <ListItemText
            primary="＞"
            primaryTypographyProps={{
              color: "#ffffff",
              fontWeight: "medium",
              variant: "body2",
            }}
          />
        </ListItem>
        <EngineOilAppBar />
        <ListItem
          button
          onClick={() => {
            navigate("/EngineOil");
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <EngineOilDepositsHeadline
              getDataAction={getDataAction}
              setGetDataAction={setGetDataAction}
            />
          </Container>
          <ListItemText
            primary="＞"
            primaryTypographyProps={{
              color: "#ffffff",
              fontWeight: "medium",
              variant: "body2",
            }}
          />
        </ListItem>
        <Divider />
      </List>
    </ThemeProvider>
  );
};
