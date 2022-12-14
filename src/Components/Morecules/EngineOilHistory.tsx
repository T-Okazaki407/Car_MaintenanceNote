import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import db, { auth } from "../../firebase";
import useOilHistory from "../../Hooks/useOilHistory";

export default function EngineOilHistory(props: any) {
  const { oilHistoryAction, setOilHistoryAction } = props;
  const oilHistory = useOilHistory(oilHistoryAction, setOilHistoryAction);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setOilHistoryAction(true);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Title>オイル交換履歴</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>エレメント交換</TableCell>
            <TableCell>ODOメーターの値</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {oilHistory.map((history) => (
            <TableRow key={history.id}>
              <TableCell>{history.date}</TableCell>
              <TableCell>{history.element}</TableCell>
              <TableCell>{history.distance}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
