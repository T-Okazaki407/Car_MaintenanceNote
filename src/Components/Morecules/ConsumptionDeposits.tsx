import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import useData from "../../Hooks/useData";

export const Deposits = (props: any) => {
  const { getDataAction, setGetDataAction } = props;
  const data = useData(getDataAction, setGetDataAction);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setGetDataAction(true);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Title>平均燃費</Title>
      <Typography component="p" variant="h3">
        {data.length === 0
          ? "読み込み中…"
          : (
              (data.totaldistance - data.startdistance) /
              data.totalgasoline
            ).toFixed(1) + " km/L"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, mt: 2, mb: 0 }}>
        総走行距離：
      </Typography>
      <Typography component="p" variant="h4">
        {data.length === 0
          ? "読み込み中…"
          : data.totaldistance - data.startdistance + " km"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, mt: 2, mb: 0 }}>
        総給油量：
      </Typography>
      <Typography component="p" variant="h4">
        {data.length === 0 ? "読み込み中…" : data.totalgasoline + " L"}
      </Typography>
    </React.Fragment>
  );
};
export default Deposits;
