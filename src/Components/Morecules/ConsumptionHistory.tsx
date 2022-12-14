import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../../firebase";
import useHistory from "../../Hooks/useHistory";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { Button } from "@mui/material";
import useData from "../../Hooks/useData";

export const ConsumptionHistory = (props: any) => {
  const { historyAction, setHistoryAction } = props;
  const history = useHistory(historyAction, setHistoryAction);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setHistoryAction(true);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Title>燃費履歴</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>給油量</TableCell>
            <TableCell>ODOメーターの値</TableCell>
            {/* <TableCell>燃費</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((history) => (
            <TableRow key={history.id}>
              <TableCell>{history.date}</TableCell>
              <TableCell>{history.gasoline}</TableCell>
              <TableCell>{history.distance}</TableCell>
              {/* <TableCell></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
export default ConsumptionHistory;
