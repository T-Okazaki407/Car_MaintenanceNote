import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Alert } from "@mui/material";
import useData from "../../Hooks/useData";

export const EngineOilDepositsHeadline = (props: any) => {
  const [alert, setAelrt] = useState<JSX.Element>();
  const { getDataAction, setGetDataAction } = props;
  const data = useData(getDataAction, setGetDataAction);

  useEffect(() => {
    if (data.totaldistance - data.lastoilchange !== undefined) {
      if (5000 <= data.totaldistance - data.lastoilchange) {
        setAelrt(<Alert severity="error">オイル交換時期を過ぎています</Alert>);
      } else if (3000 <= data.totaldistance - data.lastoilchange) {
        setAelrt(<Alert severity="warning">もうすぐオイル交換時期です</Alert>);
      } else {
        setAelrt(<div></div>);
      }
    }
  }, [data.totaldistance - data.lastoilchange]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setGetDataAction(true);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <Title>前回のオイル交換からの距離</Title>
      <Typography component="p" variant="h3" color="common.white">
        {data.length === 0
          ? "読み込み中…"
          : data.totaldistance - data.lastoilchange + " km"}
      </Typography>
      {alert}
    </React.Fragment>
  );
};
export default EngineOilDepositsHeadline;
