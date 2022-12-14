import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../../firebase";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import useData from "../../Hooks/useData";

export const ConsumptionDepositsHeadline = (props: any) => {
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
      <Typography component="p" variant="h3" color="common.white">
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
      <Typography component="p" variant="h6" color="common.white">
        {data.length === 0
          ? "読み込み中…"
          : data.totaldistance - data.startdistance + " km"}
      </Typography>
    </React.Fragment>
  );
};
export default ConsumptionDepositsHeadline;
