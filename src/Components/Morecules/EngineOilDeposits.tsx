import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import useData from "../../Hooks/useData";
import Alert from "@mui/material/Alert";

export const EngineOilDeposits = (props: any) => {
  const [alert, setAelrt] = useState<JSX.Element>();
  const { getDataAction, setGetDataAction } = props;
  const data = useData(getDataAction, setGetDataAction);
  const [date, setDate] = useState<string>();

  useEffect(() => {
    // console.log(today);
    // if (data.lastoilchangedate.seconds < today - 15552000) {
    if (data) {
      onAuthStateChanged(auth, (user) => {
        // console.log("user: " + JSON.stringify(user));
        if (user) {
          setGetDataAction(true);
          // console.log("data: " + data);
          const timestampToTime = (timestamp: number) => {
            const getdate = new Date(timestamp * 1000);
            const yyyy = `${getdate.getFullYear()}`;
            const MM = `0${getdate.getMonth() + 1}`.slice(-2);
            const dd = `0${getdate.getDate()}`.slice(-2);
            setDate(`${yyyy} 年 ${MM} 月 ${dd} 日`);
          };
          // console.log(timestampToTime(data.lastoilchangedate.seconds));
          timestampToTime(data.lastoilchangedate.seconds);
        }
        setGetDataAction(false);
      });
      if (5000 <= data.totaldistance - data.lastoilchange) {
        setAelrt(<Alert severity="error">オイル交換時期を過ぎています</Alert>);
      } else if (3000 <= data.totaldistance - data.lastoilchange) {
        setAelrt(<Alert severity="warning">もうすぐオイル交換時期です</Alert>);
      } else {
        setAelrt(<div></div>);
      }
      // }
    } else {
      setAelrt(<Alert severity="error">オイル交換時期を過ぎています</Alert>);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Title>前回のオイル交換からの距離</Title>
      <Typography component="p" variant="h3">
        {data.length === 0
          ? "読み込み中…"
          : data.totaldistance - data.lastoilchange + " km"}
      </Typography>
      <div>{alert}</div>
      <Typography color="text.secondary" sx={{ flex: 1, mt: 2, mb: 0 }}>
        総走行距離：
      </Typography>
      <Typography component="p" variant="h5">
        {data.length === 0 ? "読み込み中…" : data.totaldistance + " km"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, mt: 2, mb: 0 }}>
        前回のオイル交換日：
      </Typography>
      <Typography component="p" variant="h5">
        {date == undefined ? "読み込み中…" : date}
      </Typography>
    </React.Fragment>
  );
};
export default EngineOilDeposits;
